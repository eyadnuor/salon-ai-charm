import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { plans } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "الأسعار — صالون AI" },
      { name: "description", content: "ثلاث باقات مرنة تناسب صالونات التجميل. ابدأ من 99 ريال شهرياً." },
      { property: "og:title", content: "أسعار صالون AI" },
      { property: "og:description", content: "باقات أساسية واحترافية وأعمال." },
    ],
  }),
  component: Pricing,
});

const comparison = [
  { feature: "عدد الحجوزات الشهرية", basic: "200", pro: "غير محدود", business: "غير محدود" },
  { feature: "عدد الموظفين", basic: "3", pro: "15", business: "غير محدود" },
  { feature: "CRM ونقاط الولاء", basic: false, pro: true, business: true },
  { feature: "مساعد AI للعملاء", basic: false, pro: true, business: true },
  { feature: "بوابات دفع متعددة", basic: false, pro: true, business: true },
  { feature: "تقارير متقدمة", basic: false, pro: true, business: true },
  { feature: "فروع متعددة", basic: false, pro: false, business: true },
  { feature: "API مخصص", basic: false, pro: false, business: true },
  { feature: "علامة تجارية بيضاء", basic: false, pro: false, business: true },
  { feature: "مدير حساب مخصص", basic: false, pro: false, business: true },
];

function Pricing() {
  const [yearly, setYearly] = useState(false);
  return (
    <MarketingShell>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-3"><Sparkles className="ml-1 h-3 w-3" /> الأسعار</Badge>
          <h1 className="text-4xl font-black sm:text-5xl">أسعار عادلة لكل حجم صالون</h1>
          <p className="mt-3 text-muted-foreground">اختر الباقة المناسبة، وترقّى أو ألغِ في أي وقت.</p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border bg-card p-2 shadow-soft">
            <Label htmlFor="yearly" className={cn("px-3 text-sm cursor-pointer", !yearly && "font-bold")}>شهري</Label>
            <Switch id="yearly" checked={yearly} onCheckedChange={setYearly} />
            <Label htmlFor="yearly" className={cn("px-3 text-sm cursor-pointer flex items-center gap-1", yearly && "font-bold")}>
              سنوي <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">-17%</Badge>
            </Label>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <Card
              key={p.id}
              className={cn(
                "relative p-8",
                p.popular && "border-primary shadow-elegant scale-100 lg:scale-105"
              )}
            >
              {p.popular && (
                <Badge className="absolute -top-3 right-1/2 translate-x-1/2 bg-gradient-brand">الأكثر شعبية</Badge>
              )}
              <h3 className="text-2xl font-black">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-black">{yearly ? p.priceYearly : p.priceMonthly}</span>
                <span className="text-muted-foreground">ر.س / {yearly ? "سنة" : "شهر"}</span>
              </div>
              <Button asChild className={cn("mt-6 w-full", p.popular && "bg-gradient-brand")}>
                <Link to="/auth/register">ابدأ الآن</Link>
              </Button>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* comparison */}
        <div className="mt-16">
          <h2 className="text-2xl font-black text-center">مقارنة الباقات</h2>
          <div className="mt-6 overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-4 text-right">المزايا</th>
                  <th className="p-4">الأساسية</th>
                  <th className="p-4 bg-primary/5">الاحترافية</th>
                  <th className="p-4">الأعمال</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-4 font-medium text-right">{row.feature}</td>
                    {(["basic", "pro", "business"] as const).map((k) => {
                      const v = row[k];
                      return (
                        <td key={k} className={cn("p-4 text-center", k === "pro" && "bg-primary/5")}>
                          {typeof v === "boolean" ? (
                            v ? <Check className="mx-auto h-5 w-5 text-emerald-600" /> : <X className="mx-auto h-5 w-5 text-muted-foreground/40" />
                          ) : v}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
