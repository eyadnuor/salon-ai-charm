import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { AuthShell } from "@/components/auth/AuthShell";
import { signInAs, roleHomes, roleLabels } from "@/lib/auth";
import { ShieldCheck, Store, UserCog, Users } from "lucide-react";
import type { Role } from "@/types";

export const Route = createFileRoute("/auth/role-select")({
  head: () => ({ meta: [{ title: "اختر دورك — صالون AI" }, { name: "description", content: "اختر دورك للدخول للوحة المناسبة." }] }),
  component: RoleSelect,
});

const opts: { role: Role; icon: typeof Store; desc: string }[] = [
  { role: "admin", icon: ShieldCheck, desc: "إدارة كاملة للمنصة والتجار" },
  { role: "merchant", icon: Store, desc: "أدر صالونك، حجوزاتك وموظفيك" },
  { role: "staff", icon: UserCog, desc: "لوحة الموظف: حجوزاتك وحضورك" },
  { role: "client", icon: Users, desc: "احجز مواعيدك، ونقاط الولاء" },
];

function RoleSelect() {
  const navigate = useNavigate();
  const pick = (role: Role) => {
    signInAs(role);
    navigate({ to: roleHomes[role] });
  };
  return (
    <AuthShell title="اختر دورك" subtitle="جرّب أياً من اللوحات الأربع فوراً">
      <div className="grid gap-3">
        {opts.map(({ role, icon: Icon, desc }) => (
          <Card
            key={role}
            className="p-4 cursor-pointer transition-all hover:border-primary hover:shadow-soft"
            onClick={() => pick(role)}
          >
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-primary-foreground shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="font-bold">{roleLabels[role]}</div>
                <div className="text-xs text-muted-foreground">{desc}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AuthShell>
  );
}
