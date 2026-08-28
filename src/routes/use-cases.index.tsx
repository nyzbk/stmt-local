import { createFileRoute, Link } from "@tanstack/react-router";
import { DocPage } from "@/components/DocPage";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/use-cases/")({
  head: () => ({
    meta: [
      { title: "When to Convert a Bank PDF to Excel on This Device | Ledger" },
      {
        name: "description",
        content:
          "Use Ledger when you need a spreadsheet for an accountant, a budget CSV, or a multi-page digital statement — without uploading the PDF.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.origin}/use-cases` }],
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
      <p>
        <Link to="/">Open the tool</Link>
      </p>
    </DocPage>
  );
}
