import { createFileRoute, Link } from "@tanstack/react-router";
import { DocPage } from "@/components/DocPage";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/use-cases/budget")({
  head: () => ({
    meta: [
      { title: "Turn a Bank PDF into CSV for a Budget Sheet | Ledger" },
      {
        name: "description",
        content:
          "Export UTF-8 CSV from a digital statement in this browser. Parentheses-as-negative for accounting layouts. No upload to a converter.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.origin}/use-cases/budget` }],
  }),
  component: Budget,
});

function Budget() {
  return (
    <DocPage kicker="Use case" title="A monthly CSV for the budget workbook you already have">
      <p>
        Budget spreadsheets and tools like a plain Google Sheet want rows, not a
        designed PDF. Banks that only email a PDF leave you copying cells by hand or
        using an upload site. Ledger writes a UTF-8 CSV with a byte-order mark so Excel
        on Windows does not turn payee names into mojibake. Amounts that parse become
        numbers. Dates stay text so a timezone does not slide “31/01” into the previous
        day.
      </p>
      <p>
        If your PDF prints withdrawals as (12.50), enable “Treat (123.45) as negative”
        before export. Then File → Import in Sheets, or paste. Categorise there — Ledger
        does not guess “groceries” from a merchant string. It also does not sync to a
        budget app in the cloud. The CSV is a file on disk.
      </p>
      <p>
        Do this once per month when the statement lands. Three PDFs can be dropped
        together if you are catching up a quarter. Still verify a few rows against the
        PDF. A budget built on a mis-mapped column is worse than no import.
      </p>
      <p>
        Shared household sheets: convert on one phone, AirDrop the CSV, let the other
        person categorise. Nobody had to create a Ledger login because there isn’t
        one. If you already pay for a bank-sync budget app, keep using it. This page
        is for the gap where the institution’s export is PDF-only, or the CSV they
        offer is a single “balance” line with no payees.
      </p>
      <p>
        Transfers between your own accounts often appear twice (out on one PDF, in on
        the other). Ledger will not de-duplicate across files. Tag those rows in the
        budget workbook. Cash withdrawals will show the ATM descriptor the bank
        printed, not “cash”. Sort by amount to find them. None of that requires the
        PDF to sit on a converter’s disk for “processing”.
      </p>
      <p>
        Refunds printed as positive amounts in a debit column will inflate “income”
        in a naive sum. Look at the sign after export. Standing orders to yourself
        are not spending. Ledger copies what the PDF printed; your budget rules
        live in the workbook, not here.
      </p>
      <p>
        Currency symbols in the PDF (£, €, $) stay as text if they sit in the
        amount cell; the numeric parse still tries the digits. After import, set
        the column format in Sheets once. That is cheaper than an upload site
        that “detects currency” by reading the whole file on a server.
      </p>
      <p>
        <Link to="/">Export CSV</Link>
        {" · "}
        <Link to="/use-cases">All use cases</Link>
      </p>
    </DocPage>
  );
}
