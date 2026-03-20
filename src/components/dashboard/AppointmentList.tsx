"use client";

import { Calendar, MapPin, Navigation, User, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface AppointmentListProps {
   appointments: any[];
}

export function AppointmentList({ appointments }: AppointmentListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {appointments.length > 0 ? (
         appointments.map((appt, index) => (
           <motion.div
             key={appt.id}
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: index * 0.1 }}
             className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/60 bg-white dark:bg-slate-950 p-6 transition-all hover:bg-slate-50 dark:bg-slate-900 hover:shadow-sm hover:shadow-slate-200/50 hover:-translate-y-0.5"
           >
             <div className="flex items-start justify-between">
               <div className="flex items-center gap-3">
                 <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-purple-50 border border-purple-100/50">
                   <Calendar className="h-5 w-5 text-purple-600" />
                 </div>
                 <div className="flex flex-col gap-0.5">
                   <h4 className="text-base font-black tracking-tight text-slate-800 dark:text-slate-100">{appt.title}</h4>
                   <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                     <Avatar className="h-5 w-5 ring-2 ring-white">
                       <AvatarFallback className="text-[8px] font-black bg-purple-100 text-purple-700 uppercase">{appt.participant.split(' ').map((n: string)=>n[0]).join('')}</AvatarFallback>
                     </Avatar>
                     <span className="font-bold">{appt.participant}</span>
                   </div>
                 </div>
               </div>
               <Badge variant="outline" className="h-6 text-[10px] font-black uppercase tracking-widest bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">{appt.type}</Badge>
             </div>
   
             <div className="mt-4 grid grid-cols-2 gap-4">
               <div className="space-y-1">
                 <div className="flex items-center gap-1.5 text-slate-400 uppercase tracking-widest text-[9px] font-bold">
                   <Navigation className="h-3.5 w-3.5 text-slate-400" />
                   Leave At
                 </div>
                 <p className="font-black text-slate-800 dark:text-slate-100 text-[15px]">{appt.leave}</p>
               </div>
               <div className="space-y-1">
                 <div className="flex items-center gap-1.5 text-slate-400 uppercase tracking-widest text-[9px] font-bold">
                   <Clock className="h-3.5 w-3.5 text-slate-400" />
                   Appt Time
                 </div>
                 <p className="font-black text-slate-800 dark:text-slate-100 text-[15px]">{appt.time}</p>
               </div>
             </div>
   
             <div className="mt-4 space-y-2">
               <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                 <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                 <span className="truncate">{appt.location}</span>
               </div>
               <div className="rounded-xl bg-purple-50/50 p-3 text-xs border border-purple-100/50 leading-relaxed text-purple-900/80 font-medium">
                 <span className="font-black uppercase tracking-widest text-[10px] text-purple-600 mr-2">Prep Tasks:</span>
                 {appt.prep}
               </div>
             </div>
   
             <div className="mt-5 flex gap-2">
               <button className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-slate-800 shadow-md shadow-slate-200">
                 Checklists
               </button>
             </div>
           </motion.div>
         ))
      ) : (
         <div className="col-span-1 md:col-span-2 p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800/60 rounded-2xl bg-slate-50 dark:bg-slate-900/50 text-xs font-bold uppercase tracking-widest text-slate-400">No appointments for today.</div>
      )}
    </div>
  );
}
