import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/MarketingShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "الشروط والأحكام — صالون AI" },
      { name: "description", content: "شروط استخدام منصة صالون AI." },
      { property: "og:title", content: "الشروط والأحكام" },
      { property: "og:description", content: "شروط استخدام المنصة." },
    ],
  }),
  component: () => (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-4 py-16 prose prose-neutral">
        <h1 className="text-4xl font-black">الشروط والأحكام</h1>
        <p className="mt-4 text-muted-foreground">آخر تحديث: يوليو 2026</p>
        <div className="mt-6 space-y-4 text-sm leading-relaxed">
          <p>باستخدامك منصة «صالون AI» فإنك توافق على هذه الشروط والأحكام. تُقدَّم الخدمة كما هي، ونحتفظ بالحق في تعديل المزايا والأسعار بإشعار مسبق.</p>
          <h2 className="font-bold text-lg">الحساب</h2>
          <p>أنت مسؤول عن الحفاظ على سرية بيانات دخولك وعن جميع الأنشطة التي تتم عبر حسابك.</p>
          <h2 className="font-bold text-lg">الاشتراكات</h2>
          <p>تُجدَّد الاشتراكات تلقائياً ما لم يتم إلغاؤها قبل تاريخ التجديد. لا يتم استرداد المبالغ عن الأشهر غير المكتملة.</p>
          <h2 className="font-bold text-lg">الاستخدام المقبول</h2>
          <p>يُمنع استخدام المنصة لأي غرض غير قانوني أو ينتهك حقوق الآخرين.</p>
          <h2 className="font-bold text-lg">إخلاء المسؤولية</h2>
          <p>لا نتحمل مسؤولية الأضرار غير المباشرة الناتجة عن استخدام المنصة.</p>
        </div>
      </article>
    </MarketingShell>
  ),
});
