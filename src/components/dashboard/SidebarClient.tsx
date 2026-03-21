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
  LayoutGrid,
  ListChecks,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isAdminView?: boolean;
  medicationsEnabled?: boolean;
  userHouses?: any[];
}

export function SidebarClient({ isAdminView = false, medicationsEnabled = true, userHouses = [] }: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentHouse = searchParams.get('house');
  const session = authClient.useSession();
  const user = session?.data?.user as any;
  const [isOpen, setIsOpen] = useState(false);
  const [showHouses, setShowHouses] = useState(false);

  const adminNavItems = [
    { icon: LayoutGrid, label: "Admin Console", href: "/admin", active: pathname === "/admin" },
    { icon: Building2, label: "Manage Houses", href: "/admin/houses", active: pathname.startsWith("/admin/houses") },
    { icon: Users, label: "Manage Participants", href: "/admin/participants", active: pathname.startsWith("/admin/participants") },
    ...(medicationsEnabled ? [{ icon: BriefcaseMedical, label: "Manage Medications", href: "/admin/medications", active: pathname.startsWith("/admin/medications") }] : []),
    { icon: Calendar, label: "Manage Appointments", href: "/admin/appointments", active: pathname.startsWith("/admin/appointments") },
    { icon: ListChecks, label: "Manage Routines", href: "/admin/routines", active: pathname.startsWith("/admin/routines") },
    { icon: AlertTriangle, label: "Manage Alerts", href: "/admin/alerts", active: pathname.startsWith("/admin/alerts") },
    { icon: HardHat, label: "Staff Management", href: "/admin/users", active: pathname.startsWith("/admin/users") },
  ];

  const staffNavItems = [
    { icon: LayoutDashboard, label: "Today Dashboard", href: "/", active: pathname === "/" },
    { icon: Users, label: "Participants", href: "/participants", active: pathname.startsWith("/participants") },
    ...(medicationsEnabled ? [{ icon: BriefcaseMedical, label: "Medications", href: "/medications", active: pathname.startsWith("/medications") }] : []),
    { icon: Calendar, label: "Appointments", href: "/appointments", active: pathname.startsWith("/appointments") },
    { icon: Clock, label: "Routines", href: "/routines", active: pathname.startsWith("/routines") },
  ];

  const menuItems = isAdminView ? adminNavItems : staffNavItems;

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
    <aside className="hidden md:flex sticky top-0 h-screen w-64 flex-col border-r border-slate-200/40 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl p-5 transition-all z-40">
      {/* Compact Brand Section */}
      <div className="flex items-center gap-3.5 mb-8 px-1 mt-1">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-500" />
          <div className="relative h-9 w-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/10">
            <ShieldCheck className="h-5 w-5 text-white stroke-[2.5]" />
          </div>
        </div>
        <div className="flex flex-col">
           <h2 className="text-lg font-[900] tracking-tight text-slate-900 dark:text-slate-100 leading-none">SIL<span className="text-purple-600 dark:text-purple-500">Companion</span></h2>
           <span className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mt-1 block">Support Portal</span>
        </div>
      </div>

      {/* House Switcher */}
      {userHouses.length > 1 && (
        <div className="mb-6 px-1">
          <button 
            onClick={() => setShowHouses(!showHouses)}
            className="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-200/50 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/50">
                <Building2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex flex-col items-start truncate">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Active Hub</span>
                <span className="text-[11px] font-black text-slate-900 dark:text-slate-100 uppercase truncate">
                  {currentHouse || userHouses[0]?.name || "Select Hub"}
                </span>
              </div>
            </div>
            <ChevronRight className={cn("h-4 w-4 text-slate-400 transition-transform", showHouses && "rotate-90")} />
          </button>

          <AnimatePresence>
            {showHouses && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 p-2 rounded-2xl border border-slate-200/50 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-xl space-y-1"
              >
                {userHouses.map((house) => (
                  <Link
                    key={house.id}
                    href={`/?house=${encodeURIComponent(house.name)}`}
                    onClick={() => setShowHouses(false)}
                    className={cn(
                      "flex items-center gap-3 p-2.5 rounded-xl text-[11px] font-black uppercase tracking-tight transition-all",
                      (currentHouse === house.name || (!currentHouse && house.name === userHouses[0]?.name))
                        ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border border-purple-100/50 dark:border-purple-800/50"
                        : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900/50"
                    )}
                  >
                    <Building2 className="h-3.5 w-3.5" />
                    {house.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <nav className="flex-1 space-y-1">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400/70 mb-3 px-3">Interface</p>
        
        <div className="space-y-0.5">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "group flex w-full items-center gap-3 rounded-[1rem] px-4 py-3 text-[12px] font-bold transition-all active:scale-[0.98]",
                item.active 
                  ? "bg-white dark:bg-slate-900 shadow-md shadow-slate-200/20 dark:shadow-none border border-slate-200/50 dark:border-slate-800 text-slate-900 dark:text-slate-100" 
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100/40 dark:hover:bg-slate-800/30 border border-transparent"
              )}
            >
              <item.icon className={cn(
                "h-4.5 w-4.5 transition-colors",
                item.active ? "text-purple-600 dark:text-purple-400 stroke-[2.5]" : "text-slate-400 group-hover:text-purple-500 dark:group-hover:text-purple-400"
              )} />
              {item.label}
              {item.active && (
                <div className="ml-auto w-1 h-3 rounded-full bg-purple-500" />
              )}
            </Link>
          ))}
        </div>

        {user?.role === "ADMIN" && (
           <div className="pt-4 mt-4 border-t border-slate-100/50 dark:border-slate-800/30">
             <Link
               href={isAdminView ? "/" : "/admin"}
               className={cn(
                 "group flex w-full h-12 items-center gap-3 rounded-[1rem] px-4 text-[12px] font-black transition-all active:scale-[0.98] border",
                 isAdminView 
                    ? "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600" 
                    : "bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/10 hover:bg-purple-700"
               )}
             >
               {isAdminView ? (
                 <>
                   <LayoutDashboard className="h-4.5 w-4.5" />
                   Exit Manager
                 </>
               ) : (
                 <>
                   <Settings className="h-4.5 w-4.5 group-hover:rotate-45 transition-transform" />
                   Manager Mode
                 </>
               )}
             </Link>
           </div>
        )}
      </nav>

      {/* Footer Section */}
      <div className="pt-6 border-t border-slate-100/50 dark:border-slate-800/30">
        <div className="space-y-0.5">
          <button className="group flex w-full items-center gap-3 rounded-[1rem] px-4 py-2.5 text-[12px] font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-all hover:bg-slate-100/40 dark:hover:bg-slate-800/30">
            <Settings className="h-4.5 w-4.5 text-slate-400" />
            Config
          </button>
          <button 
             onClick={handleSignOut}
             className="group flex w-full items-center gap-3 rounded-[1rem] px-4 py-2.5 text-[12px] font-bold text-rose-500/80 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/10 transition-all"
          >
            <LogOut className="h-4.5 w-4.5" />
            Sign Out
          </button>
        </div>
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
