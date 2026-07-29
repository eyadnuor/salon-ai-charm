import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا — صالون AI" },
      { name: "description", content: "تواصل مع فريق صالون AI للاستفسار أو الحصول على عرض توضيحي." },
      { property: "og:title", content: "تواصل معنا — صالون AI" },
      { property: "og:description", content: "نحن هنا للإجابة على استفساراتك." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-black">تواصل معنا</h1>
          <p className="mt-2 text-muted-foreground">فريقنا جاهز للرد خلال ساعات العمل.</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <Card className="p-8">
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("تم استلام رسالتك، سنعاود التواصل خلال 24 ساعة");
              }}
            >
              <div className="grid gap-2">
                <Label>الاسم الكامل</Label>
                <Input required placeholder="اسمك" />
              </div>
              <div className="grid gap-2">
                <Label>البريد الإلكتروني</Label>
                <Input required type="email" placeholder="you@example.com" />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label>الموضوع</Label>
                <Input required placeholder="كيف نساعدك؟" />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label>الرسالة</Label>
                <Textarea required rows={5} placeholder="اكتب رسالتك هنا..." />
              </div>
              <Button type="submit" className="sm:col-span-2 bg-gradient-brand">إرسال الرسالة</Button>
            </form>
          </Card>
          <div className="space-y-4">
            {[
              { i: Mail, t: "البريد", d: "hello@salon-ai.sa" },
              { i: Phone, t: "الهاتف", d: "+966 92 000 1234" },
              { i: MapPin, t: "المكتب", d: "الرياض، حي الملقا، طريق الملك فهد" },
            ].map(({ i: Icon, t, d }) => (
              <Card key={t} className="p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-brand text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{t}</div>
                    <div className="font-bold text-sm">{d}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
