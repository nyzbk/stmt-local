import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Ledger Converts a Bank Statement in Your Browser" },
      {
        name: "description",
        content:
          "Ledger reads a digital PDF statement on your device with Mozilla PDF.js, builds a table, and writes Excel with SheetJS. Nothing is uploaded.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.origin}/how-it-works` }],
  }),
  component: How,
});

function How() {
  return (
    <main id="main" className="mx-auto max-w-2xl px-4 py-12">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">Guide</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight">How it works</h1>
      <p className="mt-4 text-muted">
        Most “free” converters send the PDF to a server, then email you a spreadsheet.
        Ledger does the opposite. The statement is parsed in this tab. Close the tab and
        the bytes are gone. That is the product: a table you can check, then Excel you
        can keep, without an account and without our servers ever seeing the file.
      </p>

      <h2 className="mt-10 font-serif text-2xl">Why client-side</h2>
      <p className="mt-3 text-muted">
        A bank statement is not a meme. It has account numbers, payees, and running
        balances. The only way we can honestly say we never see it is if the file never
        leaves the browser. Mozilla PDF.js reads the document in a Web Worker. A small
        table heuristic groups lines into Date, Description, Debit, Credit, Balance.
        SheetJS writes the spreadsheet. There is no API call with your file attached.
        Ads, when they eventually go live, never receive the PDF bytes.
      </p>

      <h2 className="mt-10 font-serif text-2xl">The GitHub stack</h2>
      <p className="mt-3 text-muted">
        There is no honest open-source “300 banks” converter to clone. The Goldmine-style
        SaaS tools upload your file. Ledger packages two Apache-2.0 libraries that already
        run in the browser: PDF.js for glyphs and coordinates, SheetJS for xlsx. The
        mapping from glyphs to a transaction table is ours. If a header says Particulars
        or Money out, remap it. That is faster and safer than pretending we shipped a
        template for every bank on earth.
      </p>

      <h2 className="mt-10 font-serif text-2xl">What works</h2>
      <p className="mt-3 text-muted">
        Digital statements — the PDFs banks email, or the “download statement” file in
        online banking. Those files contain a real text layer. Ledger can select it,
        cluster it into rows by vertical position, split cells by horizontal gaps, and
        guess columns. Multi-page statements keep the header on page two; we drop the
        repeated header so you do not get “Date” as a transaction. You can process up to
        three PDFs in one drop; start with one monthly file if you are testing.
      </p>

      <h2 className="mt-10 font-serif text-2xl">What does not work in v1</h2>
      <p className="mt-3 text-muted">
        Scans, photos of paper, and password-locked files. A scan is a picture. There is
        no text layer, so a generic extractor would invent garbage. Ledger refuses instead
        of pretending. Unlock a passworded PDF in your bank app, then drop the unlocked
        copy. Optical character recognition is a later, opt-in step — the model would
        download only after you press “This is a scan”, never silently.
      </p>

      <h2 className="mt-10 font-serif text-2xl">What you get</h2>
      <p className="mt-3 text-muted">
        An Excel workbook with a Transactions sheet and a Notes sheet that records the
        original filename and that processing happened on-device. Amounts become numbers
        when they parse; dates stay strings so Excel does not shift the timezone. CSV is
        the same table with a UTF-8 BOM so Excel on Windows does not mangle characters.
        Always compare the export to the PDF before you file taxes or send it to an
        accountant. Ledger is not a bank and not an official statement.
      </p>

      <h2 className="mt-10 font-serif text-2xl">What never goes on the network</h2>
      <p className="mt-3 text-muted">
        The PDF bytes, the extracted rows, and the spreadsheet. Fonts and the PDF worker
        load from this same origin. We do not send filenames to analytics. There is no
        account, so there is nothing to store against a user. If this tab cannot reach
        the network after the first load, extraction still works — the libraries are
        already here.
      </p>

      <p className="mt-10">
        <Link to="/" className="text-accent underline underline-offset-2">
          Back to the tool
        </Link>
      </p>
    </main>
  );
}
