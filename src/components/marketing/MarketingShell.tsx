import { Link } from "@tanstack/react-router";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/pricing", label: "الأسعار" },
  { to: "/about", label: "من نحن" },
  { to: "/contact", label: "تواصل معنا" },
];

export function MarketingHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-lg font-black">صالون AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 mx-auto">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "text-foreground bg-muted" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 mr-auto">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/auth/login">تسجيل الدخول</Link>
          </Button>
          <Button asChild className="bg-gradient-brand shadow-soft">
            <Link to="/auth/register">ابدأ مجاناً</Link>
          </Button>
          <button
            className="md:hidden rounded-md p-2 hover:bg-muted"
            onClick={() => setOpen((v) => !v)}
            aria-label="القائمة"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t bg-background">
          <nav className="mx-auto flex max-w-7xl flex-col p-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/auth/login" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">تسجيل الدخول</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function MarketingFooter() {
  return (
    <footer className="border-t bg-card mt-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-black">صالون AI</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            منصة سعودية متكاملة لإدارة الصالونات ومراكز التجميل بالذكاء الاصطناعي.
          </p>
        </div>
        <div>
          <div className="mb-3 font-bold">المنتج</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/pricing" className="hover:text-foreground">الأسعار</Link></li>
            <li><Link to="/" className="hover:text-foreground">المزايا</Link></li>
            <li><Link to="/auth/register" className="hover:text-foreground">تجربة مجانية</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 font-bold">الشركة</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">من نحن</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">تواصل معنا</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 font-bold">قانوني</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/terms" className="hover:text-foreground">الشروط</Link></li>
            <li><Link to="/privacy" className="hover:text-foreground">الخصوصية</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} صالون AI. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <div className={cn("min-h-[60vh]")}>{children}</div>
      <MarketingFooter />
    </div>
  );
}
