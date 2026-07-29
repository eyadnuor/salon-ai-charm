import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/auth/AuthShell";
import { signInAs } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/register")({
  head: () => ({ meta: [{ title: "إنشاء حساب — صالون AI" }, { name: "description", content: "أنشئ حساب تجريبي مجاني لصالونك." }] }),
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  return (
    <AuthShell
      title="ابدأ تجربتك المجانية"
      subtitle="14 يوماً مجاناً بكل المزايا"
      footer={<>لديك حساب؟ <Link to="/auth/login" className="text-primary font-bold">سجّل الدخول</Link></>}
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          signInAs("merchant");
          toast.success("تم إنشاء حسابك، مرحباً بك في صالون AI!");
          navigate({ to: "/merchant" });
        }}
      >
        <div className="grid gap-2"><Label>اسم الصالون</Label><Input required placeholder="مثال: صالون لمسة أنثى" /></div>
        <div className="grid gap-2"><Label>اسمك الكامل</Label><Input required /></div>
        <div className="grid gap-2"><Label>البريد الإلكتروني</Label><Input required type="email" /></div>
        <div className="grid gap-2"><Label>الجوال</Label><Input required type="tel" placeholder="+966 5X XXX XXXX" /></div>
        <div className="grid gap-2"><Label>كلمة المرور</Label><Input required type="password" /></div>
        <Button className="w-full bg-gradient-brand">إنشاء الحساب</Button>
      </form>
    </AuthShell>
  );
}
