import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard, Users, Store, CreditCard, Ticket, LifeBuoy, Bot, Settings,
  Calendar, UserSquare2, Scissors, Package, Wallet, BadgePercent, Sparkles,
  Coins, Receipt, HandCoins, Clock4, Building2, ShieldAlert, User, ClipboardList,
  CalendarDays, LogIn, LogOut, Gift, MessageCircle,
} from "lucide-react";
import type { Role } from "@/types";

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  group?: string;
}

export const navByRole: Record<Role, NavItem[]> = {
  admin: [
    { title: "نظرة عامة", url: "/admin", icon: LayoutDashboard, group: "لوحة القيادة" },
    { title: "التجار", url: "/admin/tenants", icon: Store, group: "الإدارة" },
    { title: "الخطط والأسعار", url: "/admin/plans", icon: BadgePercent, group: "الإدارة" },
    { title: "الاشتراكات والفواتير", url: "/admin/subscriptions", icon: CreditCard, group: "الإدارة" },
    { title: "الكوبونات العامة", url: "/admin/coupons", icon: Ticket, group: "الإدارة" },
    { title: "تذاكر الدعم", url: "/admin/support", icon: LifeBuoy, group: "الدعم" },
    { title: "مساعد AI للدعم", url: "/admin/ai-support", icon: Bot, group: "الدعم" },
    { title: "إعدادات المنصة", url: "/admin/settings", icon: Settings, group: "الإعدادات" },
  ],
  merchant: [
    { title: "لوحة القيادة", url: "/merchant", icon: LayoutDashboard, group: "الرئيسية" },
    { title: "الحجوزات", url: "/merchant/bookings", icon: Calendar, group: "العمليات" },
    { title: "العملاء", url: "/merchant/customers", icon: UserSquare2, group: "العمليات" },
    { title: "الموظفون", url: "/merchant/employees", icon: Users, group: "العمليات" },
    { title: "الخدمات", url: "/merchant/services", icon: Scissors, group: "العمليات" },
    { title: "المخزون", url: "/merchant/inventory", icon: Package, group: "العمليات" },
    { title: "المحافظ", url: "/merchant/wallets", icon: Wallet, group: "المال والعملاء" },
    { title: "الكوبونات", url: "/merchant/coupons", icon: Ticket, group: "المال والعملاء" },
    { title: "برنامج الولاء", url: "/merchant/loyalty", icon: Gift, group: "المال والعملاء" },
    { title: "الحسابات", url: "/merchant/accounting", icon: Receipt, group: "المالية" },
    { title: "الرواتب", url: "/merchant/payroll", icon: HandCoins, group: "المالية" },
    { title: "الحضور", url: "/merchant/attendance", icon: Clock4, group: "المالية" },
    { title: "المدفوعات الإلكترونية", url: "/merchant/payments", icon: CreditCard, group: "المالية" },
    { title: "اشتراكي وفواتيري", url: "/merchant/subscription", icon: Building2, group: "الحساب" },
    { title: "إعدادات المتجر", url: "/merchant/settings", icon: Settings, group: "الحساب" },
    { title: "إعادة ضبط المصنع", url: "/merchant/danger-zone", icon: ShieldAlert, group: "الحساب" },
  ],
  staff: [
    { title: "ملخص يومي", url: "/staff", icon: LayoutDashboard },
    { title: "حجوزاتي", url: "/staff/bookings", icon: Calendar },
    { title: "تقويمي", url: "/staff/calendar", icon: CalendarDays },
    { title: "حضور وانصراف", url: "/staff/attendance", icon: Clock4 },
    { title: "عملائي", url: "/staff/customers", icon: UserSquare2 },
    { title: "عمولاتي وراتبي", url: "/staff/earnings", icon: Coins },
    { title: "طلب إجازة", url: "/staff/leave", icon: ClipboardList },
    { title: "الملف الشخصي", url: "/staff/profile", icon: User },
  ],
  client: [
    { title: "الرئيسية", url: "/client", icon: LayoutDashboard },
    { title: "احجز الآن", url: "/client/book", icon: Sparkles },
    { title: "حجوزاتي", url: "/client/bookings", icon: Calendar },
    { title: "المحفظة", url: "/client/wallet", icon: Wallet },
    { title: "كوبوناتي", url: "/client/coupons", icon: Ticket },
    { title: "النقاط والمكافآت", url: "/client/loyalty", icon: Gift },
    { title: "فواتيري", url: "/client/invoices", icon: Receipt },
    { title: "الملف الشخصي", url: "/client/profile", icon: User },
    { title: "المساعد الذكي", url: "/client/assistant", icon: MessageCircle },
  ],
};

export { LogIn, LogOut };
