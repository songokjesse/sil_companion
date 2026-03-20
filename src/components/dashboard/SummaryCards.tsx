"use client";

import { AlertCircle, Calendar, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const iconMap: Record<string, any> = {
  clock: Clock,
  calendar: Calendar,
  alert: AlertCircle,
  check: CheckCircle2
};

const colorMap: Record<string, any> = {
  blue: { 
    text: "text-blue-600 dark:text-blue-400", 
    bg: "bg-blue-50/50 dark:bg-blue-900/10 border-blue-100/50 dark:border-blue-800/50", 
    icon: "text-blue-600 dark:text-blue-400",
    glow: "from-blue-100/50 to-transparent"
  },
  primary: { 
    text: "text-purple-600 dark:text-purple-400", 
    bg: "bg-purple-50/50 dark:bg-purple-900/10 border-purple-100/50 dark:border-purple-800/50", 
    icon: "text-purple-600 dark:text-purple-400",
    glow: "from-purple-100/50 to-transparent"
  },
  red: { 
    text: "text-rose-600 dark:text-rose-400", 
    bg: "bg-rose-50/50 dark:bg-rose-900/10 border-rose-100/50 dark:border-rose-800/50", 
    icon: "text-rose-600 dark:text-rose-400",
    glow: "from-rose-100/50 to-transparent"
  },
  green: { 
    text: "text-emerald-600 dark:text-emerald-400", 
    bg: "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100/50 dark:border-emerald-800/50", 
    icon: "text-emerald-600 dark:text-emerald-400",
    glow: "from-emerald-100/50 to-transparent"
  }
};

interface SummaryCardsProps {
   metrics: any[];
}

export function SummaryCards({ metrics }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((item, index) => {
        const Icon = iconMap[item.icon] || Clock;
        const colors = colorMap[item.color] || colorMap.blue;
        
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="group relative"
          >
            <div className={`absolute -inset-0.5 bg-gradient-to-br ${colors.glow} opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`} />
            <Card className="relative overflow-hidden border border-slate-200/60 dark:border-slate-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-none rounded-[2rem] transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:border-purple-200/50 dark:hover:border-slate-700 bg-white/80 dark:bg-slate-950 backdrop-blur-sm">
              <CardContent className="flex flex-col gap-6 p-7">
                <div className="flex items-start justify-between">
                  <div className={`p-4 rounded-2xl ${colors.bg} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon className={`h-6 w-6 ${colors.icon} stroke-[2.5]`} />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400/80 mb-1">{item.title}</span>
                    <h3 className="text-4xl font-[900] tracking-tighter text-slate-900 dark:text-slate-100">{item.value}</h3>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                   <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="h-5 w-5 rounded-full border-2 border-white dark:border-slate-950 bg-slate-100 dark:bg-slate-900" />
                      ))}
                   </div>
                   <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Active Entries</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
