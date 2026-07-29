import type {
  Tenant, Service, Employee, Customer, Booking, Coupon,
  InventoryItem, Expense, PayrollEntry, AttendanceRecord, Invoice,
  SupportTicket, Plan
} from "@/types";

export const plans: Plan[] = [
  {
    id: "basic", name: "الأساسية", priceMonthly: 99, priceYearly: 990,
    features: ["حتى 200 حجز شهرياً", "3 موظفين", "إدارة عملاء أساسية", "دعم عبر البريد", "تقارير أساسية"],
    limits: { bookings: 200, employees: 3, storage: "1 GB" },
  },
  {
    id: "pro", name: "الاحترافية", priceMonthly: 249, priceYearly: 2490, popular: true,
    features: ["حجوزات غير محدودة", "حتى 15 موظف", "CRM متقدم + نقاط ولاء", "مساعد AI للعملاء", "تقارير متقدمة", "بوابات دفع متعددة", "دعم على مدار الساعة"],
    limits: { bookings: 9999, employees: 15, storage: "10 GB" },
  },
  {
    id: "business", name: "الأعمال", priceMonthly: 499, priceYearly: 4990,
    features: ["كل مزايا الاحترافية", "موظفون غير محدودين", "فروع متعددة", "API مخصص", "علامة تجارية بيضاء", "مدير حساب مخصص"],
    limits: { bookings: 99999, employees: 999, storage: "100 GB" },
  },
];

export const tenants: Tenant[] = [
  { id: "t1", name: "صالون لمسة أنثى", slug: "lamsat-ontha", plan: "pro", status: "active", ownerName: "سارة الأحمدي", email: "sara@lamsa.sa", phone: "+966 55 123 4567", city: "الرياض", createdAt: "2025-11-14", revenue: 84500, bookingsCount: 412, primaryColor: "#7c3aed" },
  { id: "t2", name: "كوافير النخبة", slug: "elite-hair", plan: "business", status: "active", ownerName: "خالد الفهد", email: "khalid@elite.sa", phone: "+966 50 987 6543", city: "جدة", createdAt: "2025-08-02", revenue: 152300, bookingsCount: 780, primaryColor: "#be185d" },
  { id: "t3", name: "مركز رونق للتجميل", slug: "rawnaq", plan: "pro", status: "active", ownerName: "منى العتيبي", email: "mona@rawnaq.sa", phone: "+966 56 222 1111", city: "الدمام", createdAt: "2026-01-20", revenue: 62100, bookingsCount: 298 },
  { id: "t4", name: "صالون ديفا", slug: "diva", plan: "basic", status: "trial", ownerName: "ريم القحطاني", email: "reem@diva.sa", phone: "+966 54 333 2222", city: "مكة", createdAt: "2026-07-10", revenue: 4200, bookingsCount: 28 },
  { id: "t5", name: "باربر الملوك", slug: "kings-barber", plan: "basic", status: "suspended", ownerName: "فيصل الحربي", email: "faisal@kings.sa", phone: "+966 53 111 4444", city: "الرياض", createdAt: "2025-05-18", revenue: 18900, bookingsCount: 92 },
  { id: "t6", name: "ستوديو غلام", slug: "glam-studio", plan: "pro", status: "active", ownerName: "لينا الشمري", email: "lina@glam.sa", phone: "+966 55 777 8888", city: "الرياض", createdAt: "2026-03-05", revenue: 45600, bookingsCount: 210 },
];

export const services: Service[] = [
  { id: "s1", name: "قص شعر نسائي", category: "شعر", duration: 45, price: 120, staffIds: ["e1", "e2"], active: true, description: "قص احترافي مع غسيل وتصفيف" },
  { id: "s2", name: "صبغة شعر كاملة", category: "شعر", duration: 120, price: 380, staffIds: ["e1"], active: true },
  { id: "s3", name: "مكياج سهرة", category: "مكياج", duration: 60, price: 250, staffIds: ["e3"], active: true },
  { id: "s4", name: "مكياج عروس", category: "مكياج", duration: 120, price: 850, staffIds: ["e3"], active: true },
  { id: "s5", name: "مانيكير + باديكير", category: "أظافر", duration: 75, price: 180, staffIds: ["e2", "e4"], active: true },
  { id: "s6", name: "تنظيف بشرة عميق", category: "بشرة", duration: 60, price: 320, staffIds: ["e4"], active: true },
  { id: "s7", name: "حمام مغربي", category: "سبا", duration: 90, price: 280, staffIds: ["e4"], active: true },
  { id: "s8", name: "تصفيف شعر", category: "شعر", duration: 30, price: 90, staffIds: ["e1", "e2"], active: true },
];

