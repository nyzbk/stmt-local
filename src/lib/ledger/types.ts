export type ColumnRole =
  | "date"
  | "description"
  | "debit"
  | "credit"
  | "amount"
  | "balance"
  | "extra"
  | "ignore";

export const COLUMN_ROLES: { value: ColumnRole; label: string }[] = [
  { value: "date", label: "Date" },
  { value: "description", label: "Description" },
  { value: "debit", label: "Debit" },
  { value: "credit", label: "Credit" },
  { value: "amount", label: "Amount" },
  { value: "balance", label: "Balance" },
  { value: "extra", label: "Extra" },
  { value: "ignore", label: "Ignore" },
];

export type ExtractedTable = {
  pageStart: number;
  pageEnd: number;
  headers: string[];
  roles: ColumnRole[];
  rows: string[][];
  confidence: number;
};

export type ExtractSession = {
  fileName: string;
  fileSize: number;
  pageCount: number;
  tables: ExtractedTable[];
  warnings: string[];
};

export type ExtractProgress = {
  page: number;
  total: number;
};
