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

export function Dashboard() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <ScrollArea className="flex-1 bg-muted/20">
          <main className="container mx-auto p-4 md:p-8 space-y-8 max-w-7xl animate-in fade-in duration-700">
            {/* Page Title Section */}
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-primary">
                Maple House Summary
              </h2>
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Thursday, March 19, 2026 • Morning Shift
              </p>
            </div>

            {/* Summary Metrics */}
            <SummaryCards />

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

                <div className="hidden sm:flex gap-2">
                   <button className="rounded-lg bg-orange-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-orange-700 hover:scale-[1.02] shadow-sm">
                    New Appointment
                  </button>
                  <button className="rounded-lg border border-input bg-white px-4 py-2 text-xs font-bold text-primary transition-all hover:bg-accent shadow-sm">
                    Generate Shift Report
                  </button>
                </div>
              </div>

              <TabsContent value="overview" className="space-y-8 mt-0 focus-visible:outline-none">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                  {/* Left Column: Task Timeline */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold tracking-tight">Today's Timeline</h3>
                      <p className="text-xs text-muted-foreground">Up next within Maple House residence</p>
                    </div>
                    <TaskTimeline />
                  </div>

                  {/* Right Column: Alerts & Important Info */}
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold tracking-tight">Active Alerts</h3>
                      <p className="text-xs text-muted-foreground">Important house-wide or participant notices</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="group relative rounded-xl border border-dashed border-destructive/50 bg-destructive/5 p-4 transition-all hover:border-destructive">
                        <div className="flex gap-3">
                          <Bell className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold text-destructive">Fasting Required</h4>
                            <p className="text-xs text-destructive/80 leading-relaxed font-medium">Liam Chen has blood tests at 2:00 PM. No food or drink except water after 6:00 AM.</p>
                          </div>
                        </div>
                      </div>

                      <div className="group relative rounded-xl border bg-card p-4 transition-all hover:bg-muted/50">
                        <div className="flex gap-3">
                          <Bell className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold">Wheelchair Ramp Issue</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed font-medium">Side entrance ramp is slightly loose. Use front door for John Doe today.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border bg-card p-5 space-y-4">
                      <h4 className="text-sm font-bold">Upcoming Appointments</h4>
                      <div className="space-y-4">
                         <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                               <Calendar className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                               <p className="text-xs font-bold truncate tracking-tight">Dialysis Visit (Liam C)</p>
                               <p className="text-[10px] text-muted-foreground font-medium">2:00 PM • Leaves 1:15 PM</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-3 opacity-60">
                            <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                               <Calendar className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                               <p className="text-xs font-bold truncate tracking-tight text-muted-foreground">Library Outing (Emma W)</p>
                               <p className="text-[10px] text-muted-foreground font-medium">3:30 PM • Leaves 3:15 PM</p>
                            </div>
                         </div>
                      </div>
                      <button className="w-full rounded-md border py-2 text-[10px] font-bold text-muted-foreground hover:bg-muted">View Full Calendar</button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="appointments" className="space-y-6 mt-0">
                <AppointmentList />
              </TabsContent>
              
              <TabsContent value="meds" className="space-y-6 mt-0">
                 <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed bg-muted/50">
                    <div className="text-center space-y-3">
                      <div className="mx-auto h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <BriefcaseMedical className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold">Medication View</h4>
                        <p className="text-xs text-muted-foreground">Detailed medication charting dashboard coming soon in MVP.</p>
                      </div>
                    </div>
                 </div>
              </TabsContent>

              <TabsContent value="routines" className="space-y-6 mt-0">
                <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed bg-muted/50">
                    <div className="text-center space-y-3">
                      <div className="mx-auto h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <ListChecks className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold">Routines View</h4>
                        <p className="text-xs text-muted-foreground">Detailed recurring routines tracking coming soon in MVP.</p>
                      </div>
                    </div>
                 </div>
              </TabsContent>
            </Tabs>
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}
