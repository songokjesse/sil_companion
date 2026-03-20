"use client";

import { Check, Clock, MoreHorizontal, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
             initial={{ opacity: 0, scale: 0.98, y: 10 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             transition={{ delay: index * 0.08, duration: 0.4 }}
             className="group relative flex items-stretch gap-6 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-950 p-6 transition-all hover:bg-slate-50 dark:hover:bg-slate-900/40 hover:shadow-2xl hover:shadow-purple-500/5 hover:-translate-y-1"
           >
             <div className="flex flex-col items-center shrink-0">
               <div className={`h-14 w-14 flex items-center justify-center rounded-2xl border-2 transition-all duration-500 group-hover:rotate-6 ${task.status === "Due Now" ? "border-purple-200 bg-white text-purple-600 shadow-xl shadow-purple-500/20" : "border-slate-100 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-900 text-slate-300 group-hover:text-slate-400"}`}>
                 <Clock className={`h-6 w-6 stroke-[2.5] ${task.status === "Due Now" ? "animate-pulse" : ""}`} />
               </div>
               <div className="flex-1 w-0.5 bg-gradient-to-b from-slate-100 dark:from-slate-800 to-transparent mt-4 group-last:hidden" />
             </div>
    
             <div className="flex-1 flex flex-col justify-between py-1">
               <div className="space-y-3">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-800">
                     <Avatar className="h-5 w-5 ring-1 ring-white dark:ring-slate-950">
                       <AvatarFallback className="text-[9px] font-[900] bg-purple-600 text-white uppercase">
                          {task.participant?.split(' ').map((n: string)=>n[0]).join('') || "U"}
                       </AvatarFallback>
                     </Avatar>
                     <span className="text-[11px] font-black tracking-tight text-slate-700 dark:text-slate-200 uppercase tracking-widest">{task.participant}</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                     <div className={cn("h-1.5 w-1.5 rounded-full", task.status === "Due Now" ? "bg-purple-500" : "bg-slate-300")} />
                     <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">{task.due}</span>
                   </div>
                 </div>
    
                 <div className="space-y-1">
                   <div className="flex items-center gap-3">
                     <h4 className="text-xl font-[900] tracking-tight text-slate-900 dark:text-slate-100 leading-tight group-hover:text-purple-600 transition-colors">{task.task}</h4>
                     {task.critical && (
                       <div className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-[9px] font-black tracking-[0.2em] border border-rose-100 uppercase animate-pulse">
                         Immediate
                       </div>
                     )}
                   </div>
                   <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                     <div className="h-1 w-1 rounded-full bg-slate-300" />
                     {task.type} Hub Entry
                   </p>
                 </div>
               </div>
    
               <div className="flex items-center justify-between pt-6">
                 <div className={cn(
                   "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] border",
                   task.status === "Due Now" 
                     ? "bg-purple-50 text-purple-700 border-purple-100" 
                     : "bg-slate-50 text-slate-400 border-slate-100 dark:bg-slate-900 dark:border-slate-800"
                 )}>
                   {task.status}
                 </div>
                 
                 <button className="relative group/btn flex items-center gap-2 rounded-2xl bg-slate-900 dark:bg-white px-6 py-3 text-[11px] font-black uppercase tracking-widest text-white dark:text-slate-900 transition-all hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white shadow-xl shadow-slate-200 active:scale-95">
                   <Check className="h-4 w-4 stroke-[3]" />
                   Complete Task
                 </button>
               </div>
             </div>
           </motion.div>
         ))
      ) : (
         <div className="p-10 text-center border-2 border-dashed border-slate-200 dark:border-slate-800/60 rounded-2xl bg-slate-50 dark:bg-slate-900/50 text-xs font-bold uppercase tracking-widest text-slate-400">No tasks scheduled for today.</div>
      )}
    </div>
  );
}
