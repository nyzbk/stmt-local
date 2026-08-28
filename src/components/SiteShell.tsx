import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { FooterAd } from "@/components/ads/AdUnit";
import { SoftAgencyCta } from "@/components/SoftAgencyCta";
import { Mark } from "@/components/Mark";
import { FOOTER_NAV, NAV } from "@/lib/site";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-bg text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to tool
      </a>
      <header className="border-b border-line bg-surface/90 backdrop-blur-sm">
        <div className="mx-auto flex min-h-14 max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-1">
          <Link to="/" className="flex min-h-11 items-center gap-2 font-medium tracking-tight">
            <Mark />
            <span className="font-serif text-lg">Ledger</span>
          </Link>
          <nav aria-label="Primary" className="flex flex-wrap items-center gap-1 text-sm text-muted">
            {NAV.filter((l) => l.to !== "/").map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="inline-flex min-h-11 items-center px-2 hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <SoftAgencyCta />
          <nav aria-label="Footer" className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted">
            {FOOTER_NAV.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-ink">
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="mt-6 text-center text-xs text-faint">
            Ledger is not a bank. Check exported numbers against the original PDF
            before you file or send them.
          </p>
          <FooterAd />
        </div>
      </footer>
    </div>
  );
}
