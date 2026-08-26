import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { guessRoles, isHeaderRow, looksLikeAmount, looksLikeDate } from "./detect";
import { ExtractError } from "./errors";
import type { ColumnRole, ExtractedTable, ExtractProgress, ExtractSession } from "./types";

export { ExtractError } from "./errors";

if (typeof window !== "undefined") {
  GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();
}

const MAX_BYTES = 30 * 1024 * 1024;
const MAX_PAGES = 80;
const PROCESS_PAGES = 40;
const Y_TOL = 3.2;
const GAP = 10;

type Glyph = { str: string; x: number; y: number; w: number; h: number };

function toGlyphs(items: Array<{ str?: string; transform?: number[]; width?: number; height?: number; hasEOL?: boolean }>): Glyph[] {
  const out: Glyph[] = [];
  for (const it of items) {
    const str = (it.str ?? "").replace(/\s+/g, " ");
    if (!str.trim()) continue;
    const t = it.transform ?? [1, 0, 0, 1, 0, 0];
    out.push({
      str,
      x: t[4] ?? 0,
      y: t[5] ?? 0,
      w: it.width ?? 0,
      h: it.height ?? 0,
    });
  }
  return out;
}

function clusterRows(glyphs: Glyph[]): Glyph[][] {
  const sorted = [...glyphs].sort((a, b) => b.y - a.y || a.x - b.x);
  const rows: Glyph[][] = [];
  for (const g of sorted) {
    const last = rows[rows.length - 1];
    if (last && Math.abs(last[0]!.y - g.y) <= Y_TOL) last.push(g);
    else rows.push([g]);
  }
  for (const row of rows) row.sort((a, b) => a.x - b.x);
  return rows;
}

function rowToCells(row: Glyph[]): string[] {
  if (!row.length) return [];
  const cells: string[] = [];
  let cur = row[0]!.str;
  let lastRight = row[0]!.x + row[0]!.w;
  for (let i = 1; i < row.length; i++) {
    const g = row[i]!;
    if (g.x - lastRight < GAP) {
      const needSpace = !cur.endsWith(" ") && !g.str.startsWith(" ");
      cur += (needSpace ? " " : "") + g.str;
    } else {
      cells.push(cur.trim());
      cur = g.str;
    }
    lastRight = g.x + g.w;
  }
  cells.push(cur.trim());
  return cells.filter(Boolean);
}

function scoreRow(cells: string[]): number {
  if (cells.length < 2) return 0;
  let s = cells.length >= 3 ? 2 : 1;
  if (cells.some(looksLikeDate)) s += 2;
  if (cells.some(looksLikeAmount)) s += 2;
  if (isHeaderRow(cells)) s += 3;
  return s;
}

function pickTable(allRows: string[][]): { headers: string[]; rows: string[][]; pageHint: number } {
  const scored = allRows.map((cells, i) => ({ i, cells, score: scoreRow(cells) }));
  const good = scored.filter((r) => r.score >= 3 && r.cells.length >= 3);
  if (good.length < 3) {
    const fallback = scored.filter((r) => r.cells.length >= 3);
    if (fallback.length < 3) {
      throw new ExtractError(
        "Couldn’t find a transaction table. Try another export from the bank — a digital PDF, not a photo.",
        "empty",
      );
    }
    return assemble(fallback.map((r) => r.cells));
  }
  return assemble(good.map((r) => r.cells));
}

