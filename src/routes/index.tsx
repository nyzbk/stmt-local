import { createFileRoute } from "@tanstack/react-router";
import { LedgerApp } from "@/components/ledger/LedgerApp";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bank Statement to Excel — Free, No Upload | Ledger" },
      { name: "description", content: SITE.description },
    ],
    links: [{ rel: "canonical", href: `${SITE.origin}/` }],
  }),
  component: Home,
});

function Home() {
  return (
    <main id="main">
      <LedgerApp />
    </main>
  );
}
