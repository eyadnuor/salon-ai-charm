import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, Users, UserCheck, AlertTriangle, ArrowLeft } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { bookings, bookingsSeries, topServices, inventory, employees } from "@/data/mock";
import { Link } from "@tanstack/react-router";

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];

export const Route = createFileRoute("/merchant/")({
  head: () => ({ meta: [{ title: "لوحة التاجر — صالون AI" }, { name: "description", content: "ملخص أعمال صالونك اليوم." }] }),
  component: () => {
    const today = new Date().toISOString().slice(0, 10);
    const todayBookings = bookings.filter(b => b.date === today);
    const todayRevenue = todayBookings.reduce((sum, b) => sum + b.price, 0);
    const lowStock = inventory.filter(i => i.quantity < i.minQuantity);
    return (
      <AppShell role="merchant">
        <PageHeader
          title="مرحباً بك، سارة 👋"
          description="إليكِ ملخص يوم عملك في صالون لمسة أنثى"
          actions={<Button asChild className="bg-gradient-brand"><Link to="/merchant/bookings">إدارة الحجوزات <ArrowLeft className="mr-2 h-4 w-4" /></Link></Button>}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="حجوزات اليوم" value={todayBookings.length} icon={<Calendar className="h-5 w-5" />} trend={{ value: "+12%", up: true }} />
          <KpiCard label="إيراد اليوم" value={`${todayRevenue.toLocaleString()} ر.س`} icon={<DollarSign className="h-5 w-5" />} trend={{ value: "+8%", up: true }} accent="success" />
          <KpiCard label="عملاء جدد (7 أيام)" value={9} icon={<Users className="h-5 w-5" />} trend={{ value: "+3", up: true }} />
          <KpiCard label="موظفون حاضرون" value={`${employees.filter(e => e.status === "active").length}/${employees.length}`} icon={<UserCheck className="h-5 w-5" />} accent="primary" />
        </div>

        {lowStock.length > 0 && (
          <Card className="mt-4 p-4 border-warning bg-warning/5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="font-bold">تنبيه مخزون منخفض</div>
                <div className="text-sm text-muted-foreground">{lowStock.length} منتجات وصلت للحد الأدنى: {lowStock.map(i => i.name).join("، ")}</div>
              </div>
              <Button asChild variant="outline" size="sm"><Link to="/merchant/inventory">عرض</Link></Button>
            </div>
          </Card>
        )}

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2">
            <h3 className="font-bold mb-4">حجوزات الأسبوع</h3>
            <div className="h-64">
              <ResponsiveContainer>
                <BarChart data={bookingsSeries}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" name="عدد الحجوزات" fill="var(--color-primary)" radius={[8,8,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-bold mb-4">الخدمات الأكثر طلباً</h3>
            <div className="h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={topServices} dataKey="value" nameKey="name" innerRadius={40} outerRadius={80}>
                    {topServices.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card className="mt-6 p-6">
          <h3 className="font-bold mb-4">حجوزات اليوم</h3>
          {todayBookings.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground py-8">لا توجد حجوزات لليوم</div>
          ) : (
            <div className="space-y-2">
              {todayBookings.map((b) => (
                <div key={b.id} className="flex flex-wrap items-center gap-3 rounded-lg border p-3">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary font-bold shrink-0">{b.time}</div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-sm truncate">{b.customerName}</div>
                    <div className="text-xs text-muted-foreground truncate">{b.serviceName} • {b.employeeName}</div>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm">{b.price} ر.س</div>
                    <Badge variant={b.status === "confirmed" ? "default" : "secondary"} className="text-[10px]">
                      {b.status === "confirmed" ? "مؤكد" : "بانتظار"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </AppShell>
    );
  },
});
