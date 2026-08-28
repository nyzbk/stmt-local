import type { ReactNode } from "react";

export function DocPage({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <main id="main" className="mx-auto max-w-2xl px-4 py-12">
      {kicker ? (
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">{kicker}</p>
      ) : null}
      <h1 className={`${kicker ? "mt-3" : ""} font-serif text-4xl tracking-tight`}>{title}</h1>
      <div className="mt-6 space-y-4 text-muted [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-ink [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
    </main>
  );
}
