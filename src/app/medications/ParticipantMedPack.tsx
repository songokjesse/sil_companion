"use client";

import { logMedication, logMultipleMedications } from "@/lib/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, ShieldAlert, XCircle, Beaker, CheckCheck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ParticipantMedPack({ participant, meds }: { participant: any, meds: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Derive which meds are done
  const pendingMeds = meds.filter(m => !m.logs || m.logs.length === 0);
  const completedMedsCount = meds.length - pendingMeds.length;
  const isAllSigned = pendingMeds.length === 0;
  
  const hasCritical = meds.some(m => m.isCritical);

  async function handleBulkAction(status: "DONE" | "SKIPPED") {
    if (pendingMeds.length === 0) return;
    setLoading(true);
    try {
      await logMultipleMedications(pendingMeds.map(m => m.id), participant.id, status);
      router.refresh();
    } catch(err) {
      console.error(err);
      alert("Failed to sign off group medications.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSingleAction(medId: string, status: "DONE" | "SKIPPED") {
    setLoading(true);
    try {
      await logMedication(medId, participant.id, status);
      router.refresh();
    } catch(err) {
      console.error(err);
      alert("Failed to sign off medication.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn(
       "group relative overflow-hidden rounded-[2.5rem] border bg-white dark:bg-slate-950 p-6 md:p-8 transition-all shadow-sm",
       isAllSigned ? "border-slate-100 dark:border-slate-800 opacity-60 hover:opacity-100 bg-emerald-50/10 dark:bg-slate-950/80" : "border-slate-200/60 dark:border-slate-800 shadow-slate-200/50 dark:shadow-none hover:shadow-md hover:border-purple-200 dark:hover:border-purple-900"
    )}>
       {/* Decorative Left Accent */}
       <div className={cn("absolute left-0 top-0 bottom-0 w-3 blur-sm transition-all", 
          hasCritical && !isAllSigned ? "bg-rose-500" : "bg-purple-500",
          isAllSigned && "bg-emerald-500"
       )} />

       {/* Header Section */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pl-2">
          <div className="flex items-center gap-6">
             <Avatar className="h-20 w-20 ring-4 ring-white dark:ring-slate-900 shadow-md shrink-0">
                <AvatarImage src={participant.photoUrl || undefined} />
                <AvatarFallback className="text-xl font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{participant.fullName[0]}</AvatarFallback>
             </Avatar>
             
             <div className="space-y-1">
                <h3 className={cn("text-2xl font-black tracking-tight", isAllSigned ? "text-slate-500" : "text-slate-800 dark:text-slate-100")}>
                   {participant.preferredName || participant.fullName}
                </h3>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                   {meds.length} Prescriptions • {completedMedsCount} Completed
                </p>
                {hasCritical && !isAllSigned && (
                   <div className="inline-flex mt-1 items-center gap-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      <ShieldAlert className="h-3.5 w-3.5" /> Contains Critical Meds
                   </div>
                )}
             </div>
          </div>

          {!isAllSigned && (
             <div className="flex flex-col gap-2">
                <button 
                 disabled={loading}
                 onClick={() => handleBulkAction("DONE")}
                 className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-200 dark:shadow-none transition-all active:scale-95 disabled:opacity-50 w-full md:w-auto"
                >
                   <CheckCheck className="h-5 w-5" />
                   <div className="flex flex-col items-start">
                      <span className="text-xs font-black uppercase tracking-widest leading-none">Sign Off All Remaining</span>
                      <span className="text-[10px] font-bold text-purple-200 uppercase tracking-widest mt-1">Bulk Verify {pendingMeds.length} Meds</span>
                   </div>
                </button>
             </div>
          )}
          
          {isAllSigned && (
             <div className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-emerald-200 dark:border-emerald-800/40 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-[11px] font-black uppercase tracking-widest w-full md:w-auto">
                <CheckCircle2 className="h-4 w-4" /> Routine Completed
             </div>
          )}
       </div>

       {/* Detailed Prescriptions Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {meds.map(med => {
             const hasLog = med.logs && med.logs.length > 0;
             const isCompleted = hasLog && med.logs[0].status === "DONE";
             
             return (
                <div key={med.id} className={cn(
                   "flex flex-col justify-between p-4 rounded-2xl border transition-all",
                   hasLog ? "border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40" : "border-slate-200/50 dark:border-slate-700/50 bg-white dark:bg-slate-900/80"
                )}>
                   <div className="flex justify-between items-start gap-4">
                      <div>
                         <h4 className={cn("font-black tracking-tight", hasLog ? "text-slate-500 line-through decoration-slate-300 dark:decoration-slate-700" : "text-slate-800 dark:text-slate-200")}>
                            {med.name} <span className="text-sm text-slate-400 font-bold ml-1">{med.dosage}</span>
                         </h4>
                         <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                            <Beaker className="h-3 w-3" /> Due {med.timeDue}
                         </p>
                      </div>
                      
                      {med.isCritical && !hasLog && (
                         <ShieldAlert className="h-4 w-4 text-rose-500 shrink-0 mt-1" />
                      )}
                   </div>

                   {med.instructions && !hasLog && (
                      <p className="text-xs font-semibold italic text-slate-500 dark:text-slate-400 mt-3 pl-3 border-l-[3px] border-slate-200 dark:border-slate-700 rounded-sm">
                         {med.instructions}
                      </p>
                   )}

                   <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                       {hasLog ? (
                          <div className={cn("flex px-3 py-1.5 rounded-lg border text-[9px] uppercase tracking-widest font-black w-fit",
                             isCompleted ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" : "bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800"
                          )}>
                             {isCompleted ? "Signed Off" : "Skipped"}
                          </div>
                       ) : (
                          <>
                             <button disabled={loading} onClick={() => handleSingleAction(med.id, "SKIPPED")} className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Refuse</button>
                             <button disabled={loading} onClick={() => handleSingleAction(med.id, "DONE")} className="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-emerald-500 hover:bg-emerald-600 text-white transition-colors">Sign Off</button>
                          </>
                       )}
                   </div>
                </div>
             )
          })}
       </div>
    </div>
  );
}
