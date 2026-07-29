import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/auth/AuthShell";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/forgot")({
  head: () => ({ meta: [{ title: "استعادة كلمة المرور — صالون AI" }, { name: "description", content: "استعد كلمة المرور الخاصة بحسابك." }] }),
  component: () => (
    <AuthShell
      title="نسيت كلمة المرور؟"
      subtitle="أدخل بريدك وسنرسل لك رابط إعادة تعيين"
      footer={<Link to="/auth/login" className="text-primary font-bold">العودة لتسجيل الدخول</Link>}
    >
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("تم إرسال الرابط إلى بريدك"); }}>
        <div className="grid gap-2"><Label>البريد الإلكتروني</Label><Input type="email" required /></div>
        <Button className="w-full bg-gradient-brand">إرسال الرابط</Button>
      </form>
    </AuthShell>
  ),
});
