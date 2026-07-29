import { createFileRoute } from "@tanstack/react-router";
import { Sub } from "../admin/$";

export const Route = createFileRoute("/merchant/$")({
  component: () => <Sub role="merchant" />,
});
