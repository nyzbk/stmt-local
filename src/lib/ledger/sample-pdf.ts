/** Synthetic digital statement — generated in-memory, never a real bank file. */

function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

type Row = { date: string; desc: string; debit: string; credit: string; balance: string };

function txPage(title: string, subtitle: string, rows: Row[], yStart = 700): string {
  const lines: string[] = [];
  lines.push("BT");
  lines.push("/F1 14 Tf");
  lines.push(`1 0 0 1 50 ${yStart + 40} Tm (${esc(title)}) Tj`);
  lines.push("/F1 9 Tf");
  lines.push(`1 0 0 1 50 ${yStart + 24} Tm (${esc(subtitle)}) Tj`);
  lines.push("/F1 8 Tf");
  const header: Row = {
    date: "Date",
    desc: "Description",
    debit: "Debit",
    credit: "Credit",
    balance: "Balance",
  };
  const all = [header, ...rows];
  all.forEach((r, i) => {
    const y = yStart - i * 16;
    const font = i === 0 ? "/F1 8 Tf" : "/F1 8 Tf";
    lines.push(font);
    lines.push(`1 0 0 1 50 ${y} Tm (${esc(r.date)}) Tj`);
    lines.push(`1 0 0 1 130 ${y} Tm (${esc(r.desc)}) Tj`);
    lines.push(`1 0 0 1 340 ${y} Tm (${esc(r.debit)}) Tj`);
    lines.push(`1 0 0 1 420 ${y} Tm (${esc(r.credit)}) Tj`);
    lines.push(`1 0 0 1 500 ${y} Tm (${esc(r.balance)}) Tj`);
  });
  lines.push("ET");
  return lines.join("\n");
}

function pdfFromStreams(streams: string[]): Uint8Array {
  const encoder = new TextEncoder();
  const objs: string[] = [];
  objs[0] = "%PDF-1.4\n";
  const body: { n: number; bytes: Uint8Array }[] = [];

  function add(n: number, content: string) {
    body.push({ n, bytes: encoder.encode(`${n} 0 obj\n${content}\nendobj\n`) });
  }

  const kids = streams.map((_, i) => `${4 + i * 2} 0 R`).join(" ");
  add(1, "<< /Type /Catalog /Pages 2 0 R >>");
  add(2, `<< /Type /Pages /Count ${streams.length} /Kids [${kids}] >>`);
  add(3, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

  streams.forEach((stream, i) => {
    const pageObj = 4 + i * 2;
    const contentObj = pageObj + 1;
    const streamBytes = encoder.encode(stream);
    add(
      pageObj,
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentObj} 0 R >>`,
    );
    add(contentObj, `<< /Length ${streamBytes.length} >>\nstream\n${stream}\nendstream`);
  });

  const parts: Uint8Array[] = [encoder.encode("%PDF-1.4\n")];
  const offsets: number[] = [0];
  let pos = parts[0]!.length;
  const sorted = [...body].sort((a, b) => a.n - b.n);
  for (const o of sorted) {
    offsets[o.n] = pos;
    parts.push(o.bytes);
    pos += o.bytes.length;
  }

  const xrefStart = pos;
  const maxN = sorted[sorted.length - 1]!.n;
  let xref = `xref\n0 ${maxN + 1}\n`;
  xref += "0000000000 65535 f \n";
  for (let i = 1; i <= maxN; i++) {
    xref += String(offsets[i] ?? 0).padStart(10, "0") + " 00000 n \n";
  }
  xref += `trailer << /Size ${maxN + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;
  parts.push(encoder.encode(xref));

  let total = 0;
  for (const p of parts) total += p.length;
  const out = new Uint8Array(total);
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}

export function buildSampleStatementFile(): File {
  const p1: Row[] = [
    { date: "2026-03-01", desc: "Opening balance", debit: "", credit: "", balance: "4,250.00" },
    { date: "2026-03-02", desc: "GROCERY MARKET 441", debit: "86.40", credit: "", balance: "4,163.60" },
    { date: "2026-03-03", desc: "CITY TRANSIT TAP", debit: "2.90", credit: "", balance: "4,160.70" },
    { date: "2026-03-04", desc: "PAYROLL ACME CORP", debit: "", credit: "2,180.00", balance: "6,340.70" },
    { date: "2026-03-05", desc: "COFFEE HOUSE 12", debit: "6.50", credit: "", balance: "6,334.20" },
    { date: "2026-03-06", desc: "RENT MARCH", debit: "1,450.00", credit: "", balance: "4,884.20" },
    { date: "2026-03-07", desc: "UTILITY ELECTRIC", debit: "94.12", credit: "", balance: "4,790.08" },
    { date: "2026-03-08", desc: "PHARMACY RX", debit: "18.77", credit: "", balance: "4,771.31" },
    { date: "2026-03-09", desc: "TRANSFER FROM SAVINGS", debit: "", credit: "400.00", balance: "5,171.31" },
    { date: "2026-03-10", desc: "BOOKSHOP DOWNTOWN", debit: "24.00", credit: "", balance: "5,147.31" },
    { date: "2026-03-11", desc: "FUEL STATION 9", debit: "52.30", credit: "", balance: "5,095.01" },
    { date: "2026-03-12", desc: "MOBILE PLAN", debit: "35.00", credit: "", balance: "5,060.01" },
  ];
  const p2: Row[] = [
    { date: "2026-03-14", desc: "GROCERY MARKET 441", debit: "61.22", credit: "", balance: "4,998.79" },
    { date: "2026-03-16", desc: "ATM WITHDRAWAL", debit: "80.00", credit: "", balance: "4,918.79" },
    { date: "2026-03-18", desc: "ONLINE STORE", debit: "39.99", credit: "", balance: "4,878.80" },
    { date: "2026-03-20", desc: "INTEREST CREDIT", debit: "", credit: "1.12", balance: "4,879.92" },
    { date: "2026-03-22", desc: "DINER 18TH ST", debit: "28.40", credit: "", balance: "4,851.52" },
    { date: "2026-03-25", desc: "INSURANCE AUTO", debit: "119.00", credit: "", balance: "4,732.52" },
    { date: "2026-03-28", desc: "PAYROLL ACME CORP", debit: "", credit: "2,180.00", balance: "6,912.52" },
    { date: "2026-03-30", desc: "CLOSING SNAPSHOT", debit: "", credit: "", balance: "6,912.52" },
  ];

  const s1 = txPage("Example Bank", "Statement 1 Mar 2026 – 31 Mar 2026   Account **** 4412", p1);
  const s2 = txPage("Example Bank", "Statement 1 Mar 2026 – 31 Mar 2026   Page 2 of 2", p2);
  const bytes = pdfFromStreams([s1, s2]);
  const ab = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(ab).set(bytes);
  const blob = new Blob([ab], { type: "application/pdf" });
  return new File([blob], "example-bank-statement-mar-2026.pdf", { type: "application/pdf" });
}
