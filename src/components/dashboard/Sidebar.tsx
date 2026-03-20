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
    { icon: BriefcaseMedical, label: "Manage Medications", href: "/admin/medications", active: pathname.startsWith("/admin/medications") },
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
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex sticky top-0 h-screen w-80 flex-col border-r border-slate-200/50 bg-slate-50/50 dark:bg-slate-950/50 dark:border-slate-800/50 p-5 transition-all overflow-y-auto z-40">
      <div className="flex items-center gap-3 mb-8 ml-3">
        <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-purple-600 shadow-lg shadow-purple-200">
          <ShieldCheck className="h-6 w-6 text-white" />
        </div>
        <div>
           <h2 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100 leading-none">SIL<span className="text-purple-600 dark:text-purple-400">Companion</span></h2>
           {isAdminView && <span className="text-[10px] font-black uppercase text-purple-600 dark:text-purple-400 tracking-widest mt-1 block">Admin Console</span>}
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
              "group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all hover:bg-slate-100/80 dark:hover:bg-slate-800/50 active:scale-[0.98]",
              item.active ? "bg-white dark:bg-slate-900 shadow-sm shadow-slate-200/50 dark:shadow-none border border-slate-200/60 dark:border-slate-800 text-slate-800 dark:text-slate-100" : "text-slate-600 dark:text-slate-400 border border-transparent"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5 transition-colors",
              item.active ? "text-purple-600 dark:text-purple-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"
            )} />
            {item.label}
            {item.active && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-600 dark:bg-purple-400" />}
          </Link>
        ))}

        {user?.role === "ADMIN" && !isAdminView && (
           <Link
             href="/admin"
             className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-black text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all mt-4 border border-purple-100 dark:border-purple-900/30 border-dashed"
           >
             <Settings className="h-5 w-5" />
             Switch to Admin Mode
           </Link>
        )}
        
        {isAdminView && (
           <Link
             href="/"
             className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-black text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm hover:border-slate-200 dark:hover:border-slate-700 transition-all mt-4 border border-slate-200 dark:border-slate-800 border-dashed"
           >
             <LayoutDashboard className="h-5 w-5" />
             Exit Admin Mode
           </Link>
        )}
      </nav>

      {/* Footer Items */}
      <div className="mt-auto pt-6">
        <Separator className="mb-4 opacity-50 dark:opacity-20" />
        <button className="group flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 transition-all hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200">
          <Settings className="h-5 w-5 transition-transform group-hover:rotate-45" />
          General Settings
        </button>
        <button 
           onClick={handleSignOut}
           className="group flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-bold text-rose-600/80 dark:text-rose-500/80 transition-all hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-700 dark:hover:text-rose-400"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>

    {/* Mobile Bottom Navigation */}
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/60 pb-safe shadow-lg flex justify-around px-2 py-3 backdrop-blur-xl bg-white/90 dark:bg-slate-950/90">
      {menuItems.slice(0, 4).map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={cn(
            "flex flex-col items-center justify-center p-2 rounded-xl transition-all",
            item.active ? "text-purple-600 dark:text-purple-400" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
          )}
        >
          <item.icon className={cn("h-6 w-6 mb-1", item.active && "fill-purple-50 dark:fill-purple-900/30")} />
          <span className="text-[9px] font-black uppercase tracking-tight">{item.label.split(' ')[0]}</span>
        </Link>
      ))}
      <button onClick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')} className="flex flex-col items-center justify-center p-2 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-all">
         <Settings className="h-6 w-6 mb-1" />
         <span className="text-[9px] font-black uppercase tracking-tight">More</span>
      </button>

      {/* Flyout Mobile Menu for 'More' */}
      <div id="mobile-menu" className="hidden absolute bottom-full left-0 right-0 bg-white dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/60 p-4 shadow-xl rounded-t-3xl border-b backdrop-blur-3xl animate-in slide-in-from-bottom-5">
         <div className="space-y-2">
            {menuItems.slice(4).map((item) => (
               <Link
               key={item.label}
               href={item.href}
               className={cn(
                 "flex items-center gap-3 p-4 rounded-xl font-bold transition-all",
                 item.active ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300" : "bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300"
               )}
             >
               <item.icon className="h-5 w-5" />
               {item.label}
             </Link>
            ))}
            
            {user?.role === "ADMIN" && !isAdminView && (
               <Link href="/admin" className="flex items-center gap-3 p-4 rounded-xl font-bold text-purple-600 dark:text-purple-400 bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30 border-dashed">
                 <Settings className="h-5 w-5" />
                 Switch to Admin Mode
               </Link>
            )}

            {isAdminView && (
               <Link href="/" className="flex items-center gap-3 p-4 rounded-xl font-bold text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 border-dashed">
                 <LayoutDashboard className="h-5 w-5" />
                 Exit Admin Mode
               </Link>
            )}

            <button onClick={handleSignOut} className="flex items-center gap-3 w-full p-4 rounded-xl font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all">
               <LogOut className="h-5 w-5" />
               Sign Out
            </button>
         </div>
      </div>
    </nav>
    </>
  );
}
