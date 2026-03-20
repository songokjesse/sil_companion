import { getMedicationsForToday } from "@/lib/actions";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { BriefcaseMedical, Pill, Info } from "lucide-react";
import ParticipantMedPack from "./ParticipantMedPack";

export default async function MedicationsPage() {
  const meds = await getMedicationsForToday();

  // Group medications by time slot ( Morning, Afternoon, Evening ) roughly
  const groupedMeds = meds.reduce((acc, med) => {
    const hour = parseInt(med.timeDue.split(':')[0], 10);
    let slot = "Evening";
    if (hour < 12) slot = "Morning";
    else if (hour < 17) slot = "Afternoon";

    if (!acc[slot]) acc[slot] = [];
    acc[slot].push(med);
    return acc;
  }, {} as Record<string, typeof meds>);

  // To ensure order: Morning, Afternoon, Evening
  const sortedSlots = ["Morning", "Afternoon", "Evening"].map(slot => ({
     name: slot,
     meds: groupedMeds[slot] || []
  })).filter(s => s.meds.length > 0);

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
                     Daily Medications
                  </h2>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2">
                     <BriefcaseMedical className="h-4 w-4 text-rose-500" />
                     {meds.length} scheduled distributions • Maple House
                  </p>
               </div>
               
               <div className="flex items-center gap-2 rounded-xl bg-orange-50 dark:bg-orange-950/30 px-4 py-2 border border-orange-100 dark:border-orange-900/30 shadow-sm">
                  <Info className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-700 dark:text-orange-300">
                     Verification Required
                  </span>
               </div>
            </div>

            {/* Content Area */}
            <div className="space-y-10">
               {sortedSlots.map(slot => (
                  <div key={slot.name} className="space-y-4">
                     <div className="flex items-center gap-4">
                        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">{slot.name} Routine</h3>
                        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
                     </div>
                     
                     <div className="grid grid-cols-1 gap-8">
                         {Object.values(
                             slot.meds.reduce((acc, med) => {
                                 if (!acc[med.participant.id]) acc[med.participant.id] = { participant: med.participant, meds: [] };
                                 acc[med.participant.id].meds.push(med);
                                 return acc;
                             }, {} as Record<string, { participant: any, meds: any[] }>)
                         ).map((group) => (
                            <ParticipantMedPack key={group.participant.id} participant={group.participant} meds={group.meds} />
                         ))}
                     </div>
                  </div>
               ))}

               {sortedSlots.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-center gap-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem]">
                     <div className="h-16 w-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center">
                        <Pill className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                     </div>
                     <div>
                        <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">No Medications Scheduled</h3>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1">All clear for today's distributions.</p>
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
