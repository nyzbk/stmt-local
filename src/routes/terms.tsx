import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — Ledger" },
      {
        name: "description",
        content:
          "Ledger is a free on-device converter. It is not a bank and not financial advice. Verify exported numbers against the original PDF.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.origin}/terms` }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <main id="main" className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-serif text-4xl tracking-tight">Terms</h1>
      <p className="mt-4 text-muted">Last updated 26 August 2026.</p>
      <p className="mt-6 text-muted">
        Ledger is a free browser tool that attempts to turn a text-based bank statement
        PDF into a spreadsheet. It is provided as-is. Banks do not share one layout.
        Columns can be guessed wrong. Always check the export against the original PDF
        before you file taxes, apply for credit, or send numbers to an accountant.
      </p>
      <p className="mt-4 text-muted">
        Ledger is not a bank, not an accountant, and not financial advice. The export is
        not an official statement. Do not use Ledger to hide transactions, alter
        evidence, or misrepresent activity to anyone.
      </p>
      <p className="mt-4 text-muted">
        You are responsible for files you open on your own device. Do not drop documents
        you are not allowed to process.
      </p>
      <p className="mt-10">
        <Link to="/" className="text-accent underline underline-offset-2">
          Back to the tool
        </Link>
      </p>
    </main>
  );
}
