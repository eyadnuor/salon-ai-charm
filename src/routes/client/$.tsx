import { createFileRoute } from "@tanstack/react-router";
import { Sub } from "../admin/$";
import { ClientAssistant } from "@/components/client/ClientAssistant";

export const Route = createFileRoute("/client/$")({
  component: () => <><Sub role="client" /><ClientAssistant /></>,
});