export const employees: Employee[] = [
  { id: "e1", name: "أمل السلمي", role: "خبيرة شعر أولى", email: "amal@salon.sa", phone: "+966 55 100 1001", salary: 6500, commissionRate: 15, rating: 4.9, bookingsThisMonth: 87, status: "active", services: ["s1", "s2", "s8"] },
  { id: "e2", name: "نورة الزهراني", role: "مصففة", email: "noura@salon.sa", phone: "+966 55 100 1002", salary: 4800, commissionRate: 12, rating: 4.7, bookingsThisMonth: 62, status: "active", services: ["s1", "s5", "s8"] },
  { id: "e3", name: "دانة العبدالله", role: "خبيرة مكياج", email: "dana@salon.sa", phone: "+966 55 100 1003", salary: 7200, commissionRate: 18, rating: 5.0, bookingsThisMonth: 54, status: "active", services: ["s3", "s4"] },
  { id: "e4", name: "هند القرني", role: "أخصائية بشرة وسبا", email: "hind@salon.sa", phone: "+966 55 100 1004", salary: 5800, commissionRate: 14, rating: 4.8, bookingsThisMonth: 71, status: "on-leave", services: ["s5", "s6", "s7"] },
  { id: "e5", name: "شذى المطيري", role: "متدربة", email: "shatha@salon.sa", phone: "+966 55 100 1005", salary: 3000, commissionRate: 8, rating: 4.3, bookingsThisMonth: 22, status: "active", services: ["s5", "s8"] },
];

export const customers: Customer[] = [
  { id: "c1", name: "فاطمة الغامدي", phone: "+966 50 200 2001", email: "fatima@mail.com", totalSpent: 4820, bookingsCount: 24, loyaltyPoints: 480, tier: "ذهبي", lastVisit: "2026-07-24", walletBalance: 150 },
  { id: "c2", name: "عبير الحارثي", phone: "+966 50 200 2002", totalSpent: 2100, bookingsCount: 12, loyaltyPoints: 210, tier: "فضي", lastVisit: "2026-07-18", walletBalance: 40 },
  { id: "c3", name: "منال الشهري", phone: "+966 50 200 2003", email: "manal@mail.com", totalSpent: 8950, bookingsCount: 41, loyaltyPoints: 895, tier: "بلاتيني", lastVisit: "2026-07-27", walletBalance: 320, notes: "تفضل المواعيد الصباحية" },
  { id: "c4", name: "روان الدوسري", phone: "+966 50 200 2004", totalSpent: 680, bookingsCount: 4, loyaltyPoints: 68, tier: "برونزي", lastVisit: "2026-07-10", walletBalance: 0 },
  { id: "c5", name: "جواهر السبيعي", phone: "+966 50 200 2005", email: "jawaher@mail.com", totalSpent: 3450, bookingsCount: 18, loyaltyPoints: 345, tier: "ذهبي", lastVisit: "2026-07-22", walletBalance: 80 },
  { id: "c6", name: "أروى المالكي", phone: "+966 50 200 2006", totalSpent: 1250, bookingsCount: 7, loyaltyPoints: 125, tier: "فضي", lastVisit: "2026-06-30", walletBalance: 25 },
];

const today = new Date();
const iso = (offset: number) => new Date(today.getTime() + offset * 86400000).toISOString().slice(0, 10);

