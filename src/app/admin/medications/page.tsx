import { getAllMedicationsAdmin } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BriefcaseMedical, Plus, MoreVertical, ShieldAlert, Pill } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function AdminMedications() {
  const medications = await getAllMedicationsAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100">Medication Registry</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2">
               <BriefcaseMedical className="h-4 w-4 text-purple-600 dark:text-purple-400" />
               Global organizational registry for all scheduled treatments.
            </p>
         </div>
         <Link 
            href="/admin/medications/new" 
            className="inline-flex items-center justify-center rounded-md font-bold bg-purple-600 px-4 py-2 hover:bg-purple-700 shadow-lg shadow-purple-100 dark:shadow-none text-white transition-colors text-sm"
         >
            <Plus className="h-4 w-4 mr-2" />
            Provision Medication
         </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
         <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
               <TableRow>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 py-4 px-6 h-auto">Medication Plan</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 px-6 h-auto">Resident Target</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 px-6 h-auto">Scheduling</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 px-6 h-auto">Warnings</TableHead>
                  <TableHead className="text-right"></TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {medications.map((med) => (
                  <TableRow key={med.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100/50 dark:border-slate-800">
                     <TableCell className="py-4 px-6">
                        <div className="flex flex-col text-slate-800 dark:text-slate-100">
                           <span className="font-black text-sm tracking-tight">{med.name}</span>
                           <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                              {med.dosage}
                           </span>
                        </div>
                     </TableCell>
                     <TableCell className="px-6">
                        <div className="flex flex-col text-slate-800 dark:text-slate-100">
                           <span className="font-bold text-sm tracking-tight">{med.participant.fullName}</span>
                           <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                              {med.participant.house.name}
                           </span>
                        </div>
                     </TableCell>
                     <TableCell className="px-6">
                        <div className="flex items-center gap-2 font-bold text-[11px] uppercase tracking-widest text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg w-fit">
                           {med.timeDue} Daily
                        </div>
                     </TableCell>
                     <TableCell className="px-6">
                        {med.isCritical ? (
                           <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 px-3 py-1.5 w-fit rounded-lg text-[10px] font-black uppercase tracking-widest">
                              <ShieldAlert className="h-3 w-3" /> Critical
                           </div>
                        ) : (
                           <span className="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-black tracking-widest">- Standard -</span>
                        )}
                     </TableCell>
                     <TableCell className="text-right px-6">
                        <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all text-slate-400 dark:text-slate-500">
                           <MoreVertical className="h-4 w-4" />
                        </button>
                     </TableCell>
                  </TableRow>
               ))}
               {medications.length === 0 && (
                  <TableRow>
                     <TableCell colSpan={5} className="py-20 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                           <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                              <Pill className="h-6 w-6 text-slate-300 dark:text-slate-600" />
                           </div>
                           <h3 className="font-black text-slate-800 dark:text-slate-200 text-lg">No medications managed</h3>
                           <p className="text-xs font-bold text-slate-400 dark:text-slate-500">Provision a new medication block to begin syncing schedules.</p>
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
