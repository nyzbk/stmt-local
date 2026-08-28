export const SITE = {
  name: "Ledger",
  tagline: "Bank Statement to Excel",
  origin: "https://stmt-local.vercel.app",
  description:
    "Convert a PDF bank statement to Excel or CSV in your browser. The file never leaves this device. No signup, no watermark.",
  pub: "ca-pub-7636435144500691",
  contactEmail: "ultaultimatum@gmail.com",
  operator: "Ultimatum",
} as const;

export const NAV = [
  { to: "/", label: "Tool" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/faq", label: "FAQ" },
  { to: "/use-cases", label: "Use cases" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export const FOOTER_NAV = [
  ...NAV,
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
] as const;
