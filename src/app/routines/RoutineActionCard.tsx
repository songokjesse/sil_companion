"use client";

import { logRoutine } from "@/lib/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, XCircle, Clock, ChevronRight, ListChecks, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function RoutineActionCard({ routine }: { routine: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [isExpanding, setIsExpanding] = useState(false);

  // If logs exist for today, it means it's completed or skipped
  const hasLog = routine.logs && routine.logs.length > 0;
  const logInstance = hasLog ? routine.logs[0] : null;
  const isDone = logInstance?.status === "DONE";

  async function handleAction(status: "DONE" | "SKIPPED" | "DELAYED") {
    setLoading(true);
    try {
      await logRoutine(routine.id, routine.participant.id, status, notes || undefined);
      router.refresh();
      setIsExpanding(false);
    } catch(err) {
      console.error(err);
      alert("Failed to log routine status.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn(
       "group relative flex flex-col overflow-hidden rounded-[2rem] border transition-all shadow-sm bg-white dark:bg-slate-950",
       hasLog ? "border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/10 dark:bg-slate-900/40 opacity-70 hover:opacity-100" : "border-slate-200/60 dark:border-slate-800 shadow-slate-200/50 dark:shadow-none hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-900"
    )}>
       <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
             <Avatar className="h-14 w-14 ring-2 ring-emerald-100 dark:ring-emerald-900 shadow-sm shrink-0">
                <AvatarImage src={routine.participant.photoUrl || undefined} />
                <AvatarFallback className="text-xl font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950">{routine.participant.fullName[0]}</AvatarFallback>
             </Avatar>
             
             <div className="space-y-1">
                <div className="flex items-center gap-2">
                   <h3 className={cn("text-lg font-black tracking-tight", hasLog ? "text-slate-500 line-through decoration-slate-300 dark:decoration-slate-700" : "text-slate-800 dark:text-slate-100")}>
                      {routine.title}
                   </h3>
                   {routine.timeDue && (
                     <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded flex items-center gap-1 uppercase">
                       <Clock className="h-3 w-3" /> {routine.timeDue}
                     </span>
                   )}
                </div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                   {routine.participant.preferredName || routine.participant.fullName} • {routine.frequency}
                </p>
             </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
             {hasLog ? (
                <div className={cn("flex w-full md:w-auto items-center justify-center gap-2 px-6 py-3 rounded-xl border text-[10px] uppercase tracking-widest font-black",
                   isDone ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" : "bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800"
                )}>
                   {isDone ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                   {logInstance.status}
                </div>
             ) : (
                <>
                   <button 
                    onClick={() => setIsExpanding(prev => !prev)}
                    className="flex-1 md:flex-none flex items-center justify-center px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 text-xs font-black uppercase tracking-widest transition-all"
                   >
                     Actions <ChevronRight className={cn("h-4 w-4 ml-1 transition-transform", isExpanding && "rotate-90")} />
                   </button>
                   <button 
                    disabled={loading}
                    onClick={() => handleAction("DONE")}
                    className="flex-[2] md:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200 dark:shadow-none disabled:opacity-50"
                   >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ListChecks className="h-4 w-4" />}
                      Mark Done
                   </button>
                </>
             )}
          </div>
       </div>

       {routine.description && !hasLog && (
          <div className="px-6 md:px-8 pb-4">
             <p className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/60 leading-relaxed italic">
                {routine.description}
             </p>
          </div>
       )}

       {/* Expanded Action Form for Notes/Skipping */}
       {isExpanding && !hasLog && (
          <div className="px-6 md:px-8 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/20 animate-in slide-in-from-top-2">
             <div className="flex flex-col gap-4 mt-4">
                <input 
                  type="text" 
                  placeholder="Optional notes regarding this routine..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 transition-all text-slate-800 dark:text-slate-100"
                />
                <div className="flex gap-3 justify-end">
                   <button 
                    disabled={loading}
                    onClick={() => handleAction("DELAYED")}
                    className="px-6 py-3 rounded-xl border border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 dark:border-orange-900/40 dark:bg-orange-950/30 dark:text-orange-400 text-xs font-black uppercase tracking-widest transition-all"
                   >
                      Delayed
                   </button>
                   <button 
                    disabled={loading}
                    onClick={() => handleAction("SKIPPED")}
                    className="px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 text-xs font-black uppercase tracking-widest transition-all"
                   >
                      Skip Routine
                   </button>
                </div>
             </div>
          </div>
       )}
    </div>
  );
}
