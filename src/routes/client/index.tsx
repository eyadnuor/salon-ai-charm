import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, Gift, Calendar, Sparkles, ArrowLeft } from "lucide-react";
import { bookings, services } from "@/data/mock";
import { ClientAssistant } from "@/components/client/ClientAssistant";

export const Route = createFileRoute("/client/")({
  head: () => ({ meta: [{ title: "لوحتي — صالون AI" }, { name: "description", content: "حجوزاتك، محفظتك، ونقاطك." }] }),
  component: () => {
    const my = bookings.filter(b => b.customerName === "فاطمة الغامدي");
    return (
      <AppShell role="client">
        <PageHeader
          title="أهلاً فاطمة 💜"
          description="مواعيدك، رصيدك ومكافآتك في مكان واحد"
          actions={<Button asChild className="bg-gradient-brand"><Link to="/client/book">احجز موعداً <ArrowLeft className="mr-2 h-4 w-4" /></Link></Button>}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="رصيد المحفظة" value="150 ر.س" icon={<Wallet className="h-5 w-5" />} accent="success" />
          <KpiCard label="نقاط الولاء" value="480" icon={<Gift className="h-5 w-5" />} accent="warning" />
          <KpiCard label="حجوزاتي" value={my.length} icon={<Calendar className="h-5 w-5" />} />
          <KpiCard label="المستوى" value="ذهبي" icon={<Sparkles className="h-5 w-5" />} accent="primary" />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">حجوزاتي القادمة</h3>
              <Button asChild variant="ghost" size="sm"><Link to="/client/bookings">الكل</Link></Button>
            </div>
            <div className="space-y-2">
              {my.filter(b => b.status !== "completed" && b.status !== "cancelled").slice(0, 3).map((b) => (
                <div key={b.id} className="flex items-center gap-3 rounded-lg border p-3">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary text-xs font-bold shrink-0">
                    {b.time}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-sm truncate">{b.serviceName}</div>
                    <div className="text-xs text-muted-foreground">{b.date} • {b.employeeName}</div>
                  </div>
                  <Badge variant="default">{b.status === "confirmed" ? "مؤكد" : "بانتظار"}</Badge>
                </div>
              ))}
              {my.filter(b => b.status !== "completed" && b.status !== "cancelled").length === 0 && (
                <div className="text-center py-6 text-sm text-muted-foreground">لا توجد حجوزات قادمة</div>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold mb-4">خدمات مقترحة لك</h3>
            <div className="grid grid-cols-2 gap-3">
              {services.slice(0, 4).map((s) => (
                <Link
                  key={s.id}
                  to="/client/book"
                  className="rounded-xl border p-3 hover:border-primary hover:shadow-soft transition-all"
                >
                  <div className="text-sm font-bold truncate">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.duration} دقيقة</div>
                  <div className="mt-1 text-primary font-black">{s.price} ر.س</div>
                </Link>
              ))}
            </div>
          </Card>
        </div>
        <ClientAssistant />
      </AppShell>
    );
  },
});
