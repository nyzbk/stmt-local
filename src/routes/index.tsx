import { createFileRoute } from "@tanstack/react-router";
import { HomeCopy } from "@/components/ledger/HomeCopy";
import { LedgerApp } from "@/components/ledger/LedgerApp";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Convert a Bank Statement PDF to Excel — No Upload | Ledger" },
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
      <HomeCopy />
    </main>
  );
}
