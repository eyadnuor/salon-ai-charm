import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Store, TrendingUp, CreditCard, Users, DollarSign } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend } from "recharts";
import { tenants, revenueSeries, invoices } from "@/data/mock";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "لوحة مالك المنصة — صالون AI" }, { name: "description", content: "نظرة عامة على منصة صالون AI." }] }),
  component: () => (
    <AppShell role="admin">
      <PageHeader title="نظرة عامة على المنصة" description="مؤشرات الأداء الرئيسية للشهر الحالي" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="MRR (الإيراد الشهري)" value="82,500 ر.س" icon={<DollarSign className="h-5 w-5" />} trend={{ value: "+11.4%", up: true }} accent="success" />
        <KpiCard label="ARR (الإيراد السنوي)" value="990,000 ر.س" icon={<TrendingUp className="h-5 w-5" />} trend={{ value: "+18.2%", up: true }} />
        <KpiCard label="تجار نشطون" value={tenants.filter(t => t.status === "active").length} icon={<Store className="h-5 w-5" />} trend={{ value: "+3", up: true }} accent="primary" />
        <KpiCard label="معدل الإلغاء (Churn)" value="2.1%" icon={<Users className="h-5 w-5" />} trend={{ value: "-0.4%", up: true }} accent="warning" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold">الإيرادات ونمو التجار</h3>
            <Badge variant="secondary">آخر 7 أشهر</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={revenueSeries}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" name="الإيراد (ر.س)" stroke="var(--color-primary)" strokeWidth={3} />
                <Line type="monotone" dataKey="tenants" name="عدد التجار" stroke="var(--color-primary-glow)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-bold mb-4">أحدث الفواتير</h3>
          <div className="space-y-3">
            {invoices.slice(0, 5).map((inv) => (
              <div key={inv.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate">{inv.tenantName}</div>
                  <div className="text-xs text-muted-foreground">{inv.number}</div>
                </div>
                <div className="text-left shrink-0">
                  <div className="font-bold text-sm">{inv.amount} ر.س</div>
                  <Badge variant={inv.status === "paid" ? "default" : inv.status === "overdue" ? "destructive" : "secondary"} className="text-[10px]">
                    {inv.status === "paid" ? "مدفوعة" : inv.status === "overdue" ? "متأخرة" : "قيد الانتظار"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-bold mb-4">توزيع التجار حسب الخطة</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={[
                { plan: "أساسية", count: tenants.filter(t => t.plan === "basic").length },
                { plan: "احترافية", count: tenants.filter(t => t.plan === "pro").length },
                { plan: "أعمال", count: tenants.filter(t => t.plan === "business").length },
              ]}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="plan" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="var(--color-primary)" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-bold mb-4">أحدث التجار</h3>
          <div className="space-y-3">
            {tenants.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-brand text-primary-foreground font-bold text-sm shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm truncate">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.city} • {t.plan}</div>
                </div>
                <Badge variant={t.status === "active" ? "default" : t.status === "trial" ? "secondary" : "destructive"} className="shrink-0">
                  {t.status === "active" ? "نشط" : t.status === "trial" ? "تجريبي" : "معلّق"}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  ),
});
