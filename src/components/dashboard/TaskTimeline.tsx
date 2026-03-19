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
             className="group relative flex items-start gap-4 rounded-xl border bg-card p-4 transition-all hover:bg-muted/50 hover:shadow-sm"
           >
             <div className="flex flex-col items-center gap-2">
               <div className={`h-10 w-10 flex items-center justify-center rounded-full border-2 ${task.status === "Due Now" ? "border-primary bg-primary/10 shadow-[0_0_10px_rgba(var(--primary),0.3)]" : "border-border bg-muted"}`}>
                 <Clock className={`h-5 w-5 ${task.status === "Due Now" ? "text-primary" : "text-muted-foreground"}`} />
               </div>
               <div className="h-full w-px bg-border group-last:hidden" />
             </div>
   
             <div className="flex-1 space-y-2">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <Avatar className="h-6 w-6">
                     <AvatarFallback className="text-[10px] bg-muted-foreground/10 uppercase">{task.participant.split(' ').map((n: string)=>n[0]).join('')}</AvatarFallback>
                   </Avatar>
                   <span className="text-sm font-semibold">{task.participant}</span>
                 </div>
                 <span className="text-xs font-medium text-muted-foreground">{task.due}</span>
               </div>
   
               <div>
                 <div className="flex items-center gap-2">
                   <h4 className="text-sm font-bold tracking-tight">{task.task}</h4>
                   {task.critical && <Badge variant="destructive" className="h-5 text-[10px]">CRITICAL</Badge>}
                 </div>
                 <p className="text-xs text-muted-foreground">{task.type}</p>
               </div>
   
               <div className="flex items-center justify-between pt-2">
                 <Badge variant={task.status === "Due Now" ? "default" : "secondary"} className="h-5 text-[10px]">
                   {task.status}
                 </Badge>
                 <div className="flex gap-2">
                   <button className="rounded-md bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground transition-all hover:opacity-90">
                     Mark Done
                   </button>
                 </div>
               </div>
             </div>
           </motion.div>
         ))
      ) : (
         <div className="p-8 text-center border border-dashed rounded-xl text-sm font-medium text-muted-foreground italic">No tasks scheduled for today.</div>
      )}
    </div>
  );
}
