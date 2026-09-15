import { createFileRoute, Link } from "@tanstack/react-router";
import { LedgerApp } from "@/components/ledger/LedgerApp";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/password")({
  head: () =>
    pageHead({
      title: "Open a password-locked bank statement PDF — Ledger",
      description:
        "Type the bank PDF password in this tab. PDF.js opens the file in memory. Ledger extracts the table to Excel or CSV. The password is not stored.",
      path: "/password",
    }),
  component: PasswordPage,
});

function PasswordPage() {
  return (
    <main id="main">
      <LedgerApp variant="password" />
      <article className="mx-auto mt-8 max-w-2xl space-y-4 px-4 pb-16 text-sm leading-relaxed text-muted">
        <h2 className="font-serif text-2xl text-ink">Why this page exists</h2>
        <p>
          Many banks attach a password to the statement PDF they email. The file is
          still a real PDF with a text layer — PDF.js can read it — but Mozilla’s
          library throws a PasswordException if you call getDocument without that
          string. On the home tool Ledger used to stop there: “Unlock it in your bank
          app and drop it again.” That sent people away from a conversion they could
          have finished in this tab. This page is that conversion with the password
          typed next to the drop zone.
        </p>
        <p>
          The password is a React state value on this screen. It is not written to
          localStorage, sessionStorage, cookies, or the address bar. After a
          successful extract the field is cleared. Reset clears it. Closing the tab
          clears it. We do not log it. We do not email it. There is no “remember this
          password” checkbox, because remembering it would be a vault, and Ledger is
          not a vault.
        </p>
        <h2 className="font-serif text-2xl text-ink">What this is not</h2>
        <p>
          This is not a PDF unlocker. We do not save an unprotected copy of your
          statement for download. A product that emitted “unlocked.pdf” would be a
          different threat model: it would give you a file that anyone with the
          download folder could open. Ledger’s product on this page is the same as
          on the home page — a table, then Excel or CSV. The original locked PDF
          stays the original locked PDF on your disk.
        </p>
        <p>
          It is also not Folio, which merges and splits PDFs you already have, and
          not a cracker for files you do not own. Type the password the bank already
          told you. If the export used your date of birth in ddmmyyyy, that is the
          string. If you forgot it, only the bank can issue a new file. We cannot
          guess it, and we will not run a password list against your statement.
        </p>
        <h2 className="font-serif text-2xl text-ink">Same extract, same limits</h2>
        <p>
          Once PDF.js has the document, the rest of the pipeline is unchanged:
          glyphs clustered into rows, columns scored as dates and amounts, preview
          table, remap, Excel via SheetJS, CSV with a UTF-8 BOM. Scans still fail.
          Files over 30 MB still fail. Multi-year dumps still read a cap of pages.
          Parentheses-as-negative still exists. Ads still do not sit on Extract or
          Download. LIVE ads are off until Google marks the site Ready.
        </p>
        <p>
          If you dropped an unlocked statement here by mistake, that is fine — leave
          the password field empty and you will be asked to type one, or go back to
          the <Link to="/">home tool</Link> which does not show a password field on
          purpose. The home drop zone stays a drop zone. People converting an
          ordinary emailed PDF should not have to ignore a password box.
        </p>
        <p>
          <Link to="/">Home tool</Link>
          {" · "}
          <Link to="/how-it-works">How it works</Link>
          {" · "}
          <Link to="/faq">FAQ</Link>
          {" · "}
          <Link to="/privacy">Privacy</Link>
        </p>
      </article>
    </main>
  );
}
