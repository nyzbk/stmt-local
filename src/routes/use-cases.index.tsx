import { createFileRoute, Link } from "@tanstack/react-router";
import { DocPage } from "@/components/DocPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/use-cases/")({
  head: () =>
    pageHead({
      title: "When to Convert a Bank PDF to Excel on This Device | Ledger",
      description:
        "Use Ledger when you need a spreadsheet for an accountant, a budget CSV, or a multi-page digital statement — without uploading the PDF.",
      path: "/use-cases",
    }),
  component: UseCases,
});

function UseCases() {
  return (
    <DocPage kicker="Use cases" title="Jobs a local statement table is actually for">
      <p>
        Ledger is not a general “PDF to Excel” toy. It is aimed at people who already
        have a bank PDF and need rows they can sort, without mailing that PDF to a
        conversion site. Three common jobs:
      </p>
      <ul>
        <li>
          <Link to="/use-cases/accountant">Send an accountant a sheet, not the raw statement PDF</Link>
        </li>
        <li>
          <Link to="/use-cases/budget">Drop monthly CSV into a budget spreadsheet</Link>
        </li>
        <li>
          <Link to="/use-cases/multi-page">Clean a multi-page digital statement</Link>
        </li>
      </ul>
      <p>
        If your bank already offers a good CSV export, use that. If they only gave you
        a PDF, or the PDF is what arrived by email, this tab is the middle path.
      </p>
      <p>
        What these jobs share: a digital PDF, a human looking at the preview, and no
        upload. What they do not share with a generic “convert any PDF” site: we
        refuse image-only files, we talk about debit/credit and parentheses, and we
        will not pretend a sheet is a filing. Pick the job that matches, then use the
        tool on the home page.
      </p>
      <h2>A narrow job, not any PDF</h2>
      <p>
        A local statement table is a narrow job. It is not “any PDF to Excel”. People
        land here with one of three already-existing PDFs: the monthly file the bank
        emailed, the annual pack downloaded as a single document, or a statement an
        accountant asked for in a spreadsheet because their software will not ingest
        a bank PDF. Those three jobs share a digital text layer. They do not share a
        photo of a paper statement on a kitchen table.
      </p>
      <p>
        If the bank already offers a clean CSV or OFX from the same login that
        produced the PDF, use that export. Ledger exists for the gap where the
        institution only attached a PDF, or the PDF is what arrived in email and the
        CSV button lives three menus deeper than anyone will click on a phone. We
        will not scrape the bank portal. We will not store a login cookie. Open
        Banking and Plaid are other products.
      </p>
      <p>
        The accountant job wants a sheet they can sort without taking custody of a
        PDF that still contains your address and account number in the header. You
        still owe them the original PDF if they are filing; Ledger is the working
        table, not the record. The budget job wants a monthly CSV you can append to
        a spreadsheet you already keep, with amounts as numbers and dates left as
        text so Excel does not shift the day. The multi-page job wants one drop of a
        12-page digital file, not twelve photos.
      </p>
      <p>
        What these jobs refuse: using Ledger as the only tax record; treating the
        export as an official statement; running a scan through silent OCR; batching
        a whole year on a tired iPhone tab; emailing us the file when a column maps
        wrong. Pick the job that matches, open the matching page, then use the tool
        on the home page. If none of the three jobs match, you probably need the
        bank’s own CSV, not a converter.
      </p>
      <p>
        <Link to="/">Open the tool</Link>
      </p>
    </DocPage>
  );
}
