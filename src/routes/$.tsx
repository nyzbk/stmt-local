import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  component: NotFound,
});

function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">404</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight">This page is not in the ledger.</h1>
      <p className="mt-4 text-muted">
        Drop a statement on the tool page, or read how conversion stays on this device.
      </p>
      <p className="mt-8">
        <Link to="/" className="text-accent underline underline-offset-2">
          Back to the tool
        </Link>
      </p>
    </main>
  );
}
