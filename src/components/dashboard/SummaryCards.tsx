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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((item, index) => {
        const Icon = iconMap[item.icon] || Clock;
        const colors = colorMap[item.color] || colorMap.blue;
        
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="group relative"
          >
            <Card className="relative overflow-hidden border border-slate-200/50 dark:border-slate-800/50 shadow-sm rounded-[1.5rem] transition-all hover:shadow-md hover:border-purple-200/50 bg-white/50 dark:bg-slate-950 backdrop-blur-sm">
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`p-3 rounded-[1rem] ${colors.bg} transition-all duration-500`}>
                  <Icon className={`h-5 w-5 ${colors.icon} stroke-[2.5]`} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400/80 mb-0.5 truncate">{item.title}</span>
                  <h3 className="text-2xl font-[900] tracking-tight text-slate-900 dark:text-slate-100">{item.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
