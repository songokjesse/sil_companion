"use client";

import { logMedication } from "@/lib/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pill, CheckCircle2, Clock, ShieldAlert, XCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function MedicationClientList({ medication }: { medication: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // A generic check if a task log with DONE or SKIPPED already exists today
  const hasLog = medication.logs && medication.logs.length > 0;
  const isCompleted = hasLog && medication.logs[0].status === "DONE";
  const isSkipped = hasLog && medication.logs[0].status === "SKIPPED";

  async function handleAction(status: "DONE" | "SKIPPED") {
    setLoading(true);
    try {
      await logMedication(medication.id, medication.participantId, status);
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
       "group relative overflow-hidden rounded-[2rem] border bg-white dark:bg-slate-950 p-6 transition-all hover:-translate-y-1 shadow-sm md:flex items-center justify-between gap-6",
       hasLog ? "border-slate-100 dark:border-slate-800 opacity-60 hover:opacity-100" : "border-slate-200/60 dark:border-slate-800 shadow-slate-200/50 dark:shadow-none hover:shadow-md hover:border-purple-200 dark:hover:border-purple-900",
       isCompleted && "bg-emerald-50/30 dark:bg-emerald-950/20 hover:bg-emerald-50/50"
    )}>
       {/* Decorative Left Accent */}
       <div className={cn("absolute left-0 top-0 bottom-0 w-2 blur-sm group-hover:w-3 transition-all", 
          medication.isCritical && !hasLog ? "bg-rose-500" : "bg-purple-500",
          hasLog && (isCompleted ? "bg-emerald-500" : "bg-slate-500")
       )} />

       {/* Left Identifiers */}
       <div className="flex items-center gap-6 mb-4 md:mb-0">
          <Avatar className="h-16 w-16 ring-4 ring-white dark:ring-slate-900 shadow-sm shrink-0">
             <AvatarImage src={medication.participant.photoUrl || undefined} />
             <AvatarFallback className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{medication.participant.fullName[0]}</AvatarFallback>
          </Avatar>
          
          <div className="space-y-1">
             <div className="flex items-center gap-2">
                <h3 className={cn("text-xl font-black tracking-tight", hasLog ? "text-slate-500 line-through decoration-slate-300" : "text-slate-800 dark:text-slate-100")}>
                   {medication.name} <span className="text-sm text-slate-400 font-bold ml-1">{medication.dosage}</span>
                </h3>
                {medication.isCritical && (
                   <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest">
                      <ShieldAlert className="h-3 w-3" /> Critical
                   </div>
                )}
             </div>

             <p className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                 {medication.participant.preferredName || medication.participant.fullName.split(' ')[0]} • Due: {medication.timeDue}
             </p>

             {medication.instructions && !hasLog && (
                <p className="text-xs font-semibold italic text-slate-400 dark:text-slate-500 mt-2 max-w-sm leading-relaxed border-l-2 border-slate-200 dark:border-slate-800 pl-3 py-0.5">
                   "{medication.instructions}"
                </p>
             )}
          </div>
       </div>

       {/* Right Action Block */}
       <div className="flex items-center gap-3 w-full md:w-auto mt-6 md:mt-0 pt-4 md:pt-0 border-t border-slate-100 dark:border-slate-800 md:border-t-0">
           {hasLog ? (
              <div className={cn("flex w-full md:w-auto items-center justify-center gap-2 px-6 py-3 rounded-xl border text-[10px] uppercase tracking-widest font-black",
                 isCompleted ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 cursor-not-allowed" : "bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 cursor-not-allowed"
              )}>
                 {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                 {isCompleted ? "Signed Off" : "Skipped/Refused"}
              </div>
           ) : (
              <>
                 <button 
                  disabled={loading}
                  onClick={() => handleAction("SKIPPED")}
                  key="skip"
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-transparent text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-black uppercase tracking-widest transition-all disabled:opacity-50 active:scale-95"
                 >
                    Refuse
                 </button>
                 <button 
                  disabled={loading}
                  onClick={() => handleAction("DONE")}
                  key="sign"
                  className={cn(
                     "flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-white text-xs font-black uppercase tracking-widest transition-all shadow-md active:scale-95",
                     medication.isCritical 
                        ? "bg-rose-600 hover:bg-rose-700 shadow-rose-200 dark:shadow-none border border-rose-500 disabled:opacity-50" 
                        : "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200 dark:shadow-none border border-emerald-400 disabled:opacity-50"
                  )}
                 >
                    <CheckCircle2 className="h-4 w-4" />
                    Sign Off
                 </button>
              </>
           )}
       </div>
    </div>
  );
}
