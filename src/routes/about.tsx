import { createFileRoute, Link } from "@tanstack/react-router";
import { DocPage } from "@/components/DocPage";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ledger — On-Device Bank Statement Converter" },
      {
        name: "description",
        content:
          "Ledger is a local-first tool from Ultimatum: PDF.js plus an on-device table heuristic, no statement upload, no account, not a bank.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.origin}/about` }],
  }),
  component: About,
});

function About() {
  return (
    <DocPage kicker="About" title="A spreadsheet from a statement, without a copy on our servers">
      <p>
        Local-first tools exist because some files should not be a product input. A bank
        statement is one of them. Ledger exists so you can still get a table out of the
        PDF the bank already produced, without creating an account on a converter site
        and without emailing the document to a stranger’s GPU.
      </p>

      <h2>What this site is for</h2>
      <p>
        One job: read a digital, text-based statement PDF in the browser and write Excel
        or CSV. The mapping from glyphs to rows is deliberately small. When a bank
        writes “Money out” instead of “Debit”, you remap the column. That is preferable
        to claiming we maintain a hidden template for every retail bank. Mozilla PDF.js
        and SheetJS are the libraries; they run here, they are not remote services we
        proxy your file through.
      </p>
      <p>
        We ship a generated sample statement so you can see a table without dropping a
        real file. We refuse scans rather than hallucinate amounts. We keep ads away
        from Drop, Extract and Download. Those choices are the product.
      </p>

      <h2>What we do not do</h2>
      <ul>
        <li>No accounts, cloud history, or “sync my statements”.</li>
        <li>No sale of PDF bytes, extracted rows, or payee names.</li>
        <li>No watermark on the spreadsheet.</li>
        <li>No pretending the export is an official bank document.</li>
        <li>No tax filing, credit application, or bookkeeping product.</li>
      </ul>

      <h2>Who operates it</h2>
      <p>
        Ledger is operated by {SITE.operator}. It is one of a set of free, on-device
        utilities. Other utilities on other domains handle different file types; they
        are not copies of this text and they do not process your statement. For this
        site, write to <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
        Do not attach a real statement.
      </p>
      <p>
        If you found Ledger from a search for “bank statement to excel”, you are in
        the right place only if the file is a digital PDF. We will not connect to
        your online banking, scrape a portal, or store a login cookie. The
        converter is this page, this tab, this download. That is the whole
        surface area we want to be judged on.
      </p>
      <p>
        The design is paper and green ink on purpose: this is a document tool, not a
        fintech dashboard that wants your login. We will not add “connect your bank”
        because that would be a different product with a different threat model. If
        Ledger cannot read a layout, the honest output is a refusal or a table you
        can correct — not a chatbot rewriting payees.
      </p>
      <p>
        <Link to="/contact">Contact page</Link>
        {" · "}
        <Link to="/privacy">Privacy</Link>
        {" · "}
        <Link to="/">Tool</Link>
      </p>
    </DocPage>
  );
}
