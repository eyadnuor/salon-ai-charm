import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { RoleSwitcher } from "@/components/layout/RoleSwitcher";
import { NotFoundPage } from "@/components/layout/NotFoundPage";

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">حدث خطأ غير متوقع</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          نعتذر عن الإزعاج، حاول تحديث الصفحة أو العودة للرئيسية.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            حاول مرة أخرى
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            الرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "صالون AI — منصة إدارة الصالونات ومراكز التجميل بالذكاء الاصطناعي" },
      { name: "description", content: "أدر صالونك بذكاء: حجوزات فورية، CRM كامل، محفظة ونقاط ولاء، مدفوعات، ومساعد AI عربي — جرّب مجاناً." },
      { name: "author", content: "Salon AI" },
      { property: "og:title", content: "صالون AI — منصة إدارة الصالونات ومراكز التجميل بالذكاء الاصطناعي" },
      { property: "og:description", content: "أدر صالونك بذكاء: حجوزات فورية، CRM كامل، محفظة ونقاط ولاء، مدفوعات، ومساعد AI عربي — جرّب مجاناً." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "صالون AI — منصة إدارة الصالونات ومراكز التجميل بالذكاء الاصطناعي" },
      { name: "twitter:description", content: "أدر صالونك بذكاء: حجوزات فورية، CRM كامل، محفظة ونقاط ولاء، مدفوعات، ومساعد AI عربي — جرّب مجاناً." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f6d4523f-295f-49ea-aad6-8cca8a4b207a/id-preview-344a8621--fd08413d-3ece-4c2e-bb0d-4f11f0f54fa4.lovable.app-1785334055561.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f6d4523f-295f-49ea-aad6-8cca8a4b207a/id-preview-344a8621--fd08413d-3ece-4c2e-bb0d-4f11f0f54fa4.lovable.app-1785334055561.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&display=swap" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <RoleSwitcher />
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}
