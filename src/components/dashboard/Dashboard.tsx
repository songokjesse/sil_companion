"use client";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { SummaryCards } from "./SummaryCards";
import { TaskTimeline } from "./TaskTimeline";
import { AppointmentList } from "./AppointmentList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Bell, BriefcaseMedical, Calendar, LayoutDashboard, ListChecks } from "lucide-react";

interface DashboardProps {
   initialData: any;
}

export function Dashboard({ initialData }: DashboardProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header houseName={initialData.houseName} />
        <ScrollArea className="flex-1 bg-muted/20">
          <main className="container mx-auto p-4 md:p-8 space-y-8 max-w-7xl animate-in fade-in duration-700">
            {/* Page Title Section */}
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-primary">
                {initialData.houseName} Summary
              </h2>
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} • Active Session
              </p>
            </div>

            {/* Summary Metrics */}
            <SummaryCards metrics={initialData.metrics} />

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <div className="flex items-center justify-between">
                <TabsList className="bg-muted p-1">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-6">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="meds" className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-6">
                    <BriefcaseMedical className="h-4 w-4 mr-2" />
                    Medications
                  </TabsTrigger>
                  <TabsTrigger value="appointments" className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-6">
                    <Calendar className="h-4 w-4 mr-2" />
                    Appointments
                  </TabsTrigger>
                  <TabsTrigger value="routines" className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-6">
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
                      <h3 className="text-lg font-bold tracking-tight">Today's Timeline</h3>
                      <p className="text-xs text-muted-foreground">Up next within {initialData.houseName} residence</p>
                    </div>
                    <TaskTimeline tasks={initialData.timelineTasks} />
                  </div>

                  {/* Right Column: Alerts & Important Info */}
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold tracking-tight">Active Alerts</h3>
                      <p className="text-xs text-muted-foreground">Important house-wide or participant notices</p>
                    </div>
                    
                    <div className="space-y-3">
                      {initialData.alerts.length > 0 ? (
                         initialData.alerts.map((alert: any) => (
                           <div key={alert.id} className={`group relative rounded-xl border p-4 transition-all hover:bg-muted/50 ${alert.severity === "CRITICAL" ? "border-destructive bg-destructive/5" : "bg-card"}`}>
                             <div className="flex gap-3">
                               <Bell className={`h-5 w-5 mt-0.5 shrink-0 ${alert.severity === "CRITICAL" ? "text-destructive" : "text-primary"}`} />
                               <div className="space-y-1">
                                 <h4 className={`text-sm font-bold ${alert.severity === "CRITICAL" ? "text-destructive" : ""}`}>{alert.participant} Alert</h4>
                                 <p className={`text-xs leading-relaxed font-medium ${alert.severity === "CRITICAL" ? "text-destructive" : "text-muted-foreground"}`}>{alert.message}</p>
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
                <AppointmentList appointments={initialData.appointments} />
              </TabsContent>
            </Tabs>
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}
