import { createFileRoute, Link } from "@tanstack/react-router";
import { DocPage } from "@/components/DocPage";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/use-cases/multi-page")({
  head: () => ({
    meta: [
      { title: "Extract a Multi-Page Bank Statement PDF | Ledger" },
      {
        name: "description",
        content:
          "Ledger drops repeated page headers so “Date” is not a transaction. For digital multi-page statements in the browser, not scans.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.origin}/use-cases/multi-page` }],
  }),
  component: MultiPage,
});

function MultiPage() {
  return (
    <DocPage kicker="Use case" title="Multi-page statements without repeating the header as a row">
      <p>
        A twelve-page current-account PDF repeats the column titles on every page. Naive
        “copy all text” tools turn each of those titles into a fake transaction called
        Date. Ledger keeps the header from the first table-like page and skips later
        copies when they look like the same role row. You still preview the table;
        if a bank designs a bizarre continuation page, remap or split the file.
      </p>
      <p>
        Progress shows “page x of y” so a long statement is not a silent spinner. On a
        phone, a full-year PDF can be too much RAM. Download January–March from the bank
        instead of the annual pack, or use a desktop tab. v1 will not OCR photographed
        pages. If page 7 is a scan insert in an otherwise digital file, those rows will
        be missing — open that page in a reader and check.
      </p>
      <p>
        After extract, scroll the preview. Export includes every kept row, not only the
        first 80 shown. The Notes sheet names the file you dropped so a three-file batch
        does not get mixed up on disk.
      </p>
      <p>
        Continuation pages sometimes shift the description column by a few millimetres.
        The gap heuristic then splits a payee in half. If you see that, remap is not
        enough — download a shorter range from the bank (one month) and convert that.
        A cleaner PDF beats a cleverer parser. Landscape statements and tiny 8-point
        type still work if the text layer exists; they just make the preview wrap on a
        phone, so landscape the device.
      </p>
      <p>
        Interest summaries and APR boxes at the back of a credit-card PDF are not
        transactions. If they land in the table, Ignore those columns or delete the
        extra rows after export. Opening-balance rows at the top are useful for a
        check against the PDF, not for a spend chart. Keep them or drop them in Excel
        once you have confirmed the first transaction date.
      </p>
      <p>
        If the bank inserted a cheque-image page in the middle of a digital file,
        that page contributes no text. The rows around it still extract. Note the
        gap, do not assume a missing day is a missing spend until you open the
        PDF. That check is why the preview exists.
      </p>
      <p>
        Credit-card statements that mix purchases, payments and interest in one
        stream still extract as one table. Sort by description after export if
        you want payments together. Ledger will not split those into three
        sheets — that would be a product we did not ship.
      </p>
      <p>
        <Link to="/">Drop a multi-page PDF</Link>
        {" · "}
        <Link to="/how-it-works">How it works</Link>
      </p>
    </DocPage>
  );
}
