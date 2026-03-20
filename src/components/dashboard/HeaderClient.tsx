"use client";

import { Bell, Search, ShieldAlert, AlertTriangle, AlertCircle, Info, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface HeaderClientProps {
   houseName?: string;
   alerts: any[];
}

export function HeaderClient({ houseName = "Maple House", alerts }: HeaderClientProps) {
  const severityConfig = {
     CRITICAL: { icon: ShieldAlert, color: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/50" },
     HIGH: { icon: AlertTriangle, color: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-900/50" },
     MEDIUM: { icon: AlertCircle, color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/50" },
     LOW: { icon: Info, color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/50" },
  };
  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-slate-100 dark:border-slate-800/50/50 bg-white dark:bg-slate-950/70 px-8 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100">SIL Companion</h1>
        <div className="hidden h-5 w-px bg-slate-200 sm:block" />
        <p className="hidden text-xs font-bold uppercase tracking-widest text-slate-400 sm:block">
          {houseName} View
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative hidden w-[320px] lg:block group">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
          <input
            type="search"
            placeholder="Search tasks, staff, or residents..."
            className="h-10 w-full rounded-full border border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/50 px-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition-all placeholder:text-slate-400"
          />
        </div>
        
        <Popover>
          <PopoverTrigger render={
            <button className="relative rounded-full p-2.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-900 dark:hover:text-slate-300 transition-colors">
              <Bell className="h-5 w-5" />
              {alerts.length > 0 && (
                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-destructive ring-2 ring-white dark:ring-slate-950 animate-pulse" />
              )}
            </button>
          } />
          <PopoverContent align="end" className="w-[380px] p-0 rounded-[1.5rem] shadow-xl border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800/60">
               <h4 className="font-black text-sm text-slate-800 dark:text-slate-100 uppercase tracking-widest">Notifications</h4>
               <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-2.5 py-1 rounded-full">{alerts.length}</span>
            </div>
            
            <div className="max-h-[350px] overflow-y-auto">
               {alerts.length === 0 ? (
                  <div className="p-8 text-center text-sm font-bold text-slate-400 dark:text-slate-500 flex flex-col items-center gap-3">
                     <Bell className="h-8 w-8 text-slate-200 dark:text-slate-800" />
                     All caught up!
                  </div>
               ) : (
                  <div className="flex flex-col">
                     {alerts.slice(0, 5).map((alert) => {
                        const Conf = severityConfig[alert.severity as keyof typeof severityConfig] || severityConfig.MEDIUM;
                        const Icon = Conf.icon;
                        return (
                           <div key={alert.id} className={cn("p-4 border-b border-slate-100 dark:border-slate-800/40 flex gap-3 items-start", Conf.color.includes('bg-') ? Conf.color.split(' ').find(c => c.startsWith('hover:bg-')) : "hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors")}>
                              <div className={cn("p-2 rounded-xl mt-0.5 border", Conf.color)}>
                                 <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex flex-col gap-1">
                                 <h5 className="font-black text-xs text-slate-800 dark:text-slate-100 leading-tight">
                                    {alert.participant.fullName} - {alert.severity}
                                 </h5>
                                 <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 line-clamp-2">
                                    {alert.message}
                                 </p>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               )}
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800/60">
               <Link href="/alerts" className="flex items-center justify-center gap-2 w-full text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 p-2 transition-colors">
                  View Full Inbox <ExternalLink className="h-3 w-3" />
               </Link>
            </div>
          </PopoverContent>
        </Popover>

        <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-white shadow-sm">
          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&dpr=2" />
          <AvatarFallback className="bg-purple-100 text-purple-700 font-bold">SW</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