export const bookings: Booking[] = [
  { id: "b1", customerId: "c1", customerName: "فاطمة الغامدي", serviceId: "s2", serviceName: "صبغة شعر كاملة", employeeId: "e1", employeeName: "أمل السلمي", date: iso(0), time: "10:00", duration: 120, price: 380, status: "confirmed" },
  { id: "b2", customerId: "c3", customerName: "منال الشهري", serviceId: "s4", serviceName: "مكياج عروس", employeeId: "e3", employeeName: "دانة العبدالله", date: iso(0), time: "13:00", duration: 120, price: 850, status: "confirmed" },
  { id: "b3", customerId: "c2", customerName: "عبير الحارثي", serviceId: "s5", serviceName: "مانيكير + باديكير", employeeId: "e2", employeeName: "نورة الزهراني", date: iso(0), time: "16:00", duration: 75, price: 180, status: "pending" },
  { id: "b4", customerId: "c5", customerName: "جواهر السبيعي", serviceId: "s1", serviceName: "قص شعر نسائي", employeeId: "e1", employeeName: "أمل السلمي", date: iso(1), time: "11:00", duration: 45, price: 120, status: "confirmed" },
  { id: "b5", customerId: "c4", customerName: "روان الدوسري", serviceId: "s6", serviceName: "تنظيف بشرة عميق", employeeId: "e4", employeeName: "هند القرني", date: iso(1), time: "14:30", duration: 60, price: 320, status: "confirmed" },
  { id: "b6", customerId: "c6", customerName: "أروى المالكي", serviceId: "s3", serviceName: "مكياج سهرة", employeeId: "e3", employeeName: "دانة العبدالله", date: iso(2), time: "18:00", duration: 60, price: 250, status: "pending" },
  { id: "b7", customerId: "c1", customerName: "فاطمة الغامدي", serviceId: "s8", serviceName: "تصفيف شعر", employeeId: "e2", employeeName: "نورة الزهراني", date: iso(-1), time: "12:00", duration: 30, price: 90, status: "completed" },
  { id: "b8", customerId: "c3", customerName: "منال الشهري", serviceId: "s7", serviceName: "حمام مغربي", employeeId: "e4", employeeName: "هند القرني", date: iso(-2), time: "15:00", duration: 90, price: 280, status: "completed" },
  { id: "b9", customerId: "c2", customerName: "عبير الحارثي", serviceId: "s1", serviceName: "قص شعر نسائي", employeeId: "e1", employeeName: "أمل السلمي", date: iso(-3), time: "10:30", duration: 45, price: 120, status: "cancelled" },
];

export const coupons: Coupon[] = [
  { id: "cp1", code: "WELCOME20", type: "percent", value: 20, minAmount: 100, usageLimit: 500, usedCount: 142, expiresAt: "2026-12-31", active: true },
  { id: "cp2", code: "SUMMER50", type: "fixed", value: 50, minAmount: 200, usageLimit: 200, usedCount: 87, expiresAt: "2026-09-30", active: true },
  { id: "cp3", code: "VIP10", type: "percent", value: 10, usageLimit: 1000, usedCount: 234, expiresAt: "2026-12-31", active: true },
  { id: "cp4", code: "OLD100", type: "fixed", value: 100, usageLimit: 50, usedCount: 50, expiresAt: "2026-06-01", active: false },
];

export const inventory: InventoryItem[] = [
  { id: "i1", name: "صبغة شعر لوريال بني", sku: "LR-BR-01", category: "صبغات", quantity: 24, minQuantity: 10, price: 45, supplier: "شركة الجمال" },
  { id: "i2", name: "شامبو كيراتين 500مل", sku: "KR-SH-500", category: "عناية بالشعر", quantity: 8, minQuantity: 15, price: 120, supplier: "بيوتي كير" },
  { id: "i3", name: "طلاء أظافر جل", sku: "NP-GEL-45", category: "أظافر", quantity: 45, minQuantity: 20, price: 35, supplier: "نيل برو" },
  { id: "i4", name: "ماسك بشرة كولاجين", sku: "MK-COL-30", category: "بشرة", quantity: 3, minQuantity: 12, price: 85, supplier: "سكين ديب" },
  { id: "i5", name: "أدوات مكياج طقم", sku: "MU-KIT-01", category: "مكياج", quantity: 18, minQuantity: 5, price: 240, supplier: "MAC توزيع" },
];

export const expenses: Expense[] = [
  { id: "x1", category: "إيجار", description: "إيجار المحل يوليو", amount: 8500, date: "2026-07-01" },
  { id: "x2", category: "مرافق", description: "كهرباء وماء", amount: 1200, date: "2026-07-05" },
  { id: "x3", category: "مستلزمات", description: "شراء صبغات وأدوات", amount: 3400, date: "2026-07-12" },
  { id: "x4", category: "تسويق", description: "إعلانات إنستقرام", amount: 2000, date: "2026-07-15" },
  { id: "x5", category: "صيانة", description: "صيانة كراسي وأدوات", amount: 650, date: "2026-07-20" },
];

