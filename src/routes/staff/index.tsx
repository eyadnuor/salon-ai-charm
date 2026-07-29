import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Star, Coins, LogIn } from "lucide-react";
import { bookings } from "@/data/mock";
import { toast } from "sonner";

export const Route = createFileRoute("/staff/")({
  head: () => ({ meta: [{ title: "لوحة الموظف — صالون AI" }, { name: "description", content: "ملخص يومك ومهامك." }] }),
  component: () => {
    const today = new Date().toISOString().slice(0, 10);
    const my = bookings.filter(b => b.employeeName === "أمل السلمي");
    const todayMy = my.filter(b => b.date === today);
    return (
      <AppShell role="staff">
        <PageHeader
          title="صباح الخير، أمل ☀️"
          description="إليك ملخص يومك في صالون لمسة أنثى"
          actions={
            <Button onClick={() => toast.success("تم تسجيل حضورك — 09:02")}>
              <LogIn className="ml-2 h-4 w-4" /> تسجيل حضور
            </Button>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="حجوزاتي اليوم" value={todayMy.length} icon={<Calendar className="h-5 w-5" />} />
          <KpiCard label="ساعات العمل" value="7.5" icon={<Clock className="h-5 w-5" />} accent="primary" />
          <KpiCard label="تقييمي" value="4.9 ⭐" icon={<Star className="h-5 w-5" />} accent="warning" />
          <KpiCard label="عمولاتي هذا الشهر" value="1,305 ر.س" icon={<Coins className="h-5 w-5" />} trend={{ value: "+15%", up: true }} accent="success" />
        </div>

        <Card className="mt-6 p-6">
          <h3 className="font-bold mb-4">مواعيدي القادمة</h3>
          <div className="space-y-2">
            {my.slice(0, 6).map((b) => (
              <div key={b.id} className="flex flex-wrap items-center gap-3 rounded-lg border p-3">
                <div className="grid h-12 w-16 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <div className="text-[10px]">{b.date.slice(5)}</div>
                  <div className="font-bold">{b.time}</div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-sm truncate">{b.customerName}</div>
                  <div className="text-xs text-muted-foreground">{b.serviceName} • {b.duration} د</div>
                </div>
                <Badge variant={b.status === "completed" ? "secondary" : b.status === "confirmed" ? "default" : "outline"}>
                  {b.status === "confirmed" ? "مؤكد" : b.status === "completed" ? "منجز" : b.status === "cancelled" ? "ملغى" : "بانتظار"}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </AppShell>
    );
  },
});
