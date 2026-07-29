import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-soft px-4">
      <div className="max-w-md text-center">
        <div className="text-8xl font-black bg-gradient-brand bg-clip-text text-transparent">404</div>
        <h1 className="mt-4 text-2xl font-bold">الصفحة غير موجودة</h1>
        <p className="mt-2 text-muted-foreground">
          لم نتمكن من العثور على الصفحة التي تبحث عنها.
        </p>
        <Button asChild className="mt-6">
          <Link to="/"><Home className="ml-2 h-4 w-4" /> العودة للرئيسية</Link>
        </Button>
      </div>
    </div>
  );
}
