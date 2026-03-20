"use client";

import { updateAppointmentStatus } from "@/lib/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, MapPin, XCircle, Clock, Calendar, Car } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AppointmentActionCard({ appointment }: { appointment: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const isCompleted = appointment.status === "ATTENDED";
  const isCancelled = appointment.status === "CANCELLED";
  const hasResult = isCompleted || isCancelled;

  async function handleAction(status: "ATTENDED" | "CANCELLED") {
    setLoading(true);
    try {
      await updateAppointmentStatus(appointment.id, status);
      router.refresh();
    } catch(err) {
      console.error(err);
      alert("Failed to update appointment.");
    } finally {
      setLoading(false);
    }
  }

  const apptDate = new Date(appointment.dateTime);
  const timeString = apptDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = apptDate.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className={cn(
       "group relative flex flex-col md:flex-row overflow-hidden rounded-[2rem] border transition-all shadow-sm",
       hasResult ? "border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 opacity-70 hover:opacity-100" : "border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-slate-200/50 dark:shadow-none hover:shadow-md hover:border-purple-200 dark:hover:border-purple-900"
    )}>
       {/* Decorative Left Schedule Block */}
       <div className={cn("p-6 md:p-8 flex flex-col items-center justify-center shrink-0 border-r md:w-48 transition-all", 
          hasResult && isCompleted ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-100 dark:border-slate-800" :
          hasResult && isCancelled ? "bg-slate-100/50 dark:bg-slate-900 border-slate-200 dark:border-slate-800" :
          "bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900"
       )}>
          <Calendar className={cn("h-6 w-6 mb-2", hasResult ? "text-slate-400" : "text-indigo-600 dark:text-indigo-400")} />
          <span className={cn("text-2xl font-black tracking-tighter", hasResult ? "text-slate-600 dark:text-slate-300" : "text-indigo-800 dark:text-indigo-200")}>{timeString}</span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mt-1">{dateString}</span>
       </div>

       {/* Middle Content */}
       <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
             <Avatar className="h-10 w-10 ring-2 ring-white dark:ring-slate-900 shadow-sm shrink-0">
                <AvatarImage src={appointment.participant.photoUrl || undefined} />
                <AvatarFallback className="text-xs font-black text-slate-500 dark:text-slate-400">{appointment.participant.fullName[0]}</AvatarFallback>
             </Avatar>
             <div className="space-y-0.5">
                <h3 className={cn("text-lg font-black tracking-tight", hasResult ? "text-slate-500" : "text-slate-800 dark:text-slate-100")}>
                   {appointment.participant.preferredName || appointment.participant.fullName}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{appointment.type || "General Appointment"}</span>
             </div>
          </div>

          <div className="space-y-2">
             <h4 className={cn("font-bold text-sm", hasResult ? "text-slate-500" : "text-slate-800 dark:text-slate-200")}>{appointment.title}</h4>
             
             {appointment.location && (
               <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" /> {appointment.location}
               </p>
             )}

             {appointment.transportReq && (
               <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/40 w-fit px-2 py-0.5 rounded uppercase tracking-widest mt-2">
                  <Car className="h-3 w-3" /> Transport Required {appointment.transportNotes ? ` - ${appointment.transportNotes}` : ""}
               </p>
             )}

             {appointment.prepNotes && !hasResult && (
                <div className="mt-3 p-3 bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/40 rounded-xl text-xs font-medium text-orange-800 dark:text-orange-400">
                   <strong>Prep Notes:</strong> {appointment.prepNotes}
                </div>
             )}
          </div>
       </div>

       {/* Right Actions */}
       <div className="p-6 md:p-8 flex md:flex-col items-center justify-center gap-3 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800/60 w-full md:w-56 shrink-0 bg-slate-50/30 dark:bg-slate-900/10">
           {hasResult ? (
              <div className={cn("flex w-full items-center justify-center gap-2 px-6 py-4 rounded-xl border text-[10px] uppercase tracking-widest font-black",
                 isCompleted ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" : "bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800"
              )}>
                 {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                 {isCompleted ? "Attended" : "Cancelled"}
              </div>
           ) : (
              <>
                 <button 
                  disabled={loading}
                  onClick={() => handleAction("CANCELLED")}
                  className="flex-1 md:flex-none w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-transparent text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-black uppercase tracking-widest transition-all disabled:opacity-50 active:scale-95"
                 >
                    Cancel
                 </button>
                 <button 
                  disabled={loading}
                  onClick={() => handleAction("ATTENDED")}
                  className="flex-1 md:flex-none w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white text-xs font-black uppercase tracking-widest transition-all shadow-md active:scale-95 bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 dark:shadow-none border border-indigo-500 disabled:opacity-50"
                 >
                    <CheckCircle2 className="h-4 w-4" />
                    Attended
                 </button>
              </>
           )}
       </div>
    </div>
  );
}
