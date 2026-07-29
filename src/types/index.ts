export type Role = "admin" | "merchant" | "staff" | "client";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  tenantId?: string;
  avatar?: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: "basic" | "pro" | "business";
  status: "active" | "trial" | "suspended";
  ownerName: string;
  email: string;
  phone: string;
  city: string;
  createdAt: string;
  revenue: number;
  bookingsCount: number;
  logo?: string;
  primaryColor?: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  duration: number; // minutes
  price: number;
  image?: string;
  staffIds: string[];
  active: boolean;
  description?: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar?: string;
  salary: number;
  commissionRate: number;
  rating: number;
  bookingsThisMonth: number;
  status: "active" | "on-leave" | "inactive";
  services: string[];
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  totalSpent: number;
  bookingsCount: number;
  loyaltyPoints: number;
  tier: "برونزي" | "فضي" | "ذهبي" | "بلاتيني";
  lastVisit: string;
  notes?: string;
  walletBalance: number;
}

export type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled";

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  serviceId: string;
  serviceName: string;
  employeeId: string;
  employeeName: string;
  date: string; // ISO
  time: string; // HH:mm
  duration: number;
  price: number;
  status: BookingStatus;
  notes?: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: "percent" | "fixed";
  value: number;
  minAmount?: number;
  usageLimit: number;
  usedCount: number;
  expiresAt: string;
  active: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  minQuantity: number;
  price: number;
  supplier: string;
}

export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
}

export interface PayrollEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  baseSalary: number;
  commissions: number;
  bonuses: number;
  deductions: number;
  net: number;
  status: "paid" | "pending";
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  hours: number;
  status: "present" | "late" | "absent";
}

export interface Invoice {
  id: string;
  number: string;
  tenantId?: string;
  tenantName?: string;
  customerName?: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  date: string;
  dueDate: string;
  items?: { name: string; qty: number; price: number }[];
}

export interface SupportTicket {
  id: string;
  subject: string;
  tenantName: string;
  status: "open" | "resolved" | "escalated";
  priority: "low" | "medium" | "high";
  updatedAt: string;
  messages: number;
}

export interface Plan {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  limits: { bookings: number; employees: number; storage: string };
  popular?: boolean;
}
