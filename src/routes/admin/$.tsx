import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Wrench } from "lucide-react";
import { navByRole } from "@/components/layout/nav-config";

export const Route = createFileRoute("/admin/$")({
  component: () => <Sub role="admin" />,
});

function Sub({ role }: { role: "admin" | "merchant" | "staff" | "client" }) {
  const path = useRouterState({ select: s => s.location.pathname });
  const item = navByRole[role].find(i => i.url === path);
  const title = item?.title ?? "صفحة";
  return (
    <AppShell role={role}>
      <PageHeader title={title} description="هذه الصفحة قيد التطوير في النسخة التجريبية" />
      <EmptyState
        icon={<Wrench className="h-6 w-6" />}
        title="قيد التطوير"
        description="سيتم إضافة محتوى هذه الصفحة الكامل في التحديث القادم — التنقل ونظام التصميم جاهزان."
      />
    </AppShell>
  );
}

export { Sub };
