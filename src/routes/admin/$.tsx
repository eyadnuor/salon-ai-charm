import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, Wrench } from "lucide-react";
import { navByRole } from "@/components/layout/nav-config";
import { roleHomes } from "@/lib/auth";

export const Route = createFileRoute("/admin/$")({
  component: () => <Sub role="admin" />,
});

function Sub({ role }: { role: "admin" | "merchant" | "staff" | "client" }) {
  const path = useRouterState({ select: s => s.location.pathname });
  const items = navByRole[role];
  const item = items.find(i => i.url === path);
  const title = item?.title ?? "صفحة";
  const Icon = item?.icon ?? Wrench;
  const related = items.filter(i => i.group === item?.group && i.url !== path).slice(0, 4);

  return (
    <AppShell role={role}>
      <Card className="relative overflow-hidden border-0 bg-gradient-hero p-8 text-white shadow-elegant sm:p-10">
        <div className="absolute -left-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
        <div className="relative flex flex-col items-start gap-5">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/15 backdrop-blur">
            <Icon className="h-8 w-8" />
          </div>
          <div>
            <Badge variant="outline" className="mb-3 gap-1 border-white/30 bg-white/10 text-[11px] text-white">
              <Sparkles className="h-3 w-3" /> قريباً في صالون AI
            </Badge>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">{title}</h1>
            <p className="mt-2 max-w-lg text-sm text-white/80">
              نعمل حالياً على بناء تجربة {title} الكاملة بنفس مستوى الجودة الذي شاهدته في باقي لوحة التحكم.
              التصميم والتنقل جاهزان بالكامل، وسيتم تفعيل البيانات الحية قريباً.
            </p>
          </div>
          <Button asChild variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white">
            <Link to={roleHomes[role]}>العودة إلى لوحة القيادة <ArrowLeft className="mr-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </Card>

      {related.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-bold text-muted-foreground">صفحات ذات صلة في {item?.group}</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {related.map((r) => (
              <Link
                key={r.url}
                to={r.url}
                className="group flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elegant"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-brand text-primary-foreground transition group-hover:scale-105">
                  <r.icon className="h-4 w-4" />
                </div>
                <span className="truncate text-sm font-bold">{r.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </AppShell>
  );
}

export { Sub };
