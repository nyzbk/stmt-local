import { createFileRoute, Link } from "@tanstack/react-router";
import { DocPage } from "@/components/DocPage";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How to Convert a Bank Statement PDF in the Browser | Ledger" },
      {
        name: "description",
        content:
          "Step-by-step: drop a digital bank PDF, remap columns on this device, download Excel. PDF.js and SheetJS run in the tab. Scans and locked files are refused.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.origin}/how-it-works` }],
  }),
  component: How,
});

function How() {
  return (
    <DocPage kicker="Guide" title="How to turn a bank PDF into a spreadsheet without uploading it">
      <p>
        The usual path is an “online converter”: you send the statement to someone else’s
        server, wait for an email, and hope they delete the file. That is a bad fit for
        a document that lists every card payment of the month. Ledger is the other path.
        The PDF you already have from the bank is parsed in this tab. You check a table.
        You download Excel or CSV. You close the tab.
      </p>

      <h2>The problem with upload converters</h2>
      <p>
        A statement PDF is small enough to email, which is why upload sites love it. It
        is also a complete picture of spending. If the converter is free, you are paying
        with the file or with a watermark. If it is paid, you still transmitted the
        document. Ledger does not take that trade. There is no API that accepts a
        multipart PDF. Ads do not get the bytes either.
      </p>

      <h2>What runs in the browser</h2>
      <p>
        Mozilla PDF.js (Apache-2.0) loads a worker from this origin and returns
        positioned text items. Ledger clusters those items by vertical position into
        lines, splits lines on horizontal gaps, and scores columns: date-like tokens,
        amount-like tokens, leftover description. SheetJS (Apache-2.0) writes an .xlsx
        file in memory. file-saver triggers the download, including on iOS. We do not
        clone a “300 banks” SaaS. Banks change templates; remapping a header is faster
        than pretending we ship a parser per institution.
      </p>

      <h2>Steps</h2>
      <ol>
        <li>
          In online banking, download the statement as PDF — not “print to paper”, not
          a screenshot. Confirm you can select a line of text in a PDF reader. If you
          cannot select text, Ledger v1 will refuse the file.
        </li>
        <li>
          Open Ledger on this site. Drop the PDF or use the file picker. You may queue
          up to three files; start with one month while you learn the preview.
        </li>
        <li>
          Wait for page progress. A twenty-page statement is normal. Do not background
          Safari on an old iPhone until the table appears.
        </li>
        <li>
          Read the first rows. If “Particulars” is sitting under Debit, change the
          column role. Ignore columns that are not transactions (page numbers, branch
          codes) by setting them to Ignore.
        </li>
        <li>
          If amounts look positive when they should be withdrawals, enable “Treat
          (123.45) as negative”. That matches many UK and Commonwealth layouts.
        </li>
        <li>
          Download Excel for a workbook with a Notes sheet, or CSV if you are pasting
          into Google Sheets. The CSV includes a UTF-8 BOM so Windows Excel does not
          scramble names of payees.
        </li>
        <li>
          Compare a handful of rows and the last balance to the PDF. Then send the sheet
          if that was the job. Delete the download when you no longer need it.
        </li>
      </ol>

      <h2>If it fails</h2>
      <ul>
        <li>Scan or photo — no text layer. Re-download a digital statement.</li>
        <li>Password prompt in the bank PDF — unlock it in the bank’s own app first.</li>
        <li>Only a logo extracts — the file is likely image-only even if it is named .pdf.</li>
        <li>Columns shift on page 4 — remap, or split the PDF in the bank portal and drop the month again.</li>
        <li>Tab crashes — the file is too large for the phone. Use a desktop browser or a shorter date range.</li>
      </ul>

      <h2>After you close the tab</h2>
      <p>
        There is no server copy to request or delete. We never received the file. That
        is the product, not a slogan. The spreadsheet on your disk is now an ordinary
        file you control.
      </p>

      <h2>Compared with the bank’s own CSV export</h2>
      <p>
        Many banks already offer CSV. Use that when it exists and when you trust the
        columns. Ledger is for the case they only gave you a PDF, or the PDF is what
        your accountant asked for and you still want a table. It is not a replacement
        for the official document. It is not Photos.app, not Excel’s PDF import (which
        also stays local, but fights layouts), and not a website that watermarks row 1.
      </p>

      <h2>What “text layer” means in practice</h2>
      <p>
        Open the PDF in any reader and try to highlight a payee name. If the letters
        select, PDF.js can see those glyphs and Ledger can cluster them. If the page
        behaves like a photograph — you can lasso a rectangle of pixels but not a
        word — there is nothing to parse. Some banks email a “PDF” that is only a
        scanned printout. v1 will say so instead of filling Description with random
        fragments from the logo.
      </p>
      <p>
        Two-column layouts and footers with “Page 3 of 12 / continued” are why we
        score rows instead of dumping every line. A running balance on the right is
        kept when it looks like an amount column. A marketing banner in the header
        is ignored when it does not sit on the same baseline as dates. You still
        look at the preview. Software that skips that look is how people file the
        wrong year.
      </p>

      <p>
        <Link to="/">Back to the tool</Link>
        {" · "}
        <Link to="/use-cases">Use cases</Link>
        {" · "}
        <Link to="/faq">FAQ</Link>
      </p>
    </DocPage>
  );
}
