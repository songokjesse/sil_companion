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
  blue: { text: "text-blue-600", bg: "bg-blue-50 border border-blue-100", icon: "text-blue-500" },
  primary: { text: "text-purple-600", bg: "bg-purple-50 border border-purple-100", icon: "text-purple-500" },
  red: { text: "text-rose-600", bg: "bg-rose-50 border border-rose-100", icon: "text-rose-500" },
  green: { text: "text-emerald-600", bg: "bg-emerald-50 border border-emerald-100", icon: "text-emerald-500" }
};

interface SummaryCardsProps {
   metrics: any[];
}

export function SummaryCards({ metrics }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((item, index) => {
        const Icon = iconMap[item.icon];
        const colors = colorMap[item.color];
        
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden border border-slate-200 dark:border-slate-800/60 shadow-sm shadow-slate-200/50 rounded-2xl transition-all hover:shadow-md hover:border-purple-200 hover:-translate-y-0.5 group bg-white dark:bg-slate-950">
              <CardContent className="flex items-center gap-5 p-5">
                <div className={`p-3.5 rounded-2xl ${colors.bg} transition-transform group-hover:scale-110`}>
                  <Icon className={`h-6 w-6 ${colors.icon}`} />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{item.title}</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100">{item.value}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
