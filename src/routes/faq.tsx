import { createFileRoute, Link } from "@tanstack/react-router";
import { DocPage } from "@/components/DocPage";
import { FAQ_ITEMS } from "@/lib/ledger/faq";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Bank Statement to Excel on This Device | Ledger" },
      {
        name: "description",
        content:
          "Does Ledger upload statements? Which PDFs work? iPhone, scans, ads, Excel accuracy, and how to contact the operator without sending the file.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.origin}/faq` }],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <DocPage kicker="FAQ" title="Questions about converting a statement in this tab">
      <p>
        Short answers about Ledger specifically — a bank-statement PDF to Excel tool
        that never posts the file. If you meant image conversion or invoices, that is a
        different local tool.
      </p>
      <dl className="space-y-6">
        {FAQ_ITEMS.map((it) => (
          <div key={it.q}>
            <dt className="font-medium text-ink">{it.q}</dt>
            <dd className="mt-1">{it.a}</dd>
          </div>
        ))}
      </dl>
      <p>
        <Link to="/">Open the tool</Link>
        {" · "}
        <Link to="/contact">Contact</Link>
      </p>
    </DocPage>
  );
}
