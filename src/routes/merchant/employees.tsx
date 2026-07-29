import { useMemo, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  BriefcaseBusiness,
  CalendarCheck,
  Grid2X2,
  List,
  Mail,
  Banknote,
  Pencil,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Star,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/layout/AppShell";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { employees, services } from "@/data/mock";
import type { Employee } from "@/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/merchant/employees")({
  head: () => ({
    meta: [
      { title: "الموظفون — صالون AI" },
      {
        name: "description",
        content: "إدارة فريق العمل والجداول والعمولات ومؤشرات الأداء.",
      },
    ],
  }),
  component: EmployeesPage,
});

const statusConfig: Record<Employee["status"], { label: string; className: string; dot: string }> =
  {
    active: {
      label: "على رأس العمل",
      className: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
    },
    "on-leave": {
      label: "في إجازة",
      className: "bg-amber-50 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
    },
    inactive: {
      label: "غير نشط",
      className: "bg-slate-50 text-slate-600 border-slate-200",
      dot: "bg-slate-400",
    },
  };

const avatarGradients = [
  "from-teal-600 to-cyan-500",
  "from-sky-700 to-blue-500",
  "from-amber-500 to-yellow-400",
  "from-emerald-600 to-teal-500",
  "from-emerald-500 to-teal-500",
];

function EmployeesPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employeeDraft, setEmployeeDraft] = useState<Employee | null>(null);
  const [team, setTeam] = useState(employees);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
  });

  const filteredEmployees = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return team.filter((employee) => {
      const matchesQuery =
        !normalizedQuery ||
        [employee.name, employee.role, employee.email, employee.phone].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        );
      const matchesStatus = status === "all" || employee.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status, team]);

  const activeCount = team.filter((employee) => employee.status === "active").length;
  const averageRating = (
    team.reduce((sum, employee) => sum + employee.rating, 0) / team.length
  ).toFixed(1);
  const totalBookings = team.reduce((sum, employee) => sum + employee.bookingsThisMonth, 0);

  function addEmployee() {
    if (!newEmployee.name.trim() || !newEmployee.role.trim()) {
      toast.error("أدخلي اسم الموظفة والمسمى الوظيفي");
      return;
    }

    setTeam((current) => [
      ...current,
      {
        id: `e-${Date.now()}`,
        name: newEmployee.name.trim(),
        role: newEmployee.role.trim(),
        phone: newEmployee.phone.trim() || "غير محدد",
        email: newEmployee.email.trim() || "غير محدد",
        salary: 0,
        commissionRate: 10,
        rating: 5,
        bookingsThisMonth: 0,
        status: "active",
        services: [],
      },
    ]);
    setNewEmployee({ name: "", role: "", phone: "", email: "" });
    setDialogOpen(false);
    toast.success("تمت إضافة الموظفة بنجاح");
  }

  function openEmployeeProfile(employee: Employee) {
    setSelectedEmployee(employee);
    setEmployeeDraft({ ...employee, services: [...employee.services] });
    setProfileOpen(true);
  }

  function saveEmployee() {
    if (!employeeDraft || !employeeDraft.name.trim() || !employeeDraft.role.trim()) {
      toast.error("الاسم والمسمى الوظيفي مطلوبان");
      return;
    }
    setTeam((current) =>
      current.map((employee) =>
        employee.id === employeeDraft.id ? { ...employeeDraft } : employee,
      ),
    );
    setSelectedEmployee({ ...employeeDraft });
    setProfileOpen(false);
    toast.success("تم حفظ بيانات الموظفة");
  }

  return (
    <AppShell role="merchant">
      <PageHeader
        title="فريق العمل"
        description="تابعي أداء الموظفات، الجداول، الخدمات والعمولات من مكان واحد."
        actions={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-brand shadow-soft">
                <Plus className="ml-2 h-4 w-4" />
                إضافة موظفة
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg" dir="rtl">
              <DialogHeader className="text-right">
                <DialogTitle>إضافة موظفة جديدة</DialogTitle>
                <DialogDescription>
                  أدخلي البيانات الأساسية، ويمكن استكمال الراتب والصلاحيات لاحقًا.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-3 sm:grid-cols-2">
                <Input
                  placeholder="الاسم الكامل *"
                  value={newEmployee.name}
                  onChange={(event) =>
                    setNewEmployee((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                />
                <Input
                  placeholder="المسمى الوظيفي *"
                  value={newEmployee.role}
                  onChange={(event) =>
                    setNewEmployee((current) => ({
                      ...current,
                      role: event.target.value,
                    }))
                  }
                />
                <Input
                  placeholder="رقم الجوال"
                  value={newEmployee.phone}
                  onChange={(event) =>
                    setNewEmployee((current) => ({
                      ...current,
                      phone: event.target.value,
                    }))
                  }
                />
                <Input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={newEmployee.email}
                  onChange={(event) =>
                    setNewEmployee((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                />
              </div>
              <DialogFooter className="gap-2 sm:justify-start">
                <Button onClick={addEmployee} className="bg-gradient-brand">
                  إضافة للفريق
                </Button>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  إلغاء
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="إجمالي الموظفات"
          value={team.length}
          icon={<Users className="h-5 w-5" />}
          trend={{ value: "+2 هذا الشهر", up: true }}
        />
        <KpiCard
          label="على رأس العمل"
          value={`${activeCount}/${team.length}`}
          icon={<UserCheck className="h-5 w-5" />}
          accent="success"
        />
        <KpiCard
          label="حجوزات الفريق هذا الشهر"
          value={totalBookings}
          icon={<CalendarCheck className="h-5 w-5" />}
          trend={{ value: "+11%", up: true }}
        />
        <KpiCard
          label="متوسط تقييم الفريق"
          value={`${averageRating}/5`}
          icon={<Star className="h-5 w-5" />}
          accent="warning"
        />
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1 lg:max-w-md">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحثي بالاسم، التخصص أو رقم الجوال..."
              className="pr-9"
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full lg:w-44">
              <SelectValue placeholder="حالة الموظفة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="active">على رأس العمل</SelectItem>
              <SelectItem value="on-leave">في إجازة</SelectItem>
              <SelectItem value="inactive">غير نشط</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex rounded-lg border bg-muted/40 p-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="عرض البطاقات"
              onClick={() => setView("grid")}
              className={cn("h-8 w-8", view === "grid" && "bg-card shadow-sm")}
            >
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="عرض القائمة"
              onClick={() => setView("list")}
              className={cn("h-8 w-8", view === "list" && "bg-card shadow-sm")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "p-4 sm:p-5",
            view === "grid" ? "grid gap-4 md:grid-cols-2 2xl:grid-cols-3" : "space-y-3",
          )}
        >
          {filteredEmployees.map((employee, index) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              index={index}
              compact={view === "list"}
              onOpen={openEmployeeProfile}
            />
          ))}
          {filteredEmployees.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-muted">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-bold">لا توجد نتائج مطابقة</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                جرّبي تغيير كلمات البحث أو حالة الموظفة.
              </p>
            </div>
          )}
        </div>
      </Card>

      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-3xl" dir="rtl">
          {employeeDraft && selectedEmployee && (
            <>
              <div className="relative -mx-6 -mt-6 overflow-hidden rounded-t-lg bg-gradient-hero px-6 pb-6 pt-8 text-white">
                <div className="absolute -left-12 -top-16 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
                <div className="relative flex items-center gap-4">
                  <Avatar className="h-20 w-20 border-4 border-white/25 shadow-xl">
                    <AvatarFallback className="bg-white/20 text-xl font-black text-white">
                      {employeeDraft.name
                        .split(" ")
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-xl font-black text-white">
                      {selectedEmployee.name}
                    </DialogTitle>
                    <DialogDescription className="mt-1 text-white/75">
                      {selectedEmployee.role} · ملف الموظفة
                    </DialogDescription>
                    <Badge className="mt-3 border-white/20 bg-white/15 text-white hover:bg-white/20">
                      {statusConfig[selectedEmployee.status].label}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 py-2 lg:grid-cols-[1fr_240px]">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Pencil className="h-4 w-4 text-primary" />
                    <h3 className="font-black">البيانات الأساسية</h3>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <LabeledInput
                      label="الاسم الكامل"
                      value={employeeDraft.name}
                      onChange={(value) =>
                        setEmployeeDraft((current) =>
                          current ? { ...current, name: value } : current,
                        )
                      }
                    />
                    <LabeledInput
                      label="المسمى الوظيفي"
                      value={employeeDraft.role}
                      onChange={(value) =>
                        setEmployeeDraft((current) =>
                          current ? { ...current, role: value } : current,
                        )
                      }
                    />
                    <LabeledInput
                      label="رقم الجوال"
                      value={employeeDraft.phone}
                      onChange={(value) =>
                        setEmployeeDraft((current) =>
                          current ? { ...current, phone: value } : current,
                        )
                      }
                    />
                    <LabeledInput
                      label="البريد الإلكتروني"
                      value={employeeDraft.email}
                      type="email"
                      onChange={(value) =>
                        setEmployeeDraft((current) =>
                          current ? { ...current, email: value } : current,
                        )
                      }
                    />
                    <LabeledInput
                      label="الراتب الشهري"
                      value={String(employeeDraft.salary)}
                      type="number"
                      suffix="ر.س"
                      onChange={(value) =>
                        setEmployeeDraft((current) =>
                          current ? { ...current, salary: Number(value) } : current,
                        )
                      }
                    />
                    <LabeledInput
                      label="نسبة العمولة"
                      value={String(employeeDraft.commissionRate)}
                      type="number"
                      suffix="%"
                      onChange={(value) =>
                        setEmployeeDraft((current) =>
                          current ? { ...current, commissionRate: Number(value) } : current,
                        )
                      }
                    />
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-xs font-bold text-muted-foreground">
                        حالة الموظفة
                      </label>
                      <Select
                        value={employeeDraft.status}
                        onValueChange={(value: Employee["status"]) =>
                          setEmployeeDraft((current) =>
                            current ? { ...current, status: value } : current,
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">على رأس العمل</SelectItem>
                          <SelectItem value="on-leave">في إجازة</SelectItem>
                          <SelectItem value="inactive">غير نشط</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mb-3 mt-6 flex items-center gap-2">
                    <BriefcaseBusiness className="h-4 w-4 text-primary" />
                    <h3 className="font-black">الخدمات التي تقدمها</h3>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {services.map((service) => {
                      const checked = employeeDraft.services.includes(service.id);
                      return (
                        <label
                          key={service.id}
                          className={cn(
                            "flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition",
                            checked ? "border-primary/30 bg-primary/5" : "hover:bg-muted/50",
                          )}
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(value) =>
                              setEmployeeDraft((current) => {
                                if (!current) return current;
                                return {
                                  ...current,
                                  services: value
                                    ? [...current.services, service.id]
                                    : current.services.filter((id) => id !== service.id),
                                };
                              })
                            }
                          />
                          <span className="flex-1 font-medium">{service.name}</span>
                          <span className="text-[10px] text-muted-foreground">
                            {service.duration} د
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-black">ملخص الأداء</h3>
                  <ProfileStat
                    icon={<CalendarCheck className="h-4 w-4" />}
                    label="حجوزات الشهر"
                    value={employeeDraft.bookingsThisMonth}
                  />
                  <ProfileStat
                    icon={<Star className="h-4 w-4" />}
                    label="تقييم العملاء"
                    value={`${employeeDraft.rating}/5`}
                  />
                  <ProfileStat
                    icon={<Banknote className="h-4 w-4" />}
                    label="الراتب"
                    value={`${employeeDraft.salary.toLocaleString()} ر.س`}
                  />
                  <Card className="border-0 bg-gradient-soft p-4 shadow-none">
                    <div className="text-xs text-muted-foreground">التكلفة التقديرية</div>
                    <div className="mt-1 text-xl font-black">
                      {Math.round(
                        employeeDraft.salary +
                          employeeDraft.bookingsThisMonth *
                            100 *
                            (employeeDraft.commissionRate / 100),
                      ).toLocaleString()}{" "}
                      ر.س
                    </div>
                    <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
                      الراتب الأساسي مع تقدير عمولات حجوزات الشهر.
                    </p>
                  </Card>
                </div>
              </div>

              <DialogFooter className="gap-2 sm:justify-start">
                <Button onClick={saveEmployee} className="bg-gradient-brand">
                  حفظ التعديلات
                </Button>
                <Button variant="outline" onClick={() => setProfileOpen(false)}>
                  إلغاء
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}

function EmployeeCard({
  employee,
  index,
  compact,
  onOpen,
}: {
  employee: Employee;
  index: number;
  compact: boolean;
  onOpen: (employee: Employee) => void;
}) {
  const employeeServices = employee.services
    .map((serviceId) => services.find((service) => service.id === serviceId)?.name)
    .filter(Boolean);
  const targetProgress = Math.min(100, Math.round((employee.bookingsThisMonth / 90) * 100));
  const status = statusConfig[employee.status];

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/25 hover:shadow-elegant",
        compact && "flex flex-col gap-4 sm:flex-row sm:items-center",
      )}
    >
      {!compact && (
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-primary via-teal-500 to-amber-400" />
      )}
      <div className={cn("flex items-start gap-3", compact && "sm:min-w-64")}>
        <Avatar className="h-14 w-14 border-2 border-background shadow-soft ring-4 ring-primary/5">
          <AvatarFallback
            className={cn(
              "bg-gradient-to-br text-sm font-black text-white",
              avatarGradients[index % avatarGradients.length],
            )}
          >
            {employee.name
              .split(" ")
              .map((part) => part[0])
              .slice(0, 2)
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-black">{employee.name}</h3>
            <span className={cn("h-2 w-2 shrink-0 rounded-full", status.dot)} />
          </div>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{employee.role}</p>
        </div>
        {!compact && <EmployeeMenu employee={employee} onOpen={onOpen} />}
      </div>

      <div className={cn("mt-5 grid grid-cols-3 gap-2", compact && "mt-0 sm:flex-1")}>
        <MiniStat label="الحجوزات" value={employee.bookingsThisMonth} />
        <MiniStat label="التقييم" value={employee.rating} suffix="★" />
        <MiniStat label="العمولة" value={employee.commissionRate} suffix="%" />
      </div>

      {!compact && (
        <>
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">الهدف الشهري</span>
              <span className="font-bold">{targetProgress}%</span>
            </div>
            <Progress value={targetProgress} className="h-1.5" />
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {employeeServices.slice(0, 2).map((service) => (
              <Badge key={service} variant="secondary" className="font-medium">
                {service}
              </Badge>
            ))}
            {employeeServices.length > 2 && (
              <Badge variant="outline">+{employeeServices.length - 2}</Badge>
            )}
          </div>
        </>
      )}

      <div
        className={cn(
          "mt-5 flex items-center justify-between border-t pt-4",
          compact && "mt-0 gap-4 border-0 pt-0 sm:min-w-48",
        )}
      >
        <Badge variant="outline" className={cn("gap-1.5 font-medium", status.className)}>
          <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
          {status.label}
        </Badge>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="outline"
            className="h-8 rounded-lg text-xs font-bold"
            onClick={() => onOpen(employee)}
          >
            عرض الملف
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label={`الاتصال بـ${employee.name}`}
          >
            <Phone className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label={`مراسلة ${employee.name}`}
          >
            <Mail className="h-3.5 w-3.5" />
          </Button>
          {compact && <EmployeeMenu employee={employee} onOpen={onOpen} />}
        </div>
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string | number;
  suffix?: string;
}) {
  return (
    <div className="rounded-xl bg-muted/55 px-3 py-2.5 text-center">
      <div className="text-sm font-black">
        {value}
        {suffix && <span className="mr-0.5 text-[10px] text-primary">{suffix}</span>}
      </div>
      <div className="mt-0.5 text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}

function EmployeeMenu({
  employee,
  onOpen,
}: {
  employee: Employee;
  onOpen: (employee: Employee) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">خيارات {employee.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => onOpen(employee)}>
          <BriefcaseBusiness className="ml-2 h-4 w-4" />
          عرض الملف
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CalendarCheck className="ml-2 h-4 w-4" />
          جدول العمل
        </DropdownMenuItem>
        <DropdownMenuItem>
          <TrendingUp className="ml-2 h-4 w-4" />
          تقرير الأداء
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">إيقاف الحساب</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  type = "text",
  suffix,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  suffix?: string;
}) {
  return (
    <label>
      <span className="mb-1.5 block text-xs font-bold text-muted-foreground">{label}</span>
      <div className="relative">
        <Input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={suffix ? "pl-12" : undefined}
        />
        {suffix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

function ProfileStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border bg-card p-3.5">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <div className="text-[10px] text-muted-foreground">{label}</div>
        <div className="mt-0.5 text-sm font-black">{value}</div>
      </div>
    </div>
  );
}
