"use client";

import { Check, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TaskTimelineProps {
   tasks: any[];
}

export function TaskTimeline({ tasks }: TaskTimelineProps) {
  return (
    <div className="space-y-3">
      {tasks.length > 0 ? (
         tasks.map((task, index) => (
           <motion.div
             key={task.id}
             initial={{ opacity: 0, y: 5 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: index * 0.05 }}
             className="group relative flex items-center gap-4 rounded-[1.25rem] border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-950 p-4 transition-all hover:bg-slate-50 dark:hover:bg-slate-900/40 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none"
           >
             <div className={`h-11 w-11 shrink-0 flex items-center justify-center rounded-xl border ${task.status === "Due Now" ? "border-purple-200 bg-purple-50 text-purple-600 shadow-sm shadow-purple-200/50" : "border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-slate-300"}`}>
                 <Clock className={`h-5 w-5 stroke-[2.5] ${task.status === "Due Now" ? "animate-pulse" : ""}`} />
             </div>
    
             <div className="flex-1 min-w-0 pr-2">
               <div className="flex items-center gap-2 mb-0.5">
                  <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-md border border-slate-200/50 dark:border-slate-800/50">
                    <span className="text-[9px] font-[900] tracking-tight text-slate-500 uppercase">{task.participant?.split(' ')[0]}</span>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">{task.due}</span>
                  {task.critical && <div className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse shadow-sm shadow-rose-500/50" />}
               </div>
               <h4 className="text-[13px] font-[900] tracking-tight text-slate-800 dark:text-slate-100 truncate group-hover:text-purple-600 transition-colors uppercase">{task.task}</h4>
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">{task.type}</p>
             </div>

             <div className="flex items-center gap-3 shrink-0">
                <div className={cn(
                    "hidden sm:block px-3 py-1 rounded-lg text-[9px] font-[900] uppercase tracking-widest border",
                    task.status === "Due Now" ? "bg-purple-50 text-purple-600 border-purple-100" : "bg-slate-50 text-slate-400 border-slate-100"
                )}>
                    {task.status.split(' ')[0]}
                </div>
                <button className="h-9 w-9 sm:h-auto sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-white px-3 sm:px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white dark:text-slate-900 transition-all hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white shadow-md active:scale-95 group/btn">
                   <Check className="h-4 w-4 stroke-[3]" />
                   <span className="hidden sm:inline">Done</span>
                </button>
             </div>
           </motion.div>
         ))
      ) : (
         <div className="p-10 text-center border border-dashed border-slate-200 dark:border-slate-800/60 rounded-[1.25rem] bg-slate-50 dark:bg-slate-900/50 text-[10px] font-[900] uppercase tracking-widest text-slate-400">No tasks scheduled.</div>
      )}
    </div>
  );
}
