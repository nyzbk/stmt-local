import { Link } from "@tanstack/react-router";
import { FAQ_ITEMS } from "@/lib/ledger/faq";

export function HomeCopy() {
  return (
    <div className="mx-auto mt-16 max-w-2xl space-y-4 pb-8 text-muted">
      <h2 className="font-serif text-2xl text-ink">What Ledger actually does</h2>
      <p>
        A monthly current-account PDF is a layout problem, not a cloud problem. The bank
        already gave you a file. Online converters ask you to upload that file so a
        server can guess the table, then they watermark the sheet or charge for the
        second statement. Ledger keeps the PDF in this tab. Mozilla PDF.js reads the
        glyphs. A small on-device heuristic clusters lines into Date, Description, Debit,
        Credit and Balance. SheetJS writes Excel. Nothing is posted to our origin as a
        document body.
      </p>
      <p>
        That matters because a statement is not a holiday photo. It names payees, shows
        a running balance, and sometimes prints an IBAN in the header. The only honest
        way to say “we cannot see it” is if the bytes never leave the device. Close the
        tab and the session is gone. There is no account because there is nothing to
        store against one.
      </p>

      <h2 className="font-serif text-2xl text-ink">How a conversion runs</h2>
      <ol className="list-decimal space-y-3 pl-5">
        <li>
          Drop a digital PDF — the “download statement” file from online banking, not a
          photograph of paper. A sample statement is on the button above if you want to
          see the table without using a real file.
        </li>
        <li>
          Wait while each page is read in a worker on this origin. Progress shows the
          page index. Repeated headers on page two are dropped so “Date” does not become
          a fake transaction.
        </li>
        <li>
          Look at the preview. If a bank labelled a column “Money out” or “Particulars”,
          remap it with the dropdown. Tick parentheses-as-negative if your PDF uses
          accounting style.
        </li>
        <li>
          Download Excel or CSV. The Notes sheet records the filename and that work
          happened on-device. Compare totals to the PDF before anyone else sees the
          sheet.
        </li>
      </ol>

      <h2 className="font-serif text-2xl text-ink">Limits you should know</h2>
      <p>
        Digital text PDFs work. Scans, camera photos, and password-locked files do not,
        in this version. A scan has no text layer; inventing rows from pixels would be
        worse than a refusal. Unlock a protected file in the bank app, then drop the
        unlocked copy. Up to three PDFs per drop. Very long annual dumps can exhaust an
        iPhone tab — split the year, or use a desktop browser. We do not upscale
        garbage. We do not call an LLM with your transactions.
      </p>
      <p>
        Chrome, Edge, Firefox and Safari are the intended browsers. The PDF worker and
        standard fonts load from this site, not from a random CDN of the converter.
        After that first load, airplane mode still lets you extract a file already on
        the phone.
      </p>

      <h2 className="font-serif text-2xl text-ink">What never goes on the network</h2>
      <p>
        The PDF bytes, the extracted rows, and the spreadsheet blob. Filenames are not
        sent to analytics. Ads never sit on Drop, Extract or Download, and they do not
        receive the file. Placeholders stay empty until the site is Ready in AdSense.
        That is a policy choice, not a tease.
      </p>

      <p>
        Longer walkthrough: <Link to="/how-it-works">How it works</Link>. Practical
        jobs: <Link to="/use-cases">Use cases</Link>. Operator and contact:{" "}
        <Link to="/about">About</Link> and <Link to="/contact">Contact</Link>.
      </p>

      <h2 className="mt-10 font-serif text-2xl text-ink">Questions</h2>
      <dl className="mt-6 space-y-5">
        {FAQ_ITEMS.map((it) => (
          <div key={it.q}>
            <dt className="font-medium text-ink">{it.q}</dt>
            <dd className="mt-1 text-sm">{it.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
