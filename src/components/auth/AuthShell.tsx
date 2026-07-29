import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export function AuthShell({ title, subtitle, children, footer }: {
  title: string; subtitle?: string; children: ReactNode; footer?: ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex relative bg-gradient-hero p-12 text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,white,transparent_60%)] opacity-10" />
        <div className="relative flex flex-col justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/20 backdrop-blur">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xl font-black">صالون AI</span>
          </Link>
          <div>
            <h2 className="text-4xl font-black leading-tight">أدر صالونك بذكاء<br/>واربح وقتك.</h2>
            <p className="mt-4 text-white/85 max-w-md">
              انضم لأكثر من 50 صالوناً يستخدمون منصتنا يومياً لتنظيم حجوزاتهم وزيادة أرباحهم.
            </p>
          </div>
          <div className="text-xs text-white/70">© {new Date().getFullYear()} صالون AI</div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-12 bg-gradient-soft">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-lg font-black">صالون AI</span>
          </Link>
          <h1 className="text-3xl font-black">{title}</h1>
          {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-sm text-center text-muted-foreground">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
