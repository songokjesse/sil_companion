import { getActiveHouseAlerts } from "@/lib/actions";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Bell, Info, ShieldAlert, AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default async function StaffAlertsPage() {
  const alerts = await getActiveHouseAlerts("Maple House");

  // Helper to map severity to explicit UI styles natively
  const severityConfig = {
     CRITICAL: { icon: ShieldAlert, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-950/40", border: "border-rose-200 dark:border-rose-900/40" },
     HIGH: { icon: AlertTriangle, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-950/40", border: "border-orange-200 dark:border-orange-900/40" },
     MEDIUM: { icon: AlertCircle, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/40", border: "border-amber-200 dark:border-amber-900/40" },
     LOW: { icon: Info, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/40", border: "border-blue-200 dark:border-blue-900/40" },
  };

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-slate-50/40 dark:bg-slate-950/40">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header houseName="Maple House" />
        <div className="flex-1 overflow-y-auto min-h-0 bg-slate-50/60 dark:bg-slate-900/40">
          <main className="container mx-auto p-4 pb-28 md:p-10 md:pb-10 space-y-10 max-w-4xl animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* Title Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
               <div className="space-y-1">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-800 dark:text-slate-100">
                     Active Alerts
                  </h2>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2">
                     <Bell className="h-4 w-4 text-rose-500 dark:text-rose-400" />
                     {alerts.length} notifications • Maple House
                  </p>
               </div>
            </div>

            {/* Alerts Feed */}
            <div className="grid grid-cols-1 gap-6 mt-8">
               {alerts.map((alert: any) => {
                  const Conf = severityConfig[alert.severity as keyof typeof severityConfig] || severityConfig.MEDIUM;
                  const Icon = Conf.icon;

                  return (
                    <div key={alert.id} className={cn("flex flex-col sm:flex-row gap-4 p-6 rounded-[2rem] border transition-all shadow-sm hover:shadow-md", Conf.border, Conf.bg)}>
                       <div className="flex flex-col sm:items-center sm:justify-center shrink-0 sm:w-24">
                          <Avatar className="h-16 w-16 ring-4 ring-white/50 dark:ring-black/20 shadow-sm shrink-0">
                             <AvatarImage src={alert.participant.photoUrl || undefined} />
                             <AvatarFallback className={cn("text-xl font-black uppercase", Conf.color)}>{alert.participant.fullName[0]}</AvatarFallback>
                          </Avatar>
                       </div>

                       <div className="flex-1 flex flex-col justify-center space-y-2">
                          <div className="flex items-center gap-2">
                             <div className={cn("p-1.5 rounded-lg bg-white/50 dark:bg-black/20", Conf.color)}>
                                <Icon className="h-4 w-4" />
                             </div>
                             <span className={cn("text-[10px] font-black uppercase tracking-widest", Conf.color)}>
                                {alert.severity} SEVERITY
                             </span>
                             <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-auto">
                                {new Date(alert.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric'})}
                             </span>
                          </div>

                          <h3 className="text-lg font-black tracking-tight text-slate-800 dark:text-slate-100">
                             {alert.participant.fullName}
                          </h3>
                          <p className="text-sm font-semibold leading-relaxed text-slate-600 dark:text-slate-300">
                             {alert.message}
                          </p>
                       </div>
                    </div>
                  );
               })}

               {alerts.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
                     <div className="h-20 w-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-xl shadow-emerald-200/50 dark:shadow-none mb-2">
                        <CheckCircle className="h-10 w-10" />
                     </div>
                     <div>
                        <h3 className="text-2xl font-black text-slate-800 dark:text-slate-200 tracking-tight">All Clear</h3>
                        <p className="text-sm font-bold text-slate-500 mt-2 max-w-xs mx-auto">There are no active organizational alerts for residents in Maple House today.</p>
                     </div>
                  </div>
               )}
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
