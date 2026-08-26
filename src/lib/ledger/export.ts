import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { parseAmount } from "./detect";
import type { ColumnRole, ExtractedTable } from "./types";

const ROLE_ORDER: ColumnRole[] = [
  "date",
  "description",
  "debit",
  "credit",
  "amount",
  "balance",
  "extra",
];

function roleLabel(role: ColumnRole, used: Map<ColumnRole, number>): string {
  const n = used.get(role) ?? 0;
  used.set(role, n + 1);
  const base =
    role === "date"
      ? "Date"
      : role === "description"
        ? "Description"
        : role === "debit"
          ? "Debit"
          : role === "credit"
            ? "Credit"
            : role === "amount"
              ? "Amount"
              : role === "balance"
                ? "Balance"
                : "Extra";
  return n === 0 ? base : `${base} ${n + 1}`;
}

export function mappedAoa(
  table: ExtractedTable,
  parenNegative: boolean,
): { headers: string[]; rows: (string | number)[][] } {
  const idxs = table.roles
    .map((role, i) => ({ role, i }))
    .filter((x) => x.role !== "ignore")
    .sort((a, b) => ROLE_ORDER.indexOf(a.role) - ROLE_ORDER.indexOf(b.role));

  const used = new Map<ColumnRole, number>();
  const headers = idxs.map((x) => {
    const h = table.headers[x.i]?.trim();
    if (h && !/^col\s+\d+$/i.test(h)) return h;
    return roleLabel(x.role, used);
  });

  const rows = table.rows.map((row) =>
    idxs.map(({ role, i }) => {
      const raw = row[i] ?? "";
      if (role === "debit" || role === "credit" || role === "amount" || role === "balance") {
        const n = parseAmount(raw, parenNegative);
        return n === null ? raw : n;
      }
      return raw;
    }),
  );

  return { headers, rows };
}

function downloadBlob(blob: Blob, filename: string) {
  const save =
    typeof FileSaver === "function"
      ? FileSaver
      : (FileSaver as { saveAs: typeof FileSaver }).saveAs;
  save(blob, filename);
}

export function exportXlsx(
  table: ExtractedTable,
  fileName: string,
  parenNegative: boolean,
) {
  const { headers, rows } = mappedAoa(table, parenNegative);
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Transactions");
  const notes = XLSX.utils.aoa_to_sheet([
    ["Source file", fileName],
    ["Extracted at", new Date().toISOString()],
    ["Note", "Processed on-device by Ledger. Not uploaded."],
  ]);
  XLSX.utils.book_append_sheet(wb, notes, "Notes");
  const out = XLSX.write(wb, { bookType: "xlsx", type: "array" }) as ArrayBuffer;
  const blob = new Blob([out], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const base = fileName.replace(/\.pdf$/i, "") || "statement";
  downloadBlob(blob, `ledger-${base}.xlsx`);
}

export function exportCsv(
  table: ExtractedTable,
  fileName: string,
  parenNegative: boolean,
) {
  const { headers, rows } = mappedAoa(table, parenNegative);
  const cell = (v: string | number) => {
    const s = String(v);
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const lines = [
    headers.map(cell).join(","),
    ...rows.map((r) => r.map(cell).join(",")),
  ];
  const blob = new Blob(["\uFEFF" + lines.join("\r\n")], {
    type: "text/csv;charset=utf-8",
  });
  const base = fileName.replace(/\.pdf$/i, "") || "statement";
  downloadBlob(blob, `ledger-${base}.csv`);
}
