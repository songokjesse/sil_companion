import { getAllRoutinesAdmin } from "@/lib/actions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClipboardList, Plus, MoreVertical, Clock } from "lucide-react";
import Link from "next/link";

export default async function AdminRoutines() {
  const routines = await getAllRoutinesAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100">Routine Ledger</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2">
               <ClipboardList className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
               Global tracking of assigned life-skill routines.
            </p>
         </div>
         <Link 
            href="/admin/routines/new" 
            className="inline-flex items-center justify-center rounded-md font-bold bg-emerald-600 px-4 py-2 hover:bg-emerald-700 shadow-lg shadow-emerald-100 dark:shadow-none text-white transition-colors text-sm"
         >
            <Plus className="h-4 w-4 mr-2" />
            Provision Routine
         </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
         <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
               <TableRow>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 py-4 px-6 h-auto">Resident</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 px-6 h-auto">Routine Detail</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 px-6 h-auto">Frequency / Time</TableHead>
                  <TableHead className="text-right"></TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {routines.map((routine) => (
                  <TableRow key={routine.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100/50 dark:border-slate-800">
                     <TableCell className="py-4 px-6">
                        <div className="flex flex-col text-slate-800 dark:text-slate-100">
                           <span className="font-black text-sm tracking-tight">{routine.participant.fullName}</span>
                           <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                              {routine.participant.house.name}
                           </span>
                        </div>
                     </TableCell>
                     <TableCell className="px-6">
                        <div className="flex flex-col text-slate-800 dark:text-slate-100">
                           <span className="font-bold text-sm tracking-tight">{routine.title}</span>
                           {routine.description && (
                             <span className="text-xs italic text-slate-400 dark:text-slate-500 mt-1 line-clamp-1 max-w-[250px]">
                               {routine.description}
                             </span>
                           )}
                        </div>
                     </TableCell>
                     <TableCell className="px-6">
                        <div className="flex flex-col gap-1 items-start">
                           <span className="font-black text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded w-fit">
                              {routine.frequency}
                           </span>
                           {routine.timeDue && (
                              <span className="font-bold text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                 <Clock className="h-3 w-3" /> Due {routine.timeDue}
                              </span>
                           )}
                        </div>
                     </TableCell>
                     <TableCell className="text-right px-6">
                        <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all text-slate-400 dark:text-slate-500">
                           <MoreVertical className="h-4 w-4" />
                        </button>
                     </TableCell>
                  </TableRow>
               ))}
               {routines.length === 0 && (
                  <TableRow>
                     <TableCell colSpan={4} className="py-20 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                           <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                              <ClipboardList className="h-6 w-6 text-slate-300 dark:text-slate-600" />
                           </div>
                           <h3 className="font-black text-slate-800 dark:text-slate-200 text-lg">No routines established</h3>
                           <p className="text-xs font-bold text-slate-400 dark:text-slate-500">Provision a routine to track life-skills.</p>
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
