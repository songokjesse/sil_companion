"use client";

import { AlertCircle, Calendar, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const summaryData = [
  {
    title: "Due Now",
    value: "4",
    description: "Medications & Routines",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Upcoming Appts",
    value: "2",
    description: "Leaving within 2 hours",
    icon: Calendar,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Overdue",
    value: "1",
    description: "Requires attention",
    icon: AlertCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    title: "Completed",
    value: "12",
    description: "Tasks done today",
    icon: CheckCircle2,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
];

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summaryData.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="overflow-hidden border-none shadow-sm transition-all hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`p-3 rounded-xl ${item.bgColor}`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold tracking-tight">{item.value}</h3>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
