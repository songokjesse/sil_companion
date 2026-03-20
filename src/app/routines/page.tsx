import { getRoutinesForToday } from "@/lib/actions";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ListChecks, ClipboardList, Info } from "lucide-react";
import RoutineActionCard from "./RoutineActionCard";

export default async function RoutinesPage() {
  const routines = await getRoutinesForToday();

  // Group routines primarily by time slot or general "Daily"
  const groupedRoutines = routines.reduce((acc, routine) => {
    let slot = routine.timeDue || "Anytime";
    if (routine.timeDue) {
      const hour = parseInt(routine.timeDue.split(':')[0], 10);
      if (hour < 12) slot = "Morning";
      else if (hour < 17) slot = "Afternoon";
      else slot = "Evening";
    }

    if (!acc[slot]) acc[slot] = [];
    acc[slot].push(routine);
    return acc;
  }, {} as Record<string, typeof routines>);

  const sortedSlots = ["Morning", "Afternoon", "Evening", "Anytime"].map(slot => ({
     name: slot,
     routines: groupedRoutines[slot] || []
  })).filter(s => s.routines.length > 0);

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-slate-50/40 dark:bg-slate-950/40">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header houseName="Maple House" />
        <div className="flex-1 overflow-y-auto min-h-0 bg-slate-50/60 dark:bg-slate-900/40">
          <main className="container mx-auto p-4 pb-28 md:p-10 md:pb-10 space-y-10 max-w-5xl animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* Title Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
               <div className="space-y-1">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-800 dark:text-slate-100">
                     Daily Routines
                  </h2>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2">
                     <ListChecks className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                     {routines.length} scheduled tasks • Maple House
                  </p>
               </div>
               
               <div className="flex items-center gap-2 rounded-xl bg-blue-50 dark:bg-blue-950/30 px-4 py-2 border border-blue-100 dark:border-blue-900/30 shadow-sm">
                  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 dark:text-blue-300">
                     Life Skills Tracking
                  </span>
               </div>
            </div>

            {/* Content Area */}
            <div className="space-y-10">
               {sortedSlots.map(slot => (
                  <div key={slot.name} className="space-y-4">
                     <div className="flex items-center gap-4">
                        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">{slot.name} Block</h3>
                        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
                     </div>
                     
                     <div className="grid grid-cols-1 gap-4">
                         {slot.routines.map((routine) => (
                            <RoutineActionCard key={routine.id} routine={routine} />
                         ))}
                     </div>
                  </div>
               ))}

               {sortedSlots.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-center gap-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem]">
                     <div className="h-16 w-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center">
                        <ClipboardList className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                     </div>
                     <div>
                        <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">No Routines Scheduled</h3>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1">Residents have no specific skill tracking assigned today.</p>
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
