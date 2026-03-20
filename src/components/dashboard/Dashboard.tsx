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
import { cn } from "@/lib/utils";

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
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-purple-600/80 dark:text-purple-400">Operational Overview</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-[900] tracking-tight text-slate-900 dark:text-slate-100">
                  {initialData.houseName.split(' ')[0]}<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600"> {initialData.houseName.split(' ').slice(1).join(' ')}</span>
                </h2>
                <div className="flex items-center gap-4 pt-1">
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-300" />
                    {mounted ? new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Loading..."}
                  </p>
                  <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    System Active
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Metrics */}
            <SummaryCards metrics={initialData.metrics} />

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="space-y-10">
              <div className="sticky top-[80px] z-20 -mx-4 px-4 py-4 backdrop-blur-md bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200/40">
                <TabsList className="bg-slate-200/40 dark:bg-slate-800/40 p-1.5 rounded-[1.5rem] border border-slate-200/60 dark:border-slate-700/60 w-fit">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-lg px-8 py-2.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.1em] text-slate-500 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-400 transition-all">
                    <LayoutDashboard className="h-4 w-4 mr-2.5" />
                    Dashboard
                  </TabsTrigger>
                  {initialData.medicationsEnabled !== false && (
                    <TabsTrigger value="meds" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-lg px-8 py-2.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.1em] text-slate-500 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-400 transition-all">
                      <BriefcaseMedical className="h-4 w-4 mr-2.5" />
                      Meds
                    </TabsTrigger>
                  )}
                  <TabsTrigger value="appointments" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-lg px-8 py-2.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.1em] text-slate-500 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-400 transition-all">
                    <Calendar className="h-4 w-4 mr-2.5" />
                    Appts
                  </TabsTrigger>
                  <TabsTrigger value="routines" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-lg px-8 py-2.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.1em] text-slate-500 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-400 transition-all">
                    <ListChecks className="h-4 w-4 mr-2.5" />
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
                    
                    <div className="space-y-4">
                      {initialData.alerts.length > 0 ? (
                         initialData.alerts.map((alert: any) => (
                           <div key={alert.id} className={`group relative rounded-[2rem] border-2 p-6 transition-all hover:shadow-2xl ${alert.severity === "CRITICAL" ? "border-rose-100 bg-rose-50/30 dark:bg-rose-950/20" : "bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.02)]"}`}>
                             <div className="flex gap-5">
                               <div className={`p-4 rounded-2xl shrink-0 transition-transform group-hover:scale-110 ${alert.severity === "CRITICAL" ? "bg-rose-100 text-rose-600 shadow-lg shadow-rose-200/50" : "bg-purple-100 text-purple-600 shadow-lg shadow-purple-200/50"}`}>
                                 <Bell className="h-6 w-6 stroke-[2.5]" />
                               </div>
                               <div className="space-y-1.5 flex-1">
                                 <div className="flex items-center justify-between">
                                    <h4 className={`text-sm font-black tracking-tight ${alert.severity === "CRITICAL" ? "text-rose-700 dark:text-rose-400" : "text-slate-900 dark:text-slate-100"}`}>{alert.participant}</h4>
                                    <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full", alert.severity === "CRITICAL" ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-500")}>{alert.severity}</span>
                                 </div>
                                 <p className={`text-[13px] leading-relaxed font-bold ${alert.severity === "CRITICAL" ? "text-rose-600" : "text-slate-500 dark:text-slate-400"}`}>{alert.message}</p>
                               </div>
                             </div>
                           </div>
                         ))
                      ) : (
                         <div className="flex flex-col items-center justify-center p-12 rounded-[2rem] border-2 border-dashed border-slate-100 dark:border-slate-800 text-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                               <Bell className="h-6 w-6 text-slate-200" />
                            </div>
                            <p className="text-sm font-black text-slate-400 uppercase tracking-widest leading-tight">No Active Alerts</p>
                         </div>
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
