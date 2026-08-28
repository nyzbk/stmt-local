import { createFileRoute, Link } from "@tanstack/react-router";
import { DocPage } from "@/components/DocPage";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — Ledger Is Not a Bank" },
      {
        name: "description",
        content:
          "Ledger is a free on-device converter. Exports are not official statements. Verify numbers. Do not use it to misrepresent transactions.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.origin}/terms` }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <DocPage title="Terms">
      <p>Last updated 28 August 2026. Operator: {SITE.operator}.</p>
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
      <p>
        <Link to="/">Back to the tool</Link>
      </p>
    </DocPage>
  );
}
