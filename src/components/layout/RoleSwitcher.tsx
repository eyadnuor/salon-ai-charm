import { useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { UserCog, Users, Store, ShieldCheck, X, Sparkles } from "lucide-react";
import { signInAs, roleLabels, roleHomes } from "@/lib/auth";
import { cn } from "@/lib/utils";
import type { Role } from "@/types";

const options: { role: Role; icon: typeof Users; desc: string }[] = [
  { role: "admin", icon: ShieldCheck, desc: "إدارة المنصة والتجار" },
  { role: "merchant", icon: Store, desc: "إدارة الصالون" },
  { role: "staff", icon: UserCog, desc: "لوحة الموظف" },
  { role: "client", icon: Users, desc: "تجربة العميل" },
];

export function RoleSwitcher() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  // Hide on auth pages
  if (path.startsWith("/auth")) return null;

  const switchTo = (role: Role) => {
    signInAs(role);
    setOpen(false);
    navigate({ to: roleHomes[role] });
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full bg-gradient-brand px-4 py-3 text-sm font-bold text-primary-foreground shadow-elegant transition-transform hover:scale-105"
        )}
        aria-label="تبديل الدور التجريبي"
      >
        <Sparkles className="h-4 w-4" />
        <span className="hidden sm:inline">جرّب دوراً آخر</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-start bg-black/40 p-4 sm:items-center sm:justify-center" onClick={() => setOpen(false)}>
          <div
            className="w-full max-w-md rounded-2xl bg-card p-6 shadow-elegant"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">تبديل الدور التجريبي</h3>
                <p className="text-xs text-muted-foreground">جرّب اللوحات الأربع مباشرة</p>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-md p-1 hover:bg-muted"><X className="h-4 w-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {options.map(({ role, icon: Icon, desc }) => (
                <button
                  key={role}
                  onClick={() => switchTo(role)}
                  className="group flex flex-col items-start gap-2 rounded-xl border border-border bg-background p-4 text-right transition-all hover:border-primary hover:shadow-soft"
                >
                  <div className="rounded-lg bg-gradient-brand p-2 text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold">{roleLabels[role]}</div>
                    <div className="text-xs text-muted-foreground">{desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
