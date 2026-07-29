import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Calendar, DollarSign, Users, UserCheck, AlertTriangle, ArrowLeft,
  Star, Package, Scissors, UserSquare2, Sparkles, Clock3,
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { bookings, bookingsSeries, topServices, inventory, employees } from "@/data/mock";

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];

const quickLinks = [
  { title: "الحجوزات", url: "/merchant/bookings", icon: Calendar },
  { title: "العملاء", url: "/merchant/customers", icon: UserSquare2 },
  { title: "الموظفون", url: "/merchant/employees", icon: Users },
  { title: "الخدمات", url: "/merchant/services", icon: Scissors },
];

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((p) => p[0]).join("");
}

export const Route = createFileRoute("/merchant/")({
  head: () => ({ meta: [{ title: "لوحة التاجر — صالون AI" }, { name: "description", content: "ملخص أعمال صالونك اليوم." }] }),
  component: () => {
    const today = new Date().toISOString().slice(0, 10);
    const todayBookings = bookings.filter(b => b.date === today);
    const todayRevenue = todayBookings.reduce((sum, b) => sum + b.price, 0);
    const lowStock = inventory.filter(i => i.quantity < i.minQuantity);
    const activeEmployees = employees.filter(e => e.status === "active");
    const topEmployees = [...employees].sort((a, b) => b.bookingsThisMonth - a.bookingsThisMonth).slice(0, 4);
    const maxEmpBookings = Math.max(...employees.map(e => e.bookingsThisMonth), 1);
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "صباح الخير" : hour < 17 ? "مساء الخير" : "مساء النور";

    return (
      <AppShell role="merchant">
        {/* Hero welcome banner */}
        <Card className="relative mb-6 overflow-hidden border-0 bg-gradient-hero p-6 text-white shadow-elegant sm:p-8">
          <div className="absolute -left-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 right-1/3 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="relative flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-white/70">
                <Sparkles className="h-4 w-4" /> {greeting}، سارة
              </div>
              <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                إليكِ ملخص صالون لمسة أنثى اليوم
              </h1>
              <p className="mt-2 max-w-md text-sm text-white/75">
                {todayBookings.length} حجز مجدول اليوم بإيراد متوقع {todayRevenue.toLocaleString()} ر.س — استمري بالأداء الرائع!
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild className="bg-white text-primary hover:bg-white/90">
                  <Link to="/merchant/bookings">إدارة الحجوزات <ArrowLeft className="mr-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                  <Link to="/merchant/services">إضافة خدمة</Link>
                </Button>
              </div>
            </div>
            <div className="hidden shrink-0 grid-cols-2 gap-3 sm:grid">
              <MiniStat icon={<UserCheck className="h-4 w-4" />} label="موظفات حاضرات" value={`${activeEmployees.length}/${employees.length}`} />
              <MiniStat icon={<Clock3 className="h-4 w-4" />} label="آخر حجز" value={todayBookings.at(-1)?.time ?? "—"} />
            </div>
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="حجوزات اليوم" value={todayBookings.length} icon={<Calendar className="h-5 w-5" />} trend={{ value: "+12%", up: true }} />
          <KpiCard label="إيراد اليوم" value={`${todayRevenue.toLocaleString()} ر.س`} icon={<DollarSign className="h-5 w-5" />} trend={{ value: "+8%", up: true }} accent="success" />
          <KpiCard label="عملاء جدد (7 أيام)" value={9} icon={<Users className="h-5 w-5" />} trend={{ value: "+3", up: true }} />
          <KpiCard label="موظفون حاضرون" value={`${activeEmployees.length}/${employees.length}`} icon={<UserCheck className="h-5 w-5" />} accent="primary" />
        </div>

        {lowStock.length > 0 && (
          <Card className="mt-4 border-warning/30 bg-warning/5 p-4">
            <div className="flex items-start gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-warning/15 text-warning">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold">تنبيه مخزون منخفض</div>
                <div className="text-sm text-muted-foreground">{lowStock.length} منتجات وصلت للحد الأدنى: {lowStock.map(i => i.name).join("، ")}</div>
              </div>
              <Button asChild variant="outline" size="sm"><Link to="/merchant/inventory">عرض <Package className="mr-1.5 h-3.5 w-3.5" /></Link></Button>
            </div>
          </Card>
        )}

        {/* Quick links */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickLinks.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              className="group flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elegant"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-brand text-primary-foreground transition group-hover:scale-105">
                <item.icon className="h-5 w-5" />
              </div>
              <span className="truncate text-sm font-bold">{item.title}</span>
            </Link>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold">حجوزات الأسبوع</h3>
              <Badge variant="secondary">آخر 7 أيام</Badge>
            </div>
            <div className="h-64">
              <ResponsiveContainer>
                <AreaChart data={bookingsSeries}>
                  <defs>
                    <linearGradient id="bookingsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.25} vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="bookings" name="عدد الحجوزات" stroke="var(--color-primary)" strokeWidth={3} fill="url(#bookingsFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="mb-4 font-bold">الخدمات الأكثر طلباً</h3>
            <div className="h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={topServices} dataKey="value" nameKey="name" innerRadius={40} outerRadius={80} paddingAngle={2}>
                    {topServices.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold">حجوزات اليوم</h3>
              <Button asChild variant="ghost" size="sm"><Link to="/merchant/bookings">عرض الكل</Link></Button>
            </div>
            {todayBookings.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">لا توجد حجوزات لليوم</div>
            ) : (
              <div className="space-y-2">
                {todayBookings.map((b) => (
                  <div key={b.id} className="flex flex-wrap items-center gap-3 rounded-xl border p-3 transition hover:border-primary/30 hover:bg-muted/40">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-primary/10 font-bold text-primary">{b.time}</div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold">{b.customerName}</div>
                      <div className="truncate text-xs text-muted-foreground">{b.serviceName} • {b.employeeName}</div>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold">{b.price} ر.س</div>
                      <Badge variant={b.status === "confirmed" ? "default" : "secondary"} className="text-[10px]">
                        {b.status === "confirmed" ? "مؤكد" : "بانتظار"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold">أفضل الموظفات أداءً</h3>
              <Button asChild variant="ghost" size="sm"><Link to="/merchant/employees">الكل</Link></Button>
            </div>
            <div className="space-y-4">
              {topEmployees.map((e, idx) => (
                <div key={e.id} className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 shrink-0 border-2 border-background shadow-soft">
                    <AvatarFallback className="bg-gradient-brand text-xs font-bold text-primary-foreground">
                      {initials(e.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-bold">{e.name}</span>
                      <span className="flex shrink-0 items-center gap-0.5 text-[11px] font-bold text-amber-500">
                        <Star className="h-3 w-3 fill-current" /> {e.rating}
                      </span>
                    </div>
                    <Progress value={(e.bookingsThisMonth / maxEmpBookings) * 100} className="mt-1.5 h-1.5" />
                  </div>
                  <span className="shrink-0 text-[11px] text-muted-foreground">#{idx + 1}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </AppShell>
    );
  },
});

function MiniStat({ icon, label, value }: { icon: ReactNode; label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-1.5 text-[11px] text-white/70">{icon} {label}</div>
      <div className="mt-1 text-lg font-black">{value}</div>
    </div>
  );
}
