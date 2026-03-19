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
  blue: { text: "text-blue-600", bg: "bg-blue-50" },
  primary: { text: "text-primary", bg: "bg-primary/10" },
  red: { text: "text-destructive", bg: "bg-destructive/10" },
  green: { text: "text-green-600", bg: "bg-green-50" }
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
            <Card className="overflow-hidden border-none shadow-sm transition-all hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`p-3 rounded-xl ${colors.bg}`}>
                  <Icon className={`h-6 w-6 ${colors.text}`} />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold tracking-tight">{item.value}</h3>
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
