
# خطة «صالون AI» — SaaS عربي RTL متعدد المستأجرين

نظراً لضخامة الطلب، سأبنيه على مرحلتين لضمان الجودة. أنتظر موافقتك قبل التنفيذ.

## نطاق المرحلة الأولى (هذه الجلسة)

### الأساس التقني
- إعداد RTL كامل (`dir="rtl"`, `lang="ar"`) وخط Tajawal عبر `<link>` في `__root.tsx`.
- نظام تصميم فاخر: بنفسجي داكن + وردي هادئ، ألوان oklch في `styles.css`، ظلال وتدرجات دلالية.
- طبقة `src/services/` مع mock data عربية واقعية + types مركزية في `src/types/`، جاهزة للاستبدال لاحقاً بـ Lovable Cloud.
- Zustand/Context بسيط لحالة الدور والمصادقة الوهمية + `localStorage`.
- Role switcher عائم ظاهر في كل الصفحات للتنقل السريع بين اللوحات الأربع.

### الموقع التسويقي (`/`)
- Hero، مزايا، كيف تعمل، لقطات، آراء، أسئلة شائعة، CTA.
- `/pricing` بثلاث باقات ومقارنة شهري/سنوي.
- `/about`, `/contact`, `/terms`, `/privacy`.
- `/auth/login`, `/auth/register`, `/auth/forgot`, `/auth/role-select` مع أزرار «دخول تجريبي» لكل دور.

### لوحة مالك المنصة `/admin/*`
- Layout مع Sidebar قابلة للطي + topbar + بحث + إشعارات.
- Overview مع KPIs ورسوم (Recharts): MRR/ARR، تجار، اشتراكات، churn، إيرادات.
- التجار، الخطط والكوبونات، الاشتراكات/الفواتير، الدعم، AI Support، الإعدادات.

### لوحة التاجر `/merchant/*`
- Dashboard، الحجوزات (تقويم+قائمة)، العملاء (CRM)، الموظفون، الخدمات، المخزون، المحافظ، الكوبونات، الولاء، الحسابات، الرواتب، الحضور، المدفوعات، الاشتراك، إعدادات المتجر (محرر ألوان/شعار/slug/ساعات)، إعادة ضبط المصنع.

### لوحة الموظف `/staff/*`
- ملخص، حجوزاتي، تقويم، حضور/انصراف، عملائي، عمولاتي، الإجازات، الملف الشخصي.

### لوحة العميل `/client/*`
- استكشاف المتجر، flow حجز (خدمة → موظف → موعد → تأكيد)، حجوزاتي، محفظة، كوبونات، نقاط، فواتير، ملف شخصي.
- Widget مساعد AI عربي عائم بردود mock ذكية + قاعدة معرفة وهمية + خيار «تحدث مع موظف».

### مكونات مشتركة
- `AppShell` (Sidebar + Topbar + Breadcrumbs)، `KpiCard`, `DataTable`, `EmptyState`, `LoadingState`, `Toaster`, dialogs.
- صفحة 404 موجودة أصلاً.
- Route guards شكلية بحسب الدور من `localStorage`.

## ملاحظات صريحة (افتراضات)
1. **بدون Lovable Cloud الآن**: كل شيء mock مع طبقة services معزولة. أستطيع تفعيل Cloud لاحقاً لربط auth/DB حقيقيين.
2. **حجم المشروع ضخم جداً**: سأبني كل اللوحات لكن بعض الصفحات الفرعية (مثل تفاصيل موظف/عميل/فاتورة) ستكون واجهات كاملة مع تفاصيل mock لكن قد لا تحتوي كل الحقول الدقيقة — تُستكمل في جولات لاحقة عند الطلب.
3. **المدفوعات**: واجهات إعداد فقط، بدون مفاتيح حقيقية أو تكامل فعلي.
4. **AI Assistant**: ردود قواعدية عربية على الكلمات المفتاحية، بدون استدعاء LLM. يمكن ربطه بـ Lovable AI Gateway لاحقاً.
5. **Role switcher**: زر عائم واضح في الأسفل يمرّر بين الأدوار الأربعة فوراً.

## البنية

```text
src/
├── routes/
│   ├── __root.tsx (RTL + Tajawal)
│   ├── index.tsx (marketing home)
│   ├── pricing.tsx, about.tsx, contact.tsx, terms.tsx, privacy.tsx
│   ├── auth/login.tsx, register.tsx, forgot.tsx, role-select.tsx
│   ├── admin/ (super admin)
│   ├── merchant/ (tenant)
│   ├── staff/
│   └── client/
├── components/
│   ├── ui/ (shadcn)
│   ├── layout/ (AppShell, Sidebar, Topbar, RoleSwitcher)
│   ├── marketing/, dashboard/, booking/, ai-chat/
├── services/ (tenants, bookings, customers, ... — mock now)
├── data/ (mock arabic seed)
├── types/
├── lib/auth.ts (mock session)
└── styles.css
```

## بعد الموافقة
سأبدأ التنفيذ فوراً بموجات متوازية من ملفات، ثم أشغّل build + فحص بصري بـ Playwright على المسارات الرئيسية.

هل أبدأ؟ أو تفضّل أن أضيّق النطاق (مثلاً: التسويق + لوحتين فقط في البداية)؟
