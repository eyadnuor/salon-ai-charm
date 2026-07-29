import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgePercent,
  BellRing,
  Boxes,
  CircleDollarSign,
  Clock4,
  CreditCard,
  Gift,
  HandCoins,
  Package,
  Plus,
  Receipt,
  Settings2,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { attendance, coupons, expenses, inventory, invoices, payroll } from "@/data/mock";

export const Route = createFileRoute("/merchant/$")({
  component: MerchantSection,
});

const sections = {
  inventory: {
    title: "المخزون",
    description: "راقبي الكميات والموردين وتنبيهات إعادة الطلب.",
    icon: Package,
    action: "إضافة منتج",
    metrics: [
      ["إجمالي المنتجات", inventory.length],
      ["منخفض المخزون", inventory.filter((i) => i.quantity < i.minQuantity).length],
      [
        "قيمة المخزون",
        `${inventory.reduce((s, i) => s + i.quantity * i.price, 0).toLocaleString()} ر.س`,
      ],
    ],
  },
  wallets: {
    title: "المحافظ",
    description: "إدارة أرصدة العملاء وحركات الشحن والاسترداد.",
    icon: Wallet,
    action: "عملية جديدة",
    metrics: [
      ["الأرصدة النشطة", 6],
      ["إجمالي الأرصدة", "615 ر.س"],
      ["حركات الشهر", 28],
    ],
  },
  coupons: {
    title: "الكوبونات",
    description: "العروض والخصومات وحدود الاستخدام والصلاحية.",
    icon: BadgePercent,
    action: "كوبون جديد",
    metrics: [
      ["الكوبونات", coupons.length],
      ["النشطة", coupons.filter((c) => c.active).length],
      ["مرات الاستخدام", coupons.reduce((s, c) => s + c.usedCount, 0)],
    ],
  },
  loyalty: {
    title: "برنامج الولاء",
    description: "حوّلي الزيارات إلى علاقة طويلة الأمد مع عملائك.",
    icon: Gift,
    action: "إعداد مكافأة",
    metrics: [
      ["الأعضاء", 124],
      ["النقاط المصدرة", "12,850"],
      ["المكافآت المستبدلة", 38],
    ],
  },
  accounting: {
    title: "الحسابات",
    description: "الإيرادات والمصروفات وصافي الربح في شاشة مالية واضحة.",
    icon: Receipt,
    action: "إضافة مصروف",
    metrics: [
      ["الإيرادات", "48,620 ر.س"],
      ["المصروفات", `${expenses.reduce((s, x) => s + x.amount, 0).toLocaleString()} ر.س`],
      ["صافي الربح", "32,870 ر.س"],
    ],
  },
  payroll: {
    title: "الرواتب",
    description: "مسيرات الرواتب والعمولات والمكافآت والخصومات.",
    icon: HandCoins,
    action: "إنشاء مسير",
    metrics: [
      ["إجمالي المسير", `${payroll.reduce((s, p) => s + p.net, 0).toLocaleString()} ر.س`],
      ["تم الدفع", payroll.filter((p) => p.status === "paid").length],
      ["قيد الانتظار", payroll.filter((p) => p.status === "pending").length],
    ],
  },
  attendance: {
    title: "الحضور والانصراف",
    description: "متابعة الحضور والتأخير وساعات العمل اليومية.",
    icon: Clock4,
    action: "تسجيل حضور",
    metrics: [
      ["الحاضرون", attendance.filter((a) => a.status === "present").length],
      ["المتأخرون", attendance.filter((a) => a.status === "late").length],
      ["إجمالي الساعات", attendance.reduce((s, a) => s + a.hours, 0).toFixed(1)],
    ],
  },
  payments: {
    title: "المدفوعات الإلكترونية",
    description: "إدارة بوابات الدفع والمعاملات وحالة الربط.",
    icon: CreditCard,
    action: "ربط بوابة",
    metrics: [
      ["المعاملات الناجحة", 92],
      ["قيمة المعاملات", "27,450 ر.س"],
      ["نسبة النجاح", "98.4%"],
    ],
  },
  subscription: {
    title: "اشتراكي وفواتيري",
    description: "تفاصيل الخطة الحالية والفواتير والاستخدام.",
    icon: CircleDollarSign,
    action: "ترقية الخطة",
    metrics: [
      ["الخطة", "الاحترافية"],
      ["التجديد القادم", "15 أغسطس"],
      ["قيمة الاشتراك", "249 ر.س"],
    ],
  },
  settings: {
    title: "إعدادات المتجر",
    description: "هوية المتجر وساعات العمل والحجز والإشعارات.",
    icon: Settings2,
    action: "حفظ التغييرات",
    metrics: [
      ["اكتمال الملف", "86%"],
      ["ساعات العمل", "10 ساعات"],
      ["قنوات الإشعار", 3],
    ],
  },
  "danger-zone": {
    title: "إعادة ضبط المصنع",
    description: "منطقة محمية للإجراءات الحساسة وإدارة بيانات المتجر.",
    icon: ShieldCheck,
    action: "مراجعة الأمان",
    metrics: [
      ["النسخ الاحتياطية", 7],
      ["آخر نسخة", "اليوم"],
      ["حالة الحماية", "مفعلة"],
    ],
  },
} as const;

