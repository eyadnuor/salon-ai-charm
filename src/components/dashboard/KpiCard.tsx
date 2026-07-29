import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: { value: string; up?: boolean };
  accent?: "primary" | "success" | "warning" | "destructive";
}

export function KpiCard({ label, value, icon, trend, accent = "primary" }: KpiCardProps) {
  const accents = {
    primary: "from-primary to-primary-glow",
    success: "from-emerald-500 to-teal-500",
    warning: "from-amber-500 to-orange-500",
    destructive: "from-rose-500 to-red-500",
  };
  return (
    <Card className="relative overflow-hidden p-5 shadow-soft transition-shadow hover:shadow-elegant">
      <div className={cn("absolute -left-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br opacity-10", accents[accent])} />
      <div className="flex items-center justify-between">
        <div className={cn("grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-soft", accents[accent])}>
          {icon}
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold",
            trend.up ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700",
          )}>
            {trend.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trend.value}
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="text-2xl font-black tracking-tight">{value}</div>
        <div className="mt-1 text-xs text-muted-foreground">{label}</div>
      </div>
    </Card>
  );
}
