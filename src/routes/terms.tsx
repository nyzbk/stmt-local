import { createFileRoute, Link } from "@tanstack/react-router";
import { DocPage } from "@/components/DocPage";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      title: "Terms — Ledger Is Not a Bank",
      description:
        "Ledger is a free on-device converter. Exports are not official statements. Verify numbers. Do not use it to misrepresent transactions.",
      path: "/terms",
    }),
  component: Terms,
});

function Terms() {
  return (
    <DocPage title="Terms — Ledger is not a bank">
      <p>Last updated 15 September 2026. Operator: {SITE.operator}.</p>
      <p>
        Ledger is a free browser tool that attempts to turn a text-based bank statement
        PDF into a spreadsheet. It is provided as-is. Banks do not share one layout.
        Columns can be guessed wrong. Always check the export against the original PDF
        before you file taxes, apply for credit, or send numbers to an accountant.
      </p>
      <p>
        Ledger is not a bank, not an accountant, and not financial advice. The export is
        not an official statement. Do not use Ledger to hide transactions, alter
        evidence, or misrepresent activity to anyone. You are responsible for files you
        open on your own device. Do not drop documents you are not allowed to process.
      </p>
      <p>
        The site is hosted on HTTPS. Hosting a static converter is not custody of your
        money. Contact: {SITE.contactEmail}. Do not email the PDF.{" "}
        <Link to="/privacy">Privacy</Link>.
      </p>
      <h2>What the sheet is not</h2>
      <p>
        Ledger is not a payment institution, not a tax agent, and not a substitute for
        the PDF your bank signed. If a mapped column is wrong, you fix it before
        anyone else relies on the sheet. If you are not allowed to process a
        statement — someone else’s account, a file from work you should not have —
        do not drop it here.
      </p>
      <p>
        We may show Google ads after Site Ready. Ads are not advice. Do not click
        them. Do not ask other people to click them. Invalid traffic is an AdSense
        program-policy violation (help 48182) and it burns the whole account, not one
        site.
      </p>
      <p>
        The sample PDF on the home page is generated. It is not a real bank’s
        document. Do not treat sample rows as evidence of anything. Last updated 15
        September 2026. Contact without attachments: {SITE.contactEmail}.
      </p>
      <p>
        Password-locked statements are opened only in this tab via PDF.js. We do not
        sell an “unlocked PDF” download. If you do not know the bank password, only
        the bank can issue a new file. Closing the tab drops the password from memory.
      </p>
      <p>
        <Link to="/">Back to the tool</Link>
      </p>
    </DocPage>
  );
}