function MerchantSection() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const key = path.split("/").filter(Boolean).at(-1) as keyof typeof sections;
  const section = sections[key] ?? sections.settings;
  const Icon = section.icon;
  return (
    <AppShell role="merchant">
      <PageHeader
        title={section.title}
        description={section.description}
        actions={
          <Button className="bg-gradient-brand">
            <Plus className="ml-2 h-4 w-4" />
            {section.action}
          </Button>
        }
      />
      <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-6 text-white shadow-elegant md:p-8">
        <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15">
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <div className="text-sm text-white/65">مركز إدارة</div>
              <h2 className="mt-1 text-2xl font-black">{section.title}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs">
            <BellRing className="h-4 w-4 text-amber-300" /> البيانات محدثة الآن
          </div>
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {section.metrics.map(([label, value], index) => (
          <Card key={label} className="border-0 p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">{label}</div>
              <div
                className={`grid h-9 w-9 place-items-center rounded-xl ${index === 1 ? "bg-amber-100 text-amber-700" : "bg-primary/10 text-primary"}`}
              >
                {index === 0 ? (
                  <Boxes className="h-4 w-4" />
                ) : index === 1 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <CircleDollarSign className="h-4 w-4" />
                )}
              </div>
            </div>
            <div className="mt-3 text-2xl font-black">{value}</div>
          </Card>
        ))}
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Card className="border-0 p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black">نظرة تشغيلية</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                أحدث البيانات والعمليات في هذا القسم
              </p>
            </div>
            <Badge variant="secondary">هذا الشهر</Badge>
          </div>
          <div className="mt-5 space-y-3">
            {section.metrics.map(([label, value], index) => (
              <div key={label} className="rounded-2xl border p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold">{label}</span>
                  <span className="font-black">{value}</span>
                </div>
                <Progress className="mt-3 h-1.5" value={[78, 55, 88][index]} />
              </div>
            ))}
          </div>
        </Card>
        <Card className="border-0 p-5 shadow-soft">
          <h3 className="font-black">روابط سريعة</h3>
          <div className="mt-4 space-y-2">
            <QuickLink label="إدارة العملاء" to="/merchant/customers" />
            <QuickLink label="إدارة الموظفين" to="/merchant/employees" />
            <QuickLink label="الحجوزات" to="/merchant/bookings" />
            <QuickLink label="الخدمات" to="/merchant/services" />
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function QuickLink({ label, to }: { label: string; to: string }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between rounded-xl bg-muted/50 p-3 text-sm font-bold hover:bg-primary/5 hover:text-primary"
    >
      <span>{label}</span>
      <ArrowLeft className="h-4 w-4" />
    </Link>
  );
}
