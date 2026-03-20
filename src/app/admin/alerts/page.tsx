import { getAllAlertsAdmin } from "@/lib/actions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Plus, ShieldAlert, AlertCircle, Info, Trash2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function AdminAlerts() {
  const alerts = await getAllAlertsAdmin();

  const severityConfig = {
     CRITICAL: { icon: ShieldAlert, color: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950" },
     HIGH: { icon: AlertTriangle, color: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950" },
     MEDIUM: { icon: AlertCircle, color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950" },
     LOW: { icon: Info, color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950" },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100">Alert Administration</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2">
               <AlertTriangle className="h-4 w-4 text-rose-500 dark:text-rose-400" />
               Global tracking of organizational notices and participant alerts.
            </p>
         </div>
         <Link 
            href="/admin/alerts/new" 
            className="inline-flex items-center justify-center rounded-md font-bold bg-rose-600 px-4 py-2 hover:bg-rose-700 shadow-lg shadow-rose-100 dark:shadow-none text-white transition-colors text-sm"
         >
            <Plus className="h-4 w-4 mr-2" />
            Issue Alert
         </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
         <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
               <TableRow>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 py-4 px-6 h-auto w-32">Severity</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 px-6 h-auto">Resident</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 px-6 h-auto">Message</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 px-6 h-auto whitespace-nowrap">Issued On</TableHead>
                  <TableHead className="text-right"></TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {alerts.map((alert: any) => {
                  const Conf = severityConfig[alert.severity as keyof typeof severityConfig] || severityConfig.MEDIUM;
                  const Icon = Conf.icon;

                  return (
                     <TableRow key={alert.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100/50 dark:border-slate-800">
                        <TableCell className="py-4 px-6">
                           <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-current text-[9px] uppercase tracking-widest font-black", Conf.color)}>
                              <Icon className="h-3 w-3" />
                              {alert.severity}
                           </div>
                        </TableCell>
                        <TableCell className="px-6 whitespace-nowrap">
                           <div className="flex flex-col text-slate-800 dark:text-slate-100">
                              <span className="font-black text-sm tracking-tight">{alert.participant.fullName}</span>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                                 {alert.participant.house.name}
                              </span>
                           </div>
                        </TableCell>
                        <TableCell className="px-6">
                           <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 line-clamp-2 max-w-sm">
                              {alert.message}
                           </div>
                        </TableCell>
                        <TableCell className="px-6">
                           <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest whitespace-nowrap">
                              {new Date(alert.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                           </span>
                        </TableCell>
                        <TableCell className="text-right px-6">
                           <button className="p-2 hover:bg-rose-50 text-slate-300 hover:text-rose-600 dark:hover:bg-rose-950/50 dark:hover:text-rose-400 rounded-lg transition-all">
                              <Trash2 className="h-4 w-4" />
                           </button>
                        </TableCell>
                     </TableRow>
                  );
               })}
               {alerts.length === 0 && (
                  <TableRow>
                     <TableCell colSpan={5} className="py-20 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                           <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                              <AlertTriangle className="h-6 w-6 text-slate-300 dark:text-slate-600" />
                           </div>
                           <h3 className="font-black text-slate-800 dark:text-slate-200 text-lg">No active alerts</h3>
                           <p className="text-xs font-bold text-slate-400 dark:text-slate-500">The organizational ledger is clean.</p>
                        </div>
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>
      </div>
    </div>
  );
}
