import { createFileRoute, Link } from "@tanstack/react-router";
import { DocPage } from "@/components/DocPage";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Ledger Does Not Receive Your Statement" },
      {
        name: "description",
        content:
          "Bank statement PDFs are parsed only in this tab. No upload, no LLM, no storage of rows. Ads do not get the file. Contact without attachments.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.origin}/privacy` }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <DocPage title="Privacy">
      <p>Last updated 8 September 2026. Operator: {SITE.operator}.</p>
      <p>
        Your statement is processed only in memory, in this browser tab. We cannot see
        it. There is no upload of PDF bytes to any server — no POST or PUT of the File,
        ArrayBuffer, or a data URL. We do not run a third-party conversion API. We do
        not send transactions to an LLM. We do not store statements, filenames, or
        extracted rows on a backend. Refresh or close the tab and the session is gone.
      </p>
      <p>
        Libraries (PDF.js, SheetJS, fonts, the PDF worker) load from this origin. That
        is code, not your document. After they are cached, extraction can proceed
        without a network. We do not use analytics that collect file names or file
        contents. There is no account and no cookie wall for the tool itself.
      </p>
      <p>
        This site may later show Google ads. Ads do not receive the contents of your
        PDF. Until the site is Ready, you only see empty placeholders — never next to
        Drop, Extract, or Download. We do not ask anyone to click ads.
      </p>
      <h2>Hosting is not custody of the file</h2>
      <p>
        Hosting on HTTPS at stmt-local.vercel.app is not custody of your money and is
        not an upload of the PDF. Vercel may see that a browser requested the page,
        the worker script, and the fonts — ordinary static assets. Vercel does not
        receive the File object you dropped. There is no multipart form, no presigned
        bucket, and no “processing queue” email.
      </p>
      <p>
        Google ads, if they ever fill the after-success / mid / footer placeholders,
        receive the page URL and ordinary ad signals. They do not receive PDF bytes,
        extracted payees, or the Notes sheet filename. Until Site Ready those
        placeholders stay empty. We do not run analytics that log file names.
      </p>
      <p>
        If you email {SITE.contactEmail}, that message is ordinary email. That is why
        this policy and the contact page both say: do not attach a statement. An
        attachment would be the first time the operator could see your rows. We do
        not want that inbox to become a drop box.
      </p>
      <p>
        Closing the tab drops the in-memory table. Downloads you saved to disk are
        yours to delete. We cannot remotely wipe a spreadsheet we never held.
      </p>
      <p>
        Email {SITE.contactEmail} for questions about this policy. Do not attach a
        statement. See <Link to="/contact">Contact</Link> and <Link to="/terms">Terms</Link>.
      </p>
      <p>
        <Link to="/">Back to the tool</Link>
      </p>
    </DocPage>
  );
}
