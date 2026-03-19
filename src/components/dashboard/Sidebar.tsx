"use client";

import { 
  Calendar, 
  Clock, 
  LayoutDashboard, 
  Settings, 
  Users,
  BriefcaseMedical,
  ShieldCheck,
  ChevronRight,
  LogOut,
  Building2,
  HardHat,
  LayoutGrid
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar({ isAdminView = false }: { isAdminView?: boolean }) {
  const pathname = usePathname();
  const session = authClient.useSession();
  const user = session?.data?.user as any;

  const menuItems = isAdminView ? [
    { icon: LayoutGrid, label: "Admin Console", href: "/admin", active: pathname === "/admin" },
    { icon: Building2, label: "Manage Houses", href: "/admin/houses", active: pathname.startsWith("/admin/houses") },
    { icon: Users, label: "Manage Participants", href: "/admin/participants", active: pathname.startsWith("/admin/participants") },
    { icon: HardHat, label: "Staff Management", href: "/admin/users", active: pathname.startsWith("/admin/users") },
  ] : [
    { icon: LayoutDashboard, label: "Today Dashboard", href: "/", active: pathname === "/" },
    { icon: Users, label: "Participants", href: "/participants", active: pathname.startsWith("/participants") },
    { icon: BriefcaseMedical, label: "Medications", href: "/medications", active: pathname.startsWith("/medications") },
    { icon: Calendar, label: "Appointments", href: "/appointments", active: pathname.startsWith("/appointments") },
    { icon: Clock, label: "Routines", href: "/routines", active: pathname.startsWith("/routines") },
  ];

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        }
      }
    });
  };

  return (
    <aside className="sticky top-0 h-screen w-80 flex flex-col border-r border-slate-100/50 bg-slate-50/40 p-5 transition-all overflow-y-auto">
      <div className="flex items-center gap-3 mb-8 ml-3">
        <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-purple-600 shadow-lg shadow-purple-200">
          <ShieldCheck className="h-6 w-6 text-white" />
        </div>
        <div>
           <h2 className="text-xl font-black tracking-tight text-slate-800 leading-none">SIL<span className="text-purple-600">Companion</span></h2>
           {isAdminView && <span className="text-[10px] font-black uppercase text-purple-600 tracking-widest mt-1 block">Admin Console</span>}
        </div>
      </div>

      <nav className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2 px-3">
           {isAdminView ? "Admin Controls" : "Main Menu"}
        </p>
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all hover:bg-slate-100/80 active:scale-[0.98]",
              item.active ? "bg-white shadow-sm shadow-slate-200/50 border border-slate-200/60 text-slate-800" : "text-slate-600 border border-transparent"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5 transition-colors",
              item.active ? "text-purple-600" : "text-slate-400 group-hover:text-slate-600"
            )} />
            {item.label}
            {item.active && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-600" />}
          </Link>
        ))}

        {user?.role === "ADMIN" && !isAdminView && (
           <Link
             href="/admin"
             className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-black text-purple-600 hover:bg-purple-50 transition-all mt-4 border border-purple-100 border-dashed"
           >
             <Settings className="h-5 w-5" />
             Switch to Admin Mode
           </Link>
        )}
        
        {isAdminView && (
           <Link
             href="/"
             className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-black text-slate-600 hover:bg-white hover:shadow-sm hover:border-slate-200 transition-all mt-4 border border-slate-200 border-dashed"
           >
             <LayoutDashboard className="h-5 w-5" />
             Exit Admin Mode
           </Link>
        )}
      </nav>

      {/* Footer Items */}
      <div className="mt-auto pt-6">
        <Separator className="mb-4 opacity-50" />
        <button className="group flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-primary">
          <Settings className="h-5 w-5 transition-transform group-hover:rotate-45" />
          General Settings
        </button>
        <button 
           onClick={handleSignOut}
           className="group flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-bold text-destructive/80 transition-all hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
