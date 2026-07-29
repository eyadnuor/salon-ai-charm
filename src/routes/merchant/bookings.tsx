import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Plus,
  Search,
  UserRound,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookings, customers, employees, services } from "@/data/mock";
import type { Booking, BookingStatus } from "@/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/merchant/bookings")({
  head: () => ({ meta: [{ title: "الحجوزات — صالون AI" }] }),
  component: BookingsPage,
});

const statusMap: Record<BookingStatus, { label: string; tone: string }> = {
  confirmed: { label: "مؤكد", tone: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  pending: { label: "بانتظار التأكيد", tone: "bg-amber-50 text-amber-700 border-amber-200" },
  completed: { label: "مكتمل", tone: "bg-sky-50 text-sky-700 border-sky-200" },
  cancelled: { label: "ملغي", tone: "bg-rose-50 text-rose-700 border-rose-200" },
};

function BookingsPage() {
  const [items, setItems] = useState(bookings);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const filtered = useMemo(
    () =>
      items.filter((booking) => {
        const matchesQuery = [booking.customerName, booking.serviceName, booking.employeeName]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());
        return matchesQuery && (status === "all" || booking.status === status);
      }),
    [items, query, status],
  );

  function updateStatus(id: string, nextStatus: BookingStatus) {
    setItems((current) =>
      current.map((booking) => (booking.id === id ? { ...booking, status: nextStatus } : booking)),
    );
    toast.success("تم تحديث حالة الحجز");
  }

  return (
    <AppShell role="merchant">
      <PageHeader
        title="الحجوزات"
        description="تحكم كامل في مواعيد العملاء وتوزيع الفريق وحالات الحجز."
        actions={
          <Button className="bg-gradient-brand">
            <Plus className="ml-2 h-4 w-4" /> حجز جديد
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="كل الحجوزات"
          value={items.length}
          icon={<CalendarDays className="h-5 w-5" />}
        />
        <KpiCard
          label="حجوزات مؤكدة"
          value={items.filter((item) => item.status === "confirmed").length}
          icon={<CalendarCheck className="h-5 w-5" />}
          accent="success"
        />
        <KpiCard
          label="بانتظار التأكيد"
          value={items.filter((item) => item.status === "pending").length}
          icon={<Clock3 className="h-5 w-5" />}
          accent="warning"
        />
        <KpiCard
          label="قيمة الحجوزات"
          value={`${items.reduce((sum, item) => sum + item.price, 0).toLocaleString()} ر.س`}
          icon={<CheckCircle2 className="h-5 w-5" />}
        />
      </div>
      <Card className="mt-6 overflow-hidden border-0 shadow-soft">
        <div className="flex flex-col gap-3 border-b p-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحث بالعميل، الخدمة أو الموظفة..."
              className="max-w-md pr-9"
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">كل الحالات</SelectItem>
              {Object.entries(statusMap).map(([value, item]) => (
                <SelectItem key={value} value={value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-3 p-4">
          {filtered.map((booking) => (
            <BookingRow key={booking.id} booking={booking} onStatus={updateStatus} />
          ))}
        </div>
      </Card>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <h3 className="font-black">الفريق المتاح</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {employees.map((employee) => (
              <Link
                key={employee.id}
                to="/merchant/employees"
                className="flex items-center justify-between rounded-xl border p-3 hover:bg-muted/40"
              >
                <div>
                  <div className="text-sm font-bold">{employee.name}</div>
                  <div className="text-xs text-muted-foreground">{employee.role}</div>
                </div>
                <Badge variant="secondary">{employee.bookingsThisMonth} حجز</Badge>
              </Link>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="font-black">ملخص البيانات</h3>
          <div className="mt-4 space-y-3">
            <Summary label="العملاء" value={customers.length} to="/merchant/customers" />
            <Summary label="الخدمات" value={services.length} to="/merchant/services" />
            <Summary label="الموظفات" value={employees.length} to="/merchant/employees" />
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function BookingRow({
  booking,
  onStatus,
}: {
  booking: Booking;
  onStatus: (id: string, status: BookingStatus) => void;
}) {
  const config = statusMap[booking.status];
  return (
    <div className="grid gap-4 rounded-2xl border bg-card p-4 transition hover:border-primary/20 hover:shadow-soft md:grid-cols-[90px_1.2fr_1fr_auto] md:items-center">
      <div className="rounded-xl bg-gradient-soft p-3 text-center">
        <div className="text-lg font-black">{booking.time}</div>
        <div className="text-[10px] text-muted-foreground">{booking.date}</div>
      </div>
      <div>
        <div className="flex items-center gap-2 font-black">
          <UserRound className="h-4 w-4 text-primary" />
          {booking.customerName}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          {booking.serviceName} · {booking.duration} دقيقة
        </div>
      </div>
      <div>
        <div className="text-xs text-muted-foreground">مع الموظفة</div>
        <Link to="/merchant/employees" className="mt-1 block text-sm font-bold hover:text-primary">
          {booking.employeeName}
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <div className="ml-3 text-left">
          <div className="font-black">{booking.price} ر.س</div>
          <Badge variant="outline" className={cn("mt-1", config.tone)}>
            {config.label}
          </Badge>
        </div>
        {booking.status === "pending" && (
          <Button
            size="icon"
            variant="outline"
            onClick={() => onStatus(booking.id, "confirmed")}
            className="text-emerald-600"
          >
            <CheckCircle2 className="h-4 w-4" />
          </Button>
        )}
        {!["completed", "cancelled"].includes(booking.status) && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onStatus(booking.id, "cancelled")}
            className="text-rose-500"
          >
            <XCircle className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

function Summary({ label, value, to }: { label: string; value: number; to: string }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between rounded-xl bg-muted/50 p-3 hover:bg-primary/5"
    >
      <span className="text-sm font-bold">{label}</span>
      <Badge>{value}</Badge>
    </Link>
  );
}