export const payroll: PayrollEntry[] = employees.map((e, idx) => {
  const commissions = Math.round(e.bookingsThisMonth * 15 * (e.commissionRate / 10));
  const bonuses = idx === 0 ? 500 : 0;
  const deductions = idx === 3 ? 300 : 0;
  return {
    id: `p${idx + 1}`, employeeId: e.id, employeeName: e.name, month: "2026-07",
    baseSalary: e.salary, commissions, bonuses, deductions,
    net: e.salary + commissions + bonuses - deductions,
    status: (idx < 2 ? "paid" : "pending") as "paid" | "pending",
  };
});

export const attendance: AttendanceRecord[] = employees.slice(0, 4).map((e, i) => ({
  id: `a${i + 1}`, employeeId: e.id, employeeName: e.name, date: iso(0),
  checkIn: ["08:55", "09:15", "09:02", "—"][i], checkOut: ["17:05", "17:00", "16:45", "—"][i],
  hours: [8.2, 7.75, 7.72, 0][i],
  status: (["present", "late", "present", "absent"] as const)[i],
}));

export const invoices: Invoice[] = [
  { id: "in1", number: "INV-2026-0142", tenantId: "t1", tenantName: "صالون لمسة أنثى", amount: 249, status: "paid", date: "2026-07-01", dueDate: "2026-07-15" },
  { id: "in2", number: "INV-2026-0143", tenantId: "t2", tenantName: "كوافير النخبة", amount: 499, status: "paid", date: "2026-07-01", dueDate: "2026-07-15" },
  { id: "in3", number: "INV-2026-0144", tenantId: "t3", tenantName: "مركز رونق", amount: 249, status: "pending", date: "2026-07-15", dueDate: "2026-07-30" },
  { id: "in4", number: "INV-2026-0140", tenantId: "t5", tenantName: "باربر الملوك", amount: 99, status: "overdue", date: "2026-06-15", dueDate: "2026-06-30" },
  { id: "in5", number: "INV-2026-0145", tenantId: "t6", tenantName: "ستوديو غلام", amount: 249, status: "paid", date: "2026-07-05", dueDate: "2026-07-20" },
];

export const supportTickets: SupportTicket[] = [
  { id: "st1", subject: "استفسار عن ربط بوابة الدفع", tenantName: "صالون لمسة أنثى", status: "open", priority: "medium", updatedAt: "2026-07-28", messages: 4 },
  { id: "st2", subject: "طلب ترقية الخطة", tenantName: "مركز رونق", status: "resolved", priority: "low", updatedAt: "2026-07-26", messages: 6 },
  { id: "st3", subject: "مشكلة في إشعارات الحجوزات", tenantName: "كوافير النخبة", status: "escalated", priority: "high", updatedAt: "2026-07-29", messages: 12 },
  { id: "st4", subject: "استرجاع بيانات محذوفة", tenantName: "ستوديو غلام", status: "open", priority: "high", updatedAt: "2026-07-29", messages: 3 },
];

// KPI series
export const revenueSeries = [
  { month: "يناير", revenue: 42000, tenants: 18 },
  { month: "فبراير", revenue: 48500, tenants: 22 },
  { month: "مارس", revenue: 55200, tenants: 27 },
  { month: "أبريل", revenue: 61800, tenants: 32 },
  { month: "مايو", revenue: 68400, tenants: 38 },
  { month: "يونيو", revenue: 74100, tenants: 44 },
  { month: "يوليو", revenue: 82500, tenants: 51 },
];

export const bookingsSeries = [
  { day: "السبت", bookings: 28 },
  { day: "الأحد", bookings: 34 },
  { day: "الاثنين", bookings: 41 },
  { day: "الثلاثاء", bookings: 38 },
  { day: "الأربعاء", bookings: 45 },
  { day: "الخميس", bookings: 52 },
  { day: "الجمعة", bookings: 22 },
];

export const topServices = [
  { name: "قص شعر نسائي", value: 142 },
  { name: "صبغة شعر", value: 98 },
  { name: "مانيكير", value: 87 },
  { name: "مكياج سهرة", value: 64 },
  { name: "تنظيف بشرة", value: 51 },
];
