import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  Banknote,
  CalendarClock,
  Mail,
  Phone,
  Plus,
  Search,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { employees, services } from "@/data/mock";
import type { Employee } from "@/types";

export const Route = createFileRoute("/merchant/employees")({
  head: () => ({ meta: [{ title: "الموظفون — صالون AI" }] }),
  component: EmployeesPage,
});

const avatarGradients = [
  "from-teal-600 to-cyan-500",
  "from-sky-700 to-blue-500",
  "from-amber-500 to-yellow-400",
  "from-emerald-600 to-teal-500",
  "from-violet-600 to-fuchsia-500",
];

const statusConfig: Record<Employee["status"], { label: string; className: string }> = {
  active: { label: "نشطة", className: "bg-success/15 text-success border-success/20" },
  "on-leave": { label: "في إجازة", className: "bg-warning/15 text-warning border-warning/20" },
  inactive: { label: "غير نشطة", className: "bg-muted text-muted-foreground" },
};

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((p) => p[0]).join("");
}

function EmployeesPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Employee["status"]>("all");
  const [selected, setSelected] = useState<Employee | null>(null);

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const matchesQuery =
        !query.trim() ||
        e.name.includes(query.trim()) ||
        e.role.includes(query.trim());
      const matchesStatus = statusFilter === "all" || e.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  const activeCount = employees.filter((e) => e.status === "active").length;
  const avgRating = (employees.reduce((sum, e) => sum + e.rating, 0) / employees.length).toFixed(1);
  const totalBookings = employees.reduce((sum, e) => sum + e.bookingsThisMonth, 0);
  const totalPayroll = employees.reduce(
    (sum, e) => sum + e.salary + Math.round(e.bookingsThisMonth * 15 * (e.commissionRate / 10)),
    0,
  );

  const topPerformer = [...employees].sort((a, b) => b.bookingsThisMonth - a.bookingsThisMonth)[0];
  const maxBookings = Math.max(...employees.map((e) => e.bookingsThisMonth), 1);

  return (
    <AppShell role="merchant">
      <PageHeader
        title="الموظفون"
        description="فريقك، مؤشرات أدائهم، وعمولاتهم في مكان واحد"
        actions={
          <Button className="bg-gradient-brand">
            <Plus className="ml-2 h-4 w-4" /> إضافة موظفة
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="موظفات حاضرات" value={`${activeCount}/${employees.length}`} icon={<Users className="h-5 w-5" />} accent="primary" />
        <KpiCard label="متوسط التقييم" value={`${avgRating} ⭐`} icon={<Star className="h-5 w-5" />} accent="warning" />
        <KpiCard label="حجوزات الشهر" value={totalBookings} icon={<CalendarClock className="h-5 w-5" />} trend={{ value: "+9%", up: true }} accent="success" />
        <KpiCard label="إجمالي الرواتب المتوقعة" value={`${totalPayroll.toLocaleString()} ر.س`} icon={<Banknote className="h-5 w-5" />} />
      </div>

      <Card className="mt-6 overflow-hidden border-0 bg-gradient-hero p-6 text-white shadow-elegant">
        <div className="flex flex-wrap items-center gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/15 text-2xl font-black backdrop-blur">
            {initials(topPerformer.name)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs font-bold text-white/80">
              <Award className="h-4 w-4" /> نجمة الشهر
            </div>
            <div className="mt-1 text-lg font-black">{topPerformer.name}</div>
            <div className="text-xs text-white/70">{topPerformer.role} • {topPerformer.bookingsThisMonth} حجز هذا الشهر</div>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-sm font-bold backdrop-blur">
            <TrendingUp className="h-4 w-4" /> أعلى إنتاجية
          </div>
        </div>
      </Card>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحثي بالاسم أو المسمى الوظيفي..."
            className="pr-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {([
            ["all", "الكل"],
            ["active", "نشطة"],
            ["on-leave", "في إجازة"],
            ["inactive", "غير نشطة"],
          ] as const).map(([value, label]) => (
            <Button
              key={value}
              size="sm"
              variant={statusFilter === value ? "default" : "outline"}
              onClick={() => setStatusFilter(value)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon={<Users className="h-6 w-6" />}
            title="لا يوجد موظفون مطابقون"
            description="جرّبي تعديل كلمة البحث أو الفلتر المختار."
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((employee, idx) => {
            const gradient = avatarGradients[idx % avatarGradients.length];
            const status = statusConfig[employee.status];
            const empServices = services.filter((s) => employee.services.includes(s.id));
            return (
              <Card
                key={employee.id}
                className="group flex flex-col overflow-hidden border-0 p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="flex items-start gap-3">
                  <Avatar className={`h-14 w-14 border-2 border-background bg-gradient-to-br ${gradient} shadow-soft`}>
                    <AvatarFallback className="bg-transparent text-base font-black text-white">
                      {initials(employee.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-black">{employee.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{employee.role}</div>
                    <Badge variant="outline" className={`mt-1.5 text-[10px] ${status.className}`}>
                      {status.label}
                    </Badge>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 font-bold text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-current" /> {employee.rating}
                  </span>
                  <span className="text-muted-foreground">عمولة {employee.commissionRate}%</span>
                </div>

                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>حجوزات الشهر</span>
                    <span className="font-bold text-foreground">{employee.bookingsThisMonth}</span>
                  </div>
                  <Progress value={(employee.bookingsThisMonth / maxBookings) * 100} className="h-1.5" />
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {empServices.slice(0, 3).map((s) => (
                    <Badge key={s.id} variant="secondary" className="text-[10px] font-normal">
                      {s.name}
                    </Badge>
                  ))}
                  {empServices.length > 3 && (
                    <Badge variant="secondary" className="text-[10px] font-normal">
                      +{empServices.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="mt-4 flex items-center gap-3 border-t pt-3 text-[11px] text-muted-foreground">
                  <span className="flex min-w-0 items-center gap-1">
                    <Phone className="h-3 w-3 shrink-0" />
                    <span className="truncate">{employee.phone}</span>
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full"
                  onClick={() => setSelected(employee)}
                >
                  عرض الملف الكامل
                </Button>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg" dir="rtl">
          {selected && (
            <>
              <div className="relative -mx-6 -mt-6 overflow-hidden rounded-t-lg bg-gradient-hero px-6 pb-6 pt-8 text-white">
                <div className="absolute -left-12 -top-16 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
                <div className="relative flex items-center gap-4">
                  <Avatar className="h-20 w-20 border-4 border-white/25 shadow-xl">
                    <AvatarFallback className="bg-white/15 text-2xl font-black text-white">
                      {initials(selected.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <DialogTitle className="text-xl font-black text-white">{selected.name}</DialogTitle>
                    <DialogDescription className="text-white/80">{selected.role}</DialogDescription>
                    <Badge variant="outline" className="mt-2 border-white/30 bg-white/15 text-[10px] text-white">
                      {statusConfig[selected.status].label}
                    </Badge>
                  </div>
                </div>
              </div>

              <DialogHeader className="sr-only">
                <DialogTitle>{selected.name}</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <StatBox label="التقييم" value={`${selected.rating} ⭐`} />
                <StatBox label="حجوزات الشهر" value={selected.bookingsThisMonth} />
                <StatBox label="العمولة" value={`${selected.commissionRate}%`} />
              </div>

              <div className="mt-4 space-y-2 rounded-xl border p-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" /> {selected.email}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" /> {selected.phone}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Banknote className="h-4 w-4" /> راتب أساسي {selected.salary.toLocaleString()} ر.س / شهرياً
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-2 text-sm font-bold">الخدمات التي تقدمها</div>
                <div className="flex flex-wrap gap-1.5">
                  {services.filter((s) => selected.services.includes(s.id)).map((s) => (
                    <Badge key={s.id} variant="secondary" className="font-normal">{s.name}</Badge>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <Button className="flex-1" variant="outline" onClick={() => setSelected(null)}>إغلاق</Button>
                <Button className="flex-1 bg-gradient-brand">تعديل الملف</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}

function StatBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-muted/60 p-3 text-center">
      <div className="text-lg font-black">{value}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}
