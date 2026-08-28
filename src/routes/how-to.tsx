import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/how-to")({
  beforeLoad: () => {
    throw redirect({ to: "/how-it-works" });
  },
});
