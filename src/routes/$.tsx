import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$ ".trim())({
  loader: () => {
    throw notFound();
  },
});
