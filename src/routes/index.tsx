import { createFileRoute } from "@tanstack/react-router";
import { HomeCopy } from "@/components/ledger/HomeCopy";
import { LedgerApp } from "@/components/ledger/LedgerApp";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Convert a Bank Statement PDF to Excel — No Upload | Ledger",
      description: SITE.description,
      path: "/",
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
