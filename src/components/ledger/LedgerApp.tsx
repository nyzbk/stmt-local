import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AfterSuccessAd, MidContentAd } from "@/components/ads/AdUnit";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";
import { COLUMN_ROLES, type ColumnRole, type ExtractSession } from "@/lib/ledger/types";
import { ExtractError } from "@/lib/ledger/errors";
import { exportCsv, exportXlsx } from "@/lib/ledger/export";
import { buildSampleStatementFile } from "@/lib/ledger/sample-pdf";
import { cn, formatBytes } from "@/lib/utils";

type Status = "idle" | "ready" | "working" | "done" | "error";

export function LedgerApp() {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<{ page: number; total: number } | null>(null);
  const [session, setSession] = useState<ExtractSession | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [parenNegative, setParenNegative] = useState(true);
  const [dragOver, setDragOver] = useState(false);

  const table = session?.tables[0];

  useEffect(() => {
    void import("@/lib/ledger/extract");
  }, []);

  const setRoles = (i: number, role: ColumnRole) => {
    setSession((prev) => {
      if (!prev?.tables[0]) return prev;
      const t = prev.tables[0];
      const roles = [...t.roles];
      roles[i] = role;
      return { ...prev, tables: [{ ...t, roles }] };
    });
  };

  const takeFile = (f: File | undefined) => {
    if (!f) return;
    if (!/\.pdf$/i.test(f.name) && f.type !== "application/pdf") {
      setError("Drop a PDF statement.");
      setStatus("error");
      return;
    }
    setFile(f);
    setSession(null);
    setError(null);
    setStatus("ready");
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    takeFile(e.dataTransfer.files[0]);
  };

  const extract = useCallback(async (target?: File) => {
    const src = target ?? file;
    if (!src) return;
    setStatus("working");
    setError(null);
    setProgress({ page: 0, total: 1 });
    try {
      const { extractStatement } = await import("@/lib/ledger/extract");
      const result = await extractStatement(src, setProgress);
      setSession(result);
      setStatus("done");
    } catch (err) {
      const msg =
        err instanceof ExtractError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Something went wrong while reading the PDF.";
      setError(msg);
      setStatus("error");
    } finally {
      setProgress(null);
    }
  }, [file]);

  const reset = () => {
    setStatus("idle");
    setFile(null);
    setSession(null);
    setError(null);
    setProgress(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const loadSample = async () => {
    const sample = buildSampleStatementFile();
    takeFile(sample);
    await extract(sample);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
          Private · on this device
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
          Convert a bank statement PDF into Excel.
        </h1>
        <p className="mt-4 max-w-xl text-base text-muted">
          The file never leaves this device. No upload. No account. No watermark.
          Ledger is for the PDF your bank already emailed — a text layer, not a photo
          of a paper statement. Extraction runs in this tab with PDF.js and SheetJS.
          We cannot see the transactions.
        </p>
        <p className="mt-3 max-w-xl text-sm text-muted">
          Check the preview table, remap columns if a header is local, then download
          Excel or CSV. Always compare the sheet to the original PDF before you file
          taxes or send it to an accountant. Ledger is not a bank.
        </p>
        <ul className="mt-5 flex flex-wrap gap-2 text-xs text-muted">
          {["No upload", "No account", "Stays on this device"].map((c) => (
            <li
              key={c}
              className="rounded-full border border-line bg-surface px-3 py-1.5"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={cn(
          "mt-10 rounded-xl border border-line bg-surface p-5 sm:p-8",
          dragOver && "border-accent",
        )}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept="application/pdf,.pdf"
          multiple
          className="sr-only"
          onChange={(e) => takeFile(e.target.files?.[0])}
        />
        <label
          htmlFor={inputId}
          className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-line bg-bg px-4 py-10 text-center"
        >
          <span className="flex size-12 items-center justify-center rounded-md border border-line bg-surface">
            <FilePlus className="size-5" strokeWidth={1.6} aria-hidden="true" />
          </span>
          <span className="mt-3 font-medium">Drop a PDF statement</span>
          <span className="mt-1 text-sm text-muted">or click to choose a file · up to 3 PDFs</span>
        </label>

        {file && (
          <p className="mt-4 text-sm text-muted">
            {file.name} · {formatBytes(file.size)}
          </p>
        )}

        {progress && (
          <p className="mt-3 text-sm text-muted" aria-live="polite">
            Reading page {progress.page} / {progress.total}
          </p>
        )}

        {error && (
          <p className="mt-4 text-sm text-danger" role="alert">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            onClick={() => void extract()}
            disabled={!file || status === "working"}
          >
            {status === "working" ? "Extracting…" : "Extract transactions"}
          </Button>
          <Button variant="secondary" type="button" onClick={() => void loadSample()}>
            Try a sample statement
          </Button>
          {(file || session) && (
            <Button variant="ghost" type="button" onClick={reset}>
              Reset
            </Button>
          )}
        </div>
      </div>

      {status === "done" && table && (
        <section className="success-section mt-10 space-y-6">
          {session.warnings.map((w) => (
            <p key={w} className="text-sm text-muted">
              {w}
            </p>
          ))}
          <p className="text-sm text-muted">
            {table.rows.length} rows · remap columns if a header looks wrong · then download
          </p>

          <div className="flex flex-wrap gap-4 text-sm">
            <label className="inline-flex min-h-11 items-center gap-2">
              <input
                type="checkbox"
                checked={parenNegative}
                onChange={(e) => setParenNegative(e.target.checked)}
              />
              Treat (123.45) as negative
            </label>
          </div>

          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <table className="min-w-[640px] w-full border-collapse text-left text-sm">
              <thead>
                <tr>
                  {table.headers.map((h, i) => (
                    <th key={i} className="border-b border-line bg-surface px-2 py-2 align-bottom">
                      <select
                        className="min-h-11 w-full rounded-sm border border-line bg-bg px-2 text-xs"
                        value={table.roles[i]}
                        onChange={(e) => setRoles(i, e.target.value as ColumnRole)}
                        aria-label={`Column ${i + 1} role`}
                      >
                        {COLUMN_ROLES.map((r) => (
                          <option key={r.value} value={r.value}>
                            {r.label}
                          </option>
                        ))}
                      </select>
                      <div className="mt-1 font-medium">{h || `Col ${i + 1}`}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-mono text-[13px]">
                {table.rows.slice(0, 80).map((row, ri) => (
                  <tr key={ri} className="odd:bg-surface">
                    {table.headers.map((_, ci) => (
                      <td key={ci} className="whitespace-nowrap border-b border-line px-2 py-2">
                        {row[ci] || "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {table.rows.length > 80 && (
            <p className="text-xs text-faint">Showing 80 of {table.rows.length} rows. Export includes all.</p>
          )}

          <div className="flex flex-wrap gap-3">
            <Button onClick={() => exportXlsx(table, session.fileName, parenNegative)}>
              Download Excel
            </Button>
            <Button
              variant="secondary"
              onClick={() => exportCsv(table, session.fileName, parenNegative)}
            >
              Download CSV
            </Button>
          </div>

          <p className="text-xs text-faint">
            Always check the exported numbers against the original PDF before you file or send them.
          </p>
          <AfterSuccessAd />
        </section>
      )}

      <section className="mt-16 grid gap-8 sm:grid-cols-3">
        {[
          { n: "1", t: "Drop the PDF", d: "A digital statement from your bank — not a photo of paper." },
          { n: "2", t: "Check the table", d: "Remap Date, Description, Debit, Credit, Balance if needed." },
          { n: "3", t: "Download Excel", d: "Or CSV. Nothing was uploaded. Close the tab and it is gone." },
        ].map((s) => (
          <div key={s.n} className="rounded-lg border border-line bg-surface p-5">
            <p className="font-mono text-xs text-accent">{s.n}</p>
            <h2 className="mt-2 font-serif text-xl">{s.t}</h2>
            <p className="mt-2 text-sm text-muted">{s.d}</p>
          </div>
        ))}
      </section>

      <MidContentAd />
    </div>
  );
}
