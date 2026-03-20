import { getAllAppointmentsAdmin } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Plus, MoreVertical, Car } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function AdminAppointments() {
  const appointments = await getAllAppointmentsAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100">Appointment Ledger</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2">
               <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
               Global tracking of all participant external engagements.
            </p>
         </div>
         <Link 
            href="/admin/appointments/new" 
            className="inline-flex items-center justify-center rounded-md font-bold bg-indigo-600 px-4 py-2 hover:bg-indigo-700 shadow-lg shadow-indigo-100 dark:shadow-none text-white transition-colors text-sm"
         >
            <Plus className="h-4 w-4 mr-2" />
            Log Appointment
         </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
         <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
               <TableRow>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 py-4 px-6 h-auto">Resident</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 px-6 h-auto">Event Details</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 px-6 h-auto">Date/Time</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 px-6 h-auto">Status</TableHead>
                  <TableHead className="text-right"></TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {appointments.map((appt) => (
                  <TableRow key={appt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100/50 dark:border-slate-800">
                     <TableCell className="py-4 px-6">
                        <div className="flex flex-col text-slate-800 dark:text-slate-100">
                           <span className="font-black text-sm tracking-tight">{appt.participant.fullName}</span>
                           <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                              {appt.participant.house.name}
                           </span>
                        </div>
                     </TableCell>
                     <TableCell className="px-6">
                        <div className="flex flex-col text-slate-800 dark:text-slate-100">
                           <span className="font-bold text-sm tracking-tight">{appt.title}</span>
                           <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                              {appt.type || "General"} {appt.transportReq ? " • Transport Req" : ""}
                           </span>
                        </div>
                     </TableCell>
                     <TableCell className="px-6">
                        <div className="flex items-center gap-2 font-bold text-[11px] uppercase tracking-widest text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg w-fit">
                           {appt.dateTime.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })} • {appt.dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                     </TableCell>
                     <TableCell className="px-6">
                        <span className="text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                           {appt.status}
                        </span>
                     </TableCell>
                     <TableCell className="text-right px-6">
                        <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all text-slate-400 dark:text-slate-500">
                           <MoreVertical className="h-4 w-4" />
                        </button>
                     </TableCell>
                  </TableRow>
               ))}
               {appointments.length === 0 && (
                  <TableRow>
                     <TableCell colSpan={5} className="py-20 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                           <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                              <Calendar className="h-6 w-6 text-slate-300 dark:text-slate-600" />
                           </div>
                           <h3 className="font-black text-slate-800 dark:text-slate-200 text-lg">No appointments logged</h3>
                           <p className="text-xs font-bold text-slate-400 dark:text-slate-500">Add an appointment to start tracking events.</p>
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
