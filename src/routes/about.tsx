import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Card } from "@/components/ui/card";
import { Sparkles, Target, Heart, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن — صالون AI" },
      { name: "description", content: "قصة صالون AI ورسالتنا لتمكين صالونات التجميل بأدوات ذكية." },
      { property: "og:title", content: "من نحن — صالون AI" },
      { property: "og:description", content: "نمكّن صالونات التجميل بأدوات إدارة ذكية." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl font-black">من نحن</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          «صالون AI» منصة سعودية بُنيت لتمكين أصحاب صالونات التجميل والكوافير من إدارة أعمالهم باحترافية عبر أدوات ذكية وواجهة عربية أنيقة. نؤمن أن كل صالون يستحق تجربة رقمية بمستوى الفنادق الفاخرة.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {[
            { i: Target, t: "رسالتنا", d: "تبسيط إدارة الصالونات وزيادة أرباحها عبر الأتمتة والذكاء الاصطناعي." },
            { i: Heart, t: "قيمنا", d: "الشفافية، الجودة، الاهتمام بأدق التفاصيل، ودعم يتحدث لغتك." },
            { i: Users, t: "فريقنا", d: "مصممون ومطورون ومختصو تجميل عملوا في القطاع لسنوات." },
            { i: Sparkles, t: "رؤيتنا", d: "أن نكون الخيار الأول لكل صالون في المنطقة العربية." },
          ].map(({ i: Icon, t, d }) => (
            <Card key={t} className="p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-4 font-bold text-lg">{t}</div>
              <div className="mt-1 text-sm text-muted-foreground">{d}</div>
            </Card>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
