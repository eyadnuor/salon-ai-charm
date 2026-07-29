import { createFileRoute } from "@tanstack/react-router";
import { Sub } from "../admin/$";

export const Route = createFileRoute("/staff/$")({
  component: () => <Sub role="staff" />,
});