function assemble(block: string[][]): { headers: string[]; rows: string[][]; pageHint: number } {
  const counts = new Map<number, number>();
  for (const r of block) counts.set(r.length, (counts.get(r.length) ?? 0) + 1);
  let bestCount = 0;
  let bestN = 0;
  for (const [n, c] of counts) {
    if (c > bestCount || (c === bestCount && n > bestN)) {
      bestCount = c;
      bestN = n;
    }
  }
  const filtered = block.filter((r) => Math.abs(r.length - bestN) <= 1);
  const padded = filtered.map((r) => {
    const copy = [...r];
    while (copy.length < bestN) copy.push("");
    return copy.slice(0, bestN);
  });

  let headers: string[];
  let data: string[][];
  if (padded[0] && isHeaderRow(padded[0])) {
    headers = padded[0];
    data = padded.slice(1).filter((r) => !isHeaderRow(r));
  } else {
    headers = Array.from({ length: bestN }, (_, i) => `Col ${i + 1}`);
    data = padded.filter((r) => !isHeaderRow(r));
  }

  if (data.length < 3) {
    throw new ExtractError(
      "Couldn’t find a transaction table. Try another export from the bank.",
      "empty",
    );
  }
  return { headers, rows: data, pageHint: 1 };
}

function columnsOf(rows: string[][], colCount: number): string[][] {
  const cols: string[][] = Array.from({ length: colCount }, () => []);
  for (const r of rows) {
    for (let c = 0; c < colCount; c++) cols[c]!.push(r[c] ?? "");
  }
  return cols;
}

export async function extractStatement(
  file: File,
  onProgress?: (p: ExtractProgress) => void,
): Promise<ExtractSession> {
  if (file.size > MAX_BYTES) {
    throw new ExtractError(
      "File too large for this device. Try a monthly statement, not a multi-year archive.",
      "too-large",
    );
  }

  const raw = await file.arrayBuffer();
  const data = new Uint8Array(raw.slice(0));
  let pdf;
  try {
    const loading = getDocument({
      data,
      disableAutoFetch: true,
      disableStream: true,
      useSystemFonts: true,
      standardFontDataUrl: "/standard_fonts/",
    });
    pdf = await Promise.race([
      loading.promise,
      new Promise<never>((_, reject) => {
        window.setTimeout(() => reject(new ExtractError("Timed out reading the PDF.", "generic")), 20000);
      }),
    ]);
  } catch (err) {
    const name = err instanceof Error ? err.name : "";
    const msg = err instanceof Error ? err.message : String(err);
    if (name === "PasswordException" || /password/i.test(msg)) {
      throw new ExtractError(
        "This PDF is locked. Unlock it in your bank app and drop it again.",
        "password",
      );
    }
    throw new ExtractError("Couldn’t open this PDF. Try a different export.", "generic");
  }

  const pageCount = pdf.numPages;
  const toRead = Math.min(pageCount, pageCount > MAX_PAGES ? PROCESS_PAGES : pageCount);
  const warnings: string[] = [];
  if (pageCount > MAX_PAGES) {
    warnings.push(`Only the first ${PROCESS_PAGES} of ${pageCount} pages were read.`);
  }

  const allCells: string[][] = [];
  let textItems = 0;

  for (let i = 1; i <= toRead; i++) {
    onProgress?.({ page: i, total: toRead });
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const glyphs = toGlyphs(content.items as Array<{ str?: string; transform?: number[]; width?: number; height?: number }>);
    textItems += glyphs.length;
    const rows = clusterRows(glyphs).map(rowToCells).filter((r) => r.length);
    allCells.push(...rows);
  }

  if (textItems < 8) {
    throw new ExtractError(
      "This PDF has no selectable text. It is probably a photo or a scan. Ledger reads digital statements only — the kind your bank emails or lets you download as a real PDF.",
      "scan",
    );
  }

  const picked = pickTable(allCells);
  const cols = columnsOf(picked.rows, picked.headers.length);
  const roles: ColumnRole[] = guessRoles(picked.headers, cols);

  const table: ExtractedTable = {
    pageStart: 1,
    pageEnd: toRead,
    headers: picked.headers,
    roles,
    rows: picked.rows,
    confidence: Math.min(1, 0.4 + Math.min(picked.rows.length, 40) / 80),
  };

  return {
    fileName: file.name,
    fileSize: file.size,
    pageCount,
    tables: [table],
    warnings,
  };
}
