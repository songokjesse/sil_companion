"use client";

import { HeaderClient } from "./HeaderClient";
import { SidebarClient } from "./SidebarClient";
import { SummaryCards } from "./SummaryCards";
import { TaskTimeline } from "./TaskTimeline";
import { AppointmentList } from "./AppointmentList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Bell, BriefcaseMedical, Calendar, LayoutDashboard, ListChecks, Plus } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface DashboardProps {
   initialData: any;
}

export function Dashboard({ initialData }: DashboardProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-slate-50 dark:bg-slate-900/40">
      <SidebarClient medicationsEnabled={initialData.medicationsEnabled !== false} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <HeaderClient houseName={initialData.houseName} alerts={initialData.alerts} />
        <div className="flex-1 overflow-y-auto min-h-0 bg-slate-50 dark:bg-slate-900/60">
          <main className="container mx-auto p-4 pb-28 md:p-10 md:pb-10 space-y-10 max-w-7xl animate-in fade-in duration-700">
            {/* Page Title Section */}
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-primary">
                {initialData.houseName} Summary
              </h2>
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {mounted ? new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Loading..."} • Active Session
              </p>
            </div>

            {/* Summary Metrics */}
            <SummaryCards metrics={initialData.metrics} />

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <div className="flex items-center justify-between">
                <TabsList className="bg-slate-200/50 p-1.5 rounded-2xl">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-white dark:bg-slate-950 data-[state=active]:shadow-sm px-6 rounded-xl font-bold text-slate-600 dark:text-slate-300 data-[state=active]:text-purple-700">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  {initialData.medicationsEnabled !== false && (
                    <TabsTrigger value="meds" className="data-[state=active]:bg-white dark:bg-slate-950 data-[state=active]:shadow-sm px-6 rounded-xl font-bold text-slate-600 dark:text-slate-300 data-[state=active]:text-purple-700">
                      <BriefcaseMedical className="h-4 w-4 mr-2" />
                      Medications
                    </TabsTrigger>
                  )}
                  <TabsTrigger value="appointments" className="data-[state=active]:bg-white dark:bg-slate-950 data-[state=active]:shadow-sm px-6 rounded-xl font-bold text-slate-600 dark:text-slate-300 data-[state=active]:text-purple-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Appointments
                  </TabsTrigger>
                  <TabsTrigger value="routines" className="data-[state=active]:bg-white dark:bg-slate-950 data-[state=active]:shadow-sm px-6 rounded-xl font-bold text-slate-600 dark:text-slate-300 data-[state=active]:text-purple-700">
                    <ListChecks className="h-4 w-4 mr-2" />
                    Routines
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="space-y-8 mt-0 focus-visible:outline-none">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                  {/* Left Column: Task Timeline */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100">Today's Timeline</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Up next within {initialData.houseName} residence</p>
                    </div>
                    <TaskTimeline tasks={initialData.timelineTasks} />
                  </div>

                  {/* Right Column: Alerts & Important Info */}
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100">Active Alerts</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Important house-wide notices</p>
                    </div>
                    
                    <div className="space-y-3">
                      {initialData.alerts.length > 0 ? (
                         initialData.alerts.map((alert: any) => (
                           <div key={alert.id} className={`group relative rounded-2xl border p-4 transition-all hover:shadow-md ${alert.severity === "CRITICAL" ? "border-rose-200 bg-rose-50/50" : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800/60 shadow-sm shadow-slate-200/50"}`}>
                             <div className="flex gap-4">
                               <div className={`mt-0.5 p-2 rounded-xl shrink-0 ${alert.severity === "CRITICAL" ? "bg-rose-100/50 text-rose-600" : "bg-purple-50 text-purple-600"}`}>
                                 <Bell className="h-5 w-5" />
                               </div>
                               <div className="space-y-1">
                                 <h4 className={`text-sm font-black tracking-tight ${alert.severity === "CRITICAL" ? "text-rose-700" : "text-slate-800 dark:text-slate-100"}`}>{alert.participant} Alert</h4>
                                 <p className={`text-xs leading-relaxed font-medium ${alert.severity === "CRITICAL" ? "text-rose-600/80" : "text-slate-500 dark:text-slate-400"}`}>{alert.message}</p>
                               </div>
                             </div>
                           </div>
                         ))
                      ) : (
                         <div className="p-4 text-xs font-medium text-muted-foreground italic">No alerts for today.</div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="appointments" className="space-y-6 mt-0">
                <div className="flex justify-end">
                   <Link 
                     href="/appointments/new"
                     className="flex items-center gap-2 rounded-2xl bg-purple-600 px-6 py-3.5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-purple-700 shadow-xl shadow-purple-200 dark:shadow-none hover:-translate-y-0.5 active:scale-95"
                   >
                     <Plus className="h-4 w-4 shrink-0" />
                     Log New Appointment
                   </Link>
                </div>
                <AppointmentList appointments={initialData.appointments} />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
}
