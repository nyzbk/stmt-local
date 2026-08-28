import { createFileRoute, Link } from "@tanstack/react-router";
import { DocPage } from "@/components/DocPage";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Ledger — No Statement Uploads" },
      {
        name: "description",
        content:
          "Email Ultimatum about Ledger. Include the page URL and browser. Do not attach a bank statement PDF.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.origin}/contact` }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <DocPage kicker="Contact" title="Write about the tool, not the statement">
      <p>
        Email{" "}
        <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
        . That inbox is read. There is no upload form on this page on purpose: a form
        that accepted a PDF would break the promise that statements stay on your device.
      </p>
      <p>Include:</p>
      <ul>
        <li>The page URL (for example {SITE.origin}/how-it-works)</li>
        <li>Browser and device (Safari on iOS 18, Chrome on Windows, …)</li>
        <li>What you expected (Excel columns, a refusal of a scan, a sample button)</li>
      </ul>
      <p>
        We do not accept statement PDFs, screenshots of full transactions, or passworded
        files by email. If a layout failed, describe the bank’s column names, not the
        rows. For privacy detail see <Link to="/privacy">Privacy</Link>. Operator:{" "}
        {SITE.operator}.
      </p>
      <p>
        <Link to="/">Back to the tool</Link>
      </p>
    </DocPage>
  );
}
