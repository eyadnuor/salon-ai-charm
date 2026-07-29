import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/MarketingShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "سياسة الخصوصية — صالون AI" },
      { name: "description", content: "كيف نجمع بياناتك ونحميها." },
      { property: "og:title", content: "سياسة الخصوصية" },
      { property: "og:description", content: "خصوصية بياناتك." },
    ],
  }),
  component: () => (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-black">سياسة الخصوصية</h1>
        <p className="mt-4 text-muted-foreground">آخر تحديث: يوليو 2026</p>
        <div className="mt-6 space-y-4 text-sm leading-relaxed">
          <p>نحن في «صالون AI» نلتزم بحماية بياناتك وبيانات عملائك. تُخزَّن جميع البيانات بشكل مشفّر مع عزل تام بين المتاجر.</p>
          <h2 className="font-bold text-lg">البيانات التي نجمعها</h2>
          <p>معلومات الحساب، الحجوزات، بيانات الفوترة، وسجل الاستخدام لتحسين الخدمة.</p>
          <h2 className="font-bold text-lg">استخدام البيانات</h2>
          <p>نستخدم البيانات لتقديم الخدمة، إرسال الإشعارات، وتحسين المنتج. لا نبيع بياناتك لأي طرف ثالث.</p>
          <h2 className="font-bold text-lg">حقوقك</h2>
          <p>يمكنك طلب نسخة من بياناتك أو حذفها في أي وقت عبر التواصل معنا.</p>
        </div>
      </article>
    </MarketingShell>
  ),
});
