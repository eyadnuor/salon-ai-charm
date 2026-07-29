import { useMemo, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarDays,
  Crown,
  Mail,
  Phone,
  Plus,
  Search,
  Sparkles,
  UserRoundCheck,
  Users,
  Wallet,
} from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { customers, bookings } from "@/data/mock";
import type { Customer } from "@/types";

export const Route = createFileRoute("/merchant/customers")({
  head: () => ({ meta: [{ title: "العملاء — صالون AI" }] }),
  component: CustomersPage,
});

const tierTone: Record<Customer["tier"], string> = {
  برونزي: "border-orange-200 bg-orange-50 text-orange-700",
  فضي: "border-slate-200 bg-slate-50 text-slate-600",
  ذهبي: "border-amber-200 bg-amber-50 text-amber-700",
  بلاتيني: "border-cyan-200 bg-cyan-50 text-cyan-700",
};

function CustomersPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Customer | null>(null);
  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    return customers.filter((customer) =>
      [customer.name, customer.phone, customer.email ?? ""].some((field) =>
        field.toLowerCase().includes(value),
      ),
    );
  }, [query]);

  const totalSpent = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const totalWallets = customers.reduce((sum, customer) => sum + customer.walletBalance, 0);

  return (
    <AppShell role="merchant">
      <PageHeader
        title="العملاء"
        description="ملفات العملاء وسجل الزيارات والإنفاق والولاء في شاشة واحدة."
        actions={
          <Button className="bg-gradient-brand">
            <Plus className="ml-2 h-4 w-4" /> عميل جديد
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="إجمالي العملاء"
          value={customers.length}
          icon={<Users className="h-5 w-5" />}
        />
        <KpiCard
          label="عملاء نشطون"
          value={5}
          icon={<UserRoundCheck className="h-5 w-5" />}
          accent="success"
        />
        <KpiCard
          label="إجمالي إنفاق العملاء"
          value={`${totalSpent.toLocaleString()} ر.س`}
          icon={<Sparkles className="h-5 w-5" />}
        />
        <KpiCard
          label="أرصدة المحافظ"
          value={`${totalWallets.toLocaleString()} ر.س`}
          icon={<Wallet className="h-5 w-5" />}
          accent="warning"
        />
      </div>

      <Card className="mt-6 overflow-hidden border-0 shadow-soft">
        <div className="flex flex-col gap-3 border-b bg-card/80 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحث بالاسم، الجوال أو البريد..."
              className="max-w-md bg-background pr-9"
            />
          </div>
          <Badge variant="secondary">{filtered.length} عميل</Badge>
        </div>
        <div className="divide-y">
          {filtered.map((customer, index) => (
            <button
              key={customer.id}
              onClick={() => setSelected(customer)}
              className="grid w-full gap-4 p-4 text-right transition hover:bg-muted/45 md:grid-cols-[minmax(220px,1.4fr)_repeat(4,minmax(90px,.6fr))] md:items-center"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11 ring-4 ring-primary/5">
                  <AvatarFallback
                    className={
                      index % 2 ? "bg-primary/10 text-primary" : "bg-amber-100 text-amber-700"
                    }
                  >
                    {customer.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="truncate font-black">{customer.name}</div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Phone className="h-3 w-3" /> {customer.phone}
                  </div>
                </div>
              </div>
              <CustomerValue label="الزيارات" value={customer.bookingsCount} />
              <CustomerValue
                label="إجمالي الإنفاق"
                value={`${customer.totalSpent.toLocaleString()} ر.س`}
              />
              <CustomerValue label="النقاط" value={customer.loyaltyPoints} />
              <div>
                <Badge variant="outline" className={tierTone[customer.tier]}>
                  {customer.tier}
                </Badge>
              </div>
            </button>
          ))}
        </div>
      </Card>

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="sm:max-w-2xl" dir="rtl">
          {selected && (
            <>
              <DialogHeader className="text-right">
                <DialogTitle className="text-2xl">{selected.name}</DialogTitle>
                <DialogDescription>ملف العميل وسجل العلاقة مع الصالون</DialogDescription>
              </DialogHeader>
              <div className="grid gap-3 sm:grid-cols-3">
                <InfoCard
                  icon={<Sparkles />}
                  label="إجمالي الإنفاق"
                  value={`${selected.totalSpent.toLocaleString()} ر.س`}
                />
                <InfoCard
                  icon={<Wallet />}
                  label="رصيد المحفظة"
                  value={`${selected.walletBalance} ر.س`}
                />
                <InfoCard icon={<Crown />} label="نقاط الولاء" value={selected.loyaltyPoints} />
              </div>
              <div className="grid gap-4 rounded-2xl border bg-muted/30 p-4 sm:grid-cols-2">
                <ContactRow icon={<Phone />} label="رقم الجوال" value={selected.phone} />
                <ContactRow icon={<Mail />} label="البريد" value={selected.email ?? "غير مسجل"} />
                <ContactRow icon={<CalendarDays />} label="آخر زيارة" value={selected.lastVisit} />
                <ContactRow icon={<Crown />} label="المستوى" value={selected.tier} />
              </div>
              <div>
                <h3 className="mb-3 font-black">آخر الحجوزات</h3>
                <div className="space-y-2">
                  {bookings
                    .filter((booking) => booking.customerId === selected.id)
                    .map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between rounded-xl border p-3"
                      >
                        <div>
                          <div className="text-sm font-bold">{booking.serviceName}</div>
                          <div className="text-xs text-muted-foreground">
                            {booking.date} · {booking.employeeName}
                          </div>
                        </div>
                        <div className="font-black">{booking.price} ر.س</div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button asChild className="bg-gradient-brand">
                  <Link to="/merchant/bookings">إنشاء حجز للعميل</Link>
                </Button>
                <Button variant="outline">تعديل البيانات</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}

function CustomerValue({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-black">{value}</div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <Card className="border-0 bg-gradient-soft p-4 shadow-none">
      <div className="h-4 w-4 text-primary">{icon}</div>
      <div className="mt-3 text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 font-black">{value}</div>
    </Card>
  );
}

function ContactRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 h-4 w-4 text-primary">{icon}</span>
      <div>
        <div className="text-[10px] text-muted-foreground">{label}</div>
        <div className="text-sm font-bold">{value}</div>
      </div>
    </div>
  );
}
