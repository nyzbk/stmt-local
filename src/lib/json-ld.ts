import { FAQ_ITEMS } from "@/lib/ledger/faq";
import { SITE } from "@/lib/site";

export function siteJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Ledger — Free Bank Statement to Excel",
      url: SITE.origin,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Ledger",
      url: SITE.origin,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: SITE.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "Convert a bank statement PDF to Excel on this device",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Drop the PDF",
          text: "Choose a digital statement from your bank — not a photo of paper.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Check the table",
          text: "Remap Date, Description, Debit, Credit, Balance if a header is local.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Download Excel",
          text: "Or CSV. Nothing was uploaded. Close the tab and the bytes are gone.",
        },
      ],
    },
  ];
}
