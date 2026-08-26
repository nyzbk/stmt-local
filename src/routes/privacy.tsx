import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Ledger" },
      {
        name: "description",
        content:
          "Ledger parses bank statements only in memory, in this tab. We do not upload, store, or send the file to a converter or an LLM.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.origin}/privacy` }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <main id="main" className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-serif text-4xl tracking-tight">Privacy</h1>
      <p className="mt-4 text-muted">Last updated 26 August 2026.</p>
      <p className="mt-6 text-muted">
        Your statement is processed only in memory, in this browser tab. We cannot see
        it. There is no upload of PDF bytes to any server — no POST or PUT of the File,
        ArrayBuffer, or a data URL.
      </p>
      <p className="mt-4 text-muted">
        We do not run a third-party conversion API. We do not send financial data to an
        LLM. We do not store statements, filenames, or extracted rows. Refresh or close
        the tab and the session is gone.
      </p>
      <p className="mt-4 text-muted">
        This site may later show Google ads. Ads do not receive the contents of your PDF.
        Until the site is Ready, you only see empty placeholders — never next to Drop,
        Extract, or Download.
      </p>
      <p className="mt-4 text-muted">
        We do not use analytics that collect file names or file contents. There is no
        account and no cookie wall for the tool itself.
      </p>
      <p className="mt-10">
        <Link to="/" className="text-accent underline underline-offset-2">
          Back to the tool
        </Link>
      </p>
    </main>
  );
}
