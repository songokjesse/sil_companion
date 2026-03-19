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
             className="relative overflow-hidden rounded-xl border bg-card p-5 text-sm transition-all hover:bg-muted/30"
           >
             <div className="flex items-start justify-between">
               <div className="flex items-center gap-3">
                 <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10">
                   <Calendar className="h-5 w-5 text-primary font-bold" />
                 </div>
                 <div>
                   <h4 className="font-bold tracking-tight text-base">{appt.title}</h4>
                   <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                     <Avatar className="h-4 w-4">
                       <AvatarFallback className="text-[8px]">{appt.participant.split(' ').map((n: string)=>n[0]).join('')}</AvatarFallback>
                     </Avatar>
                     <span className="font-medium">{appt.participant}</span>
                   </div>
                 </div>
               </div>
               <Badge variant="outline" className="h-5 text-[10px]">{appt.type}</Badge>
             </div>
   
             <div className="mt-4 grid grid-cols-2 gap-4">
               <div className="space-y-1">
                 <div className="flex items-center gap-1.5 text-muted-foreground uppercase tracking-widest text-[8px] font-bold">
                   <Navigation className="h-3 w-3" />
                   Leave At
                 </div>
                 <p className="font-bold text-sm">{appt.leave}</p>
               </div>
               <div className="space-y-1">
                 <div className="flex items-center gap-1.5 text-muted-foreground uppercase tracking-widest text-[8px] font-bold">
                   <Clock className="h-3 w-3" />
                   Appt Time
                 </div>
                 <p className="font-bold text-sm">{appt.time}</p>
               </div>
             </div>
   
             <div className="mt-4 space-y-2">
               <div className="flex items-center gap-2 text-xs text-muted-foreground">
                 <MapPin className="h-3.5 w-3.5" />
                 <span className="truncate">{appt.location}</span>
               </div>
               <div className="rounded-lg bg-blue-50/50 p-2.5 text-[11px] border border-blue-100/50 leading-relaxed italic text-blue-900/80">
                 <span className="font-bold uppercase tracking-widest text-[9px] not-italic mr-1.5">Prep:</span>
                 {appt.prep}
               </div>
             </div>
   
             <div className="mt-5 flex gap-2">
               <button className="flex-1 rounded-md bg-zinc-900 px-4 py-2 text-xs font-bold text-zinc-100 transition-all hover:bg-zinc-800">
                 Check Prep Checklist
               </button>
             </div>
           </motion.div>
         ))
      ) : (
         <div className="col-span-1 md:col-span-2 p-12 text-center border border-dashed rounded-xl text-sm font-medium text-muted-foreground italic">No appointments for today.</div>
      )}
    </div>
  );
}
