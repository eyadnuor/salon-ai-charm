import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock3, Plus, Scissors, Search, Sparkles, Users, WalletCards } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { services, employees, bookings } from "@/data/mock";

export const Route = createFileRoute("/merchant/services")({
  head: () => ({ meta: [{ title: "الخدمات — صالون AI" }] }),
  component: ServicesPage,
});

const categoryTone: Record<string, string> = {
  شعر: "from-rose-800 to-rose-400",
  مكياج: "from-amber-600 to-amber-300",
  أظافر: "from-fuchsia-800 to-pink-400",
  بشرة: "from-violet-800 to-rose-400",
  سبا: "from-stone-700 to-amber-500",
};

function ServicesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("الكل");
  const categories = ["الكل", ...new Set(services.map((service) => service.category))];
  const filtered = useMemo(
    () =>
      services.filter(
        (service) =>
          (category === "الكل" || service.category === category) &&
          service.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, category],
  );
  const averagePrice = Math.round(
    services.reduce((sum, service) => sum + service.price, 0) / services.length,
  );

  return (
    <AppShell role="merchant">
      <PageHeader
        title="الخدمات"
        description="نظّمي قائمة الخدمات والأسعار والمدد واربطِي كل خدمة بالموظفات المختصات."
        actions={
          <Button className="bg-gradient-brand">
            <Plus className="ml-2 h-4 w-4" /> خدمة جديدة
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="الخدمات النشطة"
          value={services.filter((item) => item.active).length}
          icon={<Scissors className="h-5 w-5" />}
        />
        <KpiCard
          label="التصنيفات"
          value={categories.length - 1}
          icon={<Sparkles className="h-5 w-5" />}
        />
        <KpiCard
          label="متوسط السعر"
          value={`${averagePrice} ر.س`}
          icon={<WalletCards className="h-5 w-5" />}
          accent="warning"
        />
        <KpiCard
          label="فريق تقديم الخدمات"
          value={employees.length}
          icon={<Users className="h-5 w-5" />}
          accent="success"
        />
      </div>
      <Card className="mt-6 border-0 p-4 shadow-soft">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحثي عن خدمة..."
              className="max-w-md pr-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <Button
                key={item}
                size="sm"
                variant={category === item ? "default" : "outline"}
                onClick={() => setCategory(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </Card>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((service) => {
          const team = employees.filter((employee) => service.staffIds.includes(employee.id));
          const count = bookings.filter((booking) => booking.serviceId === service.id).length;
          return (
            <Card
              key={service.id}
              className="group overflow-hidden border-0 shadow-soft transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <div
                className={`h-2 bg-gradient-to-l ${categoryTone[service.category] ?? "from-primary to-primary-glow"}`}
              />
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="secondary">{service.category}</Badge>
                    <h3 className="mt-3 text-lg font-black">{service.name}</h3>
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-black text-primary">{service.price}</div>
                    <div className="text-[10px] text-muted-foreground">ر.س</div>
                  </div>
                </div>
                <p className="mt-2 min-h-10 text-xs leading-relaxed text-muted-foreground">
                  {service.description ?? "خدمة احترافية مقدمة وفق أعلى معايير الجودة والعناية."}
                </p>
                <div className="mt-4 flex items-center gap-4 border-y py-3 text-xs">
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4 text-primary" />
                    {service.duration} دقيقة
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    {count} حجوزات
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-muted-foreground">الفريق المختص</div>
                    <div className="mt-1 text-xs font-bold">
                      {team.map((item) => item.name.split(" ")[0]).join("، ") || "غير محدد"}
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/merchant/employees">إدارة الفريق</Link>
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
