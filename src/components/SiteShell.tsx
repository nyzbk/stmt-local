import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { FooterAd } from "@/components/ads/AdUnit";
import { SoftAgencyCta } from "@/components/SoftAgencyCta";
import { Mark } from "@/components/Mark";

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
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
          <Link to="/" className="flex min-h-11 items-center gap-2 font-medium tracking-tight">
            <Mark />
            <span className="font-serif text-lg">Ledger</span>
          </Link>
          <nav className="flex items-center gap-1 text-sm text-muted">
            <Link to="/how-it-works" className="inline-flex min-h-11 items-center px-2 hover:text-ink">
              How it works
            </Link>
            <Link to="/privacy" className="inline-flex min-h-11 items-center px-2 hover:text-ink">
              Privacy
            </Link>
            <Link to="/terms" className="hidden min-h-11 items-center px-2 hover:text-ink sm:inline-flex">
              Terms
            </Link>
          </nav>
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <SoftAgencyCta />
          <nav className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-muted">
            <Link to="/how-it-works" className="hover:text-ink">
              How it works
            </Link>
            <Link to="/privacy" className="hover:text-ink">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-ink">
              Terms
            </Link>
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
