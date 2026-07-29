import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Calendar, Users, BarChart3, Bot, Wallet, Gift, Shield, Zap, CheckCircle2, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import heroImage from "@/assets/hero-salon.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "صالون AI — منصة إدارة الصالونات ومراكز التجميل بالذكاء الاصطناعي" },
      { name: "description", content: "أدر صالونك بذكاء: حجوزات فورية، CRM كامل، محفظة ونقاط ولاء، مدفوعات، ومساعد AI عربي — جرّب مجاناً." },
      { property: "og:title", content: "صالون AI — منصة إدارة الصالونات ومراكز التجميل بالذكاء الاصطناعي" },
      { property: "og:description", content: "أدر صالونك بذكاء: حجوزات فورية، CRM كامل، محفظة ونقاط ولاء، مدفوعات، ومساعد AI عربي — جرّب مجاناً." },
    ],
  }),
  component: Home,
});

const features = [
  { icon: Calendar, title: "حجوزات ذكية", desc: "تقويم متكامل مع تعيين تلقائي للموظفين وتنبيهات فورية." },
  { icon: Bot, title: "مساعد AI عربي", desc: "يجيب عملاءك ويحجز لهم ويقترح مواعيد على مدار الساعة." },
  { icon: Users, title: "CRM متكامل", desc: "ملفات عملاء، ملاحظات، سجل زيارات، وتصنيفات ولاء." },
  { icon: Wallet, title: "محافظ ومدفوعات", desc: "شحن رصيد، استرداد، وربط بوابات دفع محلية وعالمية." },
  { icon: Gift, title: "برنامج ولاء", desc: "نقاط، مستويات، مكافآت، وكوبونات قابلة للتخصيص." },
  { icon: BarChart3, title: "تقارير احترافية", desc: "إيرادات، أرباح، أداء الموظفين، والخدمات الأكثر طلباً." },
];

const steps = [
  { n: "01", t: "أنشئ متجرك", d: "سجّل، خصّص شعارك وألوانك، وأضف خدماتك خلال دقائق." },
  { n: "02", t: "استقبل الحجوزات", d: "شارك رابط متجرك أو ثبّت زر الحجز على موقعك." },
  { n: "03", t: "نمّ أعمالك", d: "استخدم التقارير ومساعد AI لتحسين الأداء والاحتفاظ بالعملاء." },
];

const testimonials = [
  { name: "سارة الأحمدي", role: "مالكة صالون لمسة أنثى", text: "خفّضت المكالمات 70% وزادت حجوزاتي 3 أضعاف خلال شهرين." },
  { name: "خالد الفهد", role: "كوافير النخبة - جدة", text: "أفضل نظام جربته. الرواتب والعمولات والمخزون كل شيء في مكان واحد." },
  { name: "منى العتيبي", role: "مركز رونق", text: "المساعد الذكي يرد على العميلات حتى بعد الدوام. تجربة راقية." },
];

const faqs = [
  { q: "هل يوجد فترة تجريبية مجانية؟", a: "نعم، 14 يوماً مجانية بكل المزايا ودون أي بطاقة ائتمان." },
  { q: "هل يدعم النظام اللغة العربية بالكامل؟", a: "بالتأكيد، الواجهة والتقارير والمساعد الذكي كلها بالعربية RTL." },
  { q: "هل يمكن للعملاء الحجز من الجوال؟", a: "نعم، لكل متجر رابط ومتجر مخصص responsive بالكامل." },
  { q: "ما بوابات الدفع المدعومة؟", a: "Stripe، PayPal، ومدى وتمارا محلياً." },
  { q: "هل بياناتي آمنة؟", a: "نستخدم تشفير TLS وعزل بيانات متعدد المستأجرين ونسخ احتياطي يومي." },
];

function Home() {
  return (
    <MarketingShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)] opacity-10" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24 lg:items-center">
          <div className="text-primary-foreground">
            <Badge className="mb-4 bg-white/15 text-white hover:bg-white/20 border-white/20">
              <Sparkles className="ml-1 h-3 w-3" /> مدعوم بالذكاء الاصطناعي
            </Badge>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              أدر صالونك بذكاء
              <br />
              <span className="bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                واربح وقتك وعملاءك
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              منصة عربية متكاملة لصالونات التجميل والكوافير: حجوزات ذكية، CRM، مدفوعات، ومساعد ذكاء اصطناعي يرد على عملائك 24/7.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-elegant">
                <Link to="/auth/register">ابدأ تجربة مجانية <ArrowLeft className="mr-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
                <Link to="/pricing">شاهد الأسعار</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> بدون بطاقة ائتمان</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> إعداد في 5 دقائق</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> دعم عربي</div>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="صالون تجميل عصري"
              className="rounded-3xl shadow-elegant border-4 border-white/20"
            />
            <div className="absolute -bottom-6 -right-6 rounded-2xl bg-white p-4 shadow-elegant hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-100 text-emerald-600"><CheckCircle2 className="h-5 w-5" /></div>
                <div>
                  <div className="font-bold text-sm">+52 حجزاً اليوم</div>
                  <div className="text-xs text-muted-foreground">صالون لمسة أنثى</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-3">مزايا المنصة</Badge>
          <h2 className="text-3xl font-black sm:text-4xl">كل ما يحتاجه صالونك في مكان واحد</h2>
          <p className="mt-3 text-muted-foreground">مصممة خصيصاً لصالونات التجميل ومراكز الكوافير في السعودية والخليج.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="p-6 transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-primary-foreground shadow-soft">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-bold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gradient-soft py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-3">كيف تعمل</Badge>
            <h2 className="text-3xl font-black sm:text-4xl">3 خطوات لإطلاق صالونك الرقمي</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <Card key={s.n} className="relative p-6">
                <div className="text-5xl font-black bg-gradient-brand bg-clip-text text-transparent">{s.n}</div>
                <h3 className="mt-3 text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-3">آراء عملائنا</Badge>
          <h2 className="text-3xl font-black sm:text-4xl">صالونات تنمو معنا كل يوم</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="p-6">
              <div className="flex gap-1 text-amber-500">
                {[1,2,3,4,5].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-3 text-sm leading-relaxed">«{t.text}»</p>
              <div className="mt-4 border-t pt-4">
                <div className="font-bold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <Badge variant="secondary" className="mb-3">أسئلة شائعة</Badge>
          <h2 className="text-3xl font-black sm:text-4xl">إجابات على أهم استفساراتك</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`i-${i}`}>
              <AccordionTrigger className="text-right font-bold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <Card className="relative overflow-hidden bg-gradient-hero p-10 text-primary-foreground shadow-elegant sm:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,white,transparent_50%)] opacity-10" />
          <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-3xl font-black sm:text-4xl">جاهز تنقل صالونك للمستوى التالي؟</h2>
              <p className="mt-3 text-white/80">ابدأ 14 يوماً مجاناً، بدون التزام.</p>
            </div>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/auth/register">ابدأ الآن مجاناً</Link>
            </Button>
          </div>
        </Card>
      </section>
    </MarketingShell>
  );
}
