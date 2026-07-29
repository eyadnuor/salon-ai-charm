import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AuthShell } from "@/components/auth/AuthShell";
import { signInAs, roleHomes, roleLabels } from "@/lib/auth";
import type { Role } from "@/types";
import { toast } from "sonner";
import { ShieldCheck, Store, UserCog, Users } from "lucide-react";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "تسجيل الدخول — صالون AI" }, { name: "description", content: "دخول لحسابك في صالون AI." }] }),
  component: Login,
});

const demoAccounts: { role: Role; icon: typeof Store }[] = [
  { role: "admin", icon: ShieldCheck },
  { role: "merchant", icon: Store },
  { role: "staff", icon: UserCog },
  { role: "client", icon: Users },
];

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("sara@lamsa.sa");
  const [password, setPassword] = useState("demo1234");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    signInAs("merchant");
    toast.success("مرحباً بعودتك 👋");
    navigate({ to: "/merchant" });
  };

  const demoLogin = (role: Role) => {
    signInAs(role);
    toast.success(`دخلت بحساب تجريبي: ${roleLabels[role]}`);
    navigate({ to: roleHomes[role] });
  };

  return (
    <AuthShell
      title="أهلاً بعودتك"
      subtitle="سجّل الدخول للوصول إلى لوحتك"
      footer={<>ليس لديك حساب؟ <Link to="/auth/register" className="text-primary font-bold">أنشئ حساباً</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        <div className="grid gap-2">
          <Label>البريد الإلكتروني</Label>
          <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label>كلمة المرور</Label>
            <Link to="/auth/forgot" className="text-xs text-primary hover:underline">نسيت كلمة المرور؟</Link>
          </div>
          <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" className="w-full bg-gradient-brand">تسجيل الدخول</Button>
      </form>
      <Card className="mt-6 p-4 bg-muted/40">
        <div className="text-xs font-bold text-center mb-3">دخول سريع بحسابات تجريبية</div>
        <div className="grid grid-cols-2 gap-2">
          {demoAccounts.map(({ role, icon: Icon }) => (
            <Button key={role} variant="outline" size="sm" onClick={() => demoLogin(role)} className="justify-start">
              <Icon className="ml-2 h-4 w-4" /> {roleLabels[role]}
            </Button>
          ))}
        </div>
      </Card>
    </AuthShell>
  );
}
