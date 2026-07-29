import { useEffect, type ReactNode } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Bell, Search, LogOut, Menu, ChevronLeft, Sparkles } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
  SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navByRole } from "./nav-config";
import { useSession } from "@/hooks/use-session";
import { signOut, roleLabels, roleHomes } from "@/lib/auth";
import type { Role } from "@/types";
import { cn } from "@/lib/utils";

interface AppShellProps {
  role: Role;
  children: ReactNode;
}

export function AppShell({ role, children }: AppShellProps) {
  const { session, hydrated } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (hydrated && (!session || session.user.role !== role)) {
      // In demo mode, auto-sign-in as the role (avoids friction)
      import("@/lib/auth").then(({ signInAs }) => signInAs(role));
    }
  }, [hydrated, session, role]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        <AppSidebar role={role} />
        <div className="flex flex-1 flex-col min-w-0">
          <Topbar role={role} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function AppSidebar({ role }: { role: Role }) {
  const items = navByRole[role];
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  // group items
  const groups = items.reduce<Record<string, typeof items>>((acc, item) => {
    const g = item.group ?? "التنقل";
    (acc[g] = acc[g] ?? []).push(item);
    return acc;
  }, {});

  return (
    <Sidebar collapsible="icon" side="right">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="truncate text-sm font-black">صالون AI</div>
              <div className="truncate text-[10px] text-muted-foreground">{roleLabels[role]}</div>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {Object.entries(groups).map(([group, list]) => (
          <SidebarGroup key={group}>
            {!collapsed && <SidebarGroupLabel>{group}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {list.map((item) => {
                  const active = path === item.url || (item.url !== roleHomes[role] && path.startsWith(item.url));
                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                        <Link to={item.url} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4 shrink-0" />
                          {!collapsed && <span className="truncate">{item.title}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        {!collapsed && (
          <div className="px-2 py-2 text-[10px] text-muted-foreground">
            © {new Date().getFullYear()} صالون AI
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

function Topbar({ role }: { role: Role }) {
  const { session } = useSession();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const items = navByRole[role];
  const current = items.find((i) => path === i.url) ?? items.find((i) => path.startsWith(i.url));
  const initials = session?.user.name.split(" ").map((s) => s[0]).slice(0, 2).join("") ?? "؟";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-card/80 px-4 backdrop-blur">
      <SidebarTrigger className="shrink-0" />
      <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground min-w-0">
        <Link to="/" className="hover:text-foreground">الرئيسية</Link>
        <ChevronLeft className="h-3 w-3" />
        <span className="text-foreground font-medium truncate">{current?.title ?? roleLabels[role]}</span>
      </div>
      <div className="flex-1" />
      <div className="relative hidden sm:block w-56 lg:w-72">
        <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="بحث عام..." className="pr-8" />
      </div>
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-4 w-4" />
        <Badge className="absolute -top-1 -left-1 h-4 min-w-4 rounded-full px-1 text-[9px]">3</Badge>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-full p-1 pl-3 hover:bg-muted">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-brand text-primary-foreground text-xs font-bold">{initials}</AvatarFallback>
            </Avatar>
            <div className="hidden md:block text-right leading-tight">
              <div className="text-xs font-bold">{session?.user.name ?? "زائر"}</div>
              <div className="text-[10px] text-muted-foreground">{roleLabels[role]}</div>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuLabel>حسابي</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate({ to: "/auth/role-select" })}>
            تبديل الدور
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => { signOut(); navigate({ to: "/" }); }}
            className="text-destructive"
          >
            <LogOut className="ml-2 h-4 w-4" /> تسجيل الخروج
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
