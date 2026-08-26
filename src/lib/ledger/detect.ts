import type { ColumnRole } from "./types";

const DATE_RE =
  /^(?:\d{4}[-/.]\d{1,2}[-/.]\d{1,2}|\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4}|\d{1,2}\s+[A-Za-z]{3,9}\s+\d{2,4}|[A-Za-z]{3,9}\s+\d{1,2},?\s+\d{2,4})$/;

const AMOUNT_RE =
  /^(?:\()?[-+]?[$€£¥₽]?\s*-?\d{1,3}(?:[ ,.\u00a0]\d{3})*(?:[.,]\d{1,2})?\s*[$€£¥₽]?(?:\))?$/;

const HEADER_HINTS: Record<string, ColumnRole> = {
  date: "date",
  posted: "date",
  "value date": "date",
  "posting date": "date",
  trans: "date",
  transaction: "date",
  description: "description",
  particulars: "description",
  details: "description",
  narrative: "description",
  memo: "description",
  payee: "description",
  merchant: "description",
  debit: "debit",
  withdrawal: "debit",
  moneyout: "debit",
  "money out": "debit",
  payments: "debit",
  credit: "credit",
  deposit: "credit",
  moneyin: "credit",
  "money in": "credit",
  amount: "amount",
  value: "amount",
  balance: "balance",
  running: "balance",
};

export function looksLikeDate(cell: string): boolean {
  const t = cell.trim();
  if (t.length < 6 || t.length > 24) return false;
  return DATE_RE.test(t);
}

export function looksLikeAmount(cell: string): boolean {
  const t = cell.trim().replace(/\s/g, " ");
  if (!t) return false;
  if (!AMOUNT_RE.test(t)) return false;
  const digits = t.replace(/[^\d]/g, "");
  return digits.length >= 1 && digits.length <= 14;
}

export function parseAmount(cell: string, parenNegative: boolean): number | null {
  let t = cell.trim();
  if (!t) return null;
  const paren = /^\(.*\)$/.test(t);
  t = t.replace(/[()]/g, "").replace(/[$€£¥₽]/g, "").trim();
  const neg = t.startsWith("-") || t.startsWith("+") ? t.startsWith("-") : false;
  t = t.replace(/^[+-]/, "").trim();
  if (/,\d{1,2}$/.test(t) && t.includes(".")) {
    t = t.replace(/\./g, "").replace(",", ".");
  } else if (/,\d{1,2}$/.test(t) && (t.match(/,/g) ?? []).length === 1) {
    t = t.replace(",", ".");
  } else {
    t = t.replace(/,/g, "");
  }
  t = t.replace(/\s/g, "").replace(/\u00a0/g, "");
  const n = Number(t);
  if (!Number.isFinite(n)) return null;
  if (paren && parenNegative) return -Math.abs(n);
  return neg ? -Math.abs(n) : n;
}

function headerRole(header: string): ColumnRole | null {
  const h = header.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
  if (!h) return null;
  if (HEADER_HINTS[h]) return HEADER_HINTS[h];
  for (const [k, role] of Object.entries(HEADER_HINTS)) {
    if (h.includes(k)) return role;
  }
  return null;
}

export function guessRoles(headers: string[], columns: string[][]): ColumnRole[] {
  const colCount = Math.max(headers.length, columns.length);
  const roles: ColumnRole[] = Array.from({ length: colCount }, () => "extra");

  for (let c = 0; c < colCount; c++) {
    const fromHeader = headers[c] ? headerRole(headers[c]!) : null;
    const cells = (columns[c] ?? []).map((x) => x.trim()).filter(Boolean);
    const sample = cells.slice(0, 40);
    const dateHits = sample.filter(looksLikeDate).length;
    const amountHits = sample.filter(looksLikeAmount).length;
    const avgLen =
      sample.reduce((s, x) => s + x.length, 0) / Math.max(sample.length, 1);

    if (fromHeader) {
      roles[c] = fromHeader;
      continue;
    }
    if (sample.length && dateHits / sample.length >= 0.45) {
      roles[c] = "date";
    } else if (sample.length && amountHits / sample.length >= 0.45) {
      roles[c] = "amount";
    } else if (avgLen >= 10) {
      roles[c] = "description";
    }
  }

  const amountIdx = roles
    .map((r, i) => (r === "amount" ? i : -1))
    .filter((i) => i >= 0);

  if (amountIdx.length >= 3) {
    roles[amountIdx[0]!] = "debit";
    roles[amountIdx[1]!] = "credit";
    roles[amountIdx[amountIdx.length - 1]!] = "balance";
  } else if (amountIdx.length === 2) {
    roles[amountIdx[0]!] = "amount";
    roles[amountIdx[1]!] = "balance";
  }

  if (!roles.includes("description")) {
    let best = -1;
    let bestLen = 0;
    for (let c = 0; c < colCount; c++) {
      if (roles[c] === "date" || roles[c] === "debit" || roles[c] === "credit" || roles[c] === "amount" || roles[c] === "balance") {
        continue;
      }
      const cells = columns[c] ?? [];
      const avg = cells.reduce((s, x) => s + x.length, 0) / Math.max(cells.length, 1);
      if (avg > bestLen) {
        bestLen = avg;
        best = c;
      }
    }
    if (best >= 0) roles[best] = "description";
  }

  return roles;
}

export function isHeaderRow(cells: string[]): boolean {
  const joined = cells.join(" ").toLowerCase();
  const keys = ["date", "description", "debit", "credit", "balance", "amount", "particulars", "details", "withdrawal", "deposit"];
  let hits = 0;
  for (const k of keys) if (joined.includes(k)) hits += 1;
  return hits >= 2;
}
