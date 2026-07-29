import type { Role, User } from "@/types";

const KEY = "salon-ai:session";

export interface Session {
  user: User;
}

export const demoUsers: Record<Role, User> = {
  admin: { id: "u-admin", name: "مدير المنصة", email: "admin@salon-ai.sa", role: "admin" },
  merchant: { id: "u-merch", name: "سارة الأحمدي", email: "sara@lamsa.sa", role: "merchant", tenantId: "t1" },
  staff: { id: "u-staff", name: "أمل السلمي", email: "amal@salon.sa", role: "staff", tenantId: "t1" },
  client: { id: "u-client", name: "فاطمة الغامدي", email: "fatima@mail.com", role: "client" },
};

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch { return null; }
}

export function signInAs(role: Role): Session {
  const session: Session = { user: demoUsers[role] };
  localStorage.setItem(KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("salon-ai:session-change"));
  return session;
}

export function signOut() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("salon-ai:session-change"));
}

export const roleHomes: Record<Role, string> = {
  admin: "/admin",
  merchant: "/merchant",
  staff: "/staff",
  client: "/client",
};

export const roleLabels: Record<Role, string> = {
  admin: "مالك المنصة",
  merchant: "التاجر",
  staff: "الموظف",
  client: "العميل",
};
