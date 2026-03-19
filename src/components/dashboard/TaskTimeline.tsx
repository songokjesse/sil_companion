"use client";

import { Check, Clock, MoreHorizontal, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface TaskTimelineProps {
   tasks: any[];
}

export function TaskTimeline({ tasks }: TaskTimelineProps) {
  return (
    <div className="space-y-4">
      {tasks.length > 0 ? (
         tasks.map((task, index) => (
           <motion.div
             key={task.id}
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: index * 0.1 }}
             className="group relative flex items-start gap-5 rounded-2xl border border-slate-200/60 bg-white p-5 transition-all hover:bg-slate-50 hover:shadow-sm hover:shadow-slate-200/50 hover:-translate-y-0.5"
           >
             <div className="flex flex-col items-center gap-2">
               <div className={`h-11 w-11 flex items-center justify-center rounded-2xl border-2 ${task.status === "Due Now" ? "border-purple-200 bg-purple-50 text-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.2)]" : "border-slate-100 bg-slate-50 text-slate-400"}`}>
                 <Clock className="h-5 w-5" />
               </div>
               <div className="h-full w-px bg-slate-200 group-last:hidden" />
             </div>
   
             <div className="flex-1 space-y-2">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <Avatar className="h-6 w-6 ring-2 ring-white shadow-sm">
                     <AvatarFallback className="text-[10px] font-black bg-purple-100 text-purple-700 uppercase">{task.participant.split(' ').map((n: string)=>n[0]).join('')}</AvatarFallback>
                   </Avatar>
                   <span className="text-sm font-black text-slate-800">{task.participant}</span>
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{task.due}</span>
               </div>
   
               <div>
                 <div className="flex items-center gap-2">
                   <h4 className="text-base font-black tracking-tight text-slate-800">{task.task}</h4>
                   {task.critical && <Badge variant="destructive" className="h-5 text-[9px] font-black tracking-widest bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200 uppercase">CRITICAL</Badge>}
                 </div>
                 <p className="text-xs font-medium text-slate-500">{task.type}</p>
               </div>
   
               <div className="flex items-center justify-between pt-3">
                 <Badge variant="outline" className={`h-6 text-[10px] font-black uppercase tracking-widest border ${task.status === "Due Now" ? "bg-purple-600 text-white border-purple-600" : "bg-slate-100 text-slate-500 border-slate-200"}`}>
                   {task.status}
                 </Badge>
                 <div className="flex gap-2">
                   <button className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-slate-800 shadow-md shadow-slate-200">
                     Mark Done
                   </button>
                 </div>
               </div>
             </div>
           </motion.div>
         ))
      ) : (
         <div className="p-10 text-center border-2 border-dashed border-slate-200/60 rounded-2xl bg-slate-50/50 text-xs font-bold uppercase tracking-widest text-slate-400">No tasks scheduled for today.</div>
      )}
    </div>
  );
}
