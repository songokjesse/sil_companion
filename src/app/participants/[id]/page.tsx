import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ParticipantHero } from "@/components/participant/ParticipantHero";
import { TaskTimeline } from "@/components/dashboard/TaskTimeline";
import { AppointmentList } from "@/components/dashboard/AppointmentList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronLeft, 
  History, 
  ListTodo, 
  Pill, 
  Stethoscope, 
  Users,
  MapPin,
  ClipboardList
} from "lucide-react";
import Link from "next/link";
import { getParticipantData } from "@/lib/actions";

export default async function ParticipantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getParticipantData(id);

  if (!data) return <div>Participant not found.</div>;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-900/40">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header houseName={data.participant.houseId} />
        <ScrollArea className="flex-1 bg-slate-50 dark:bg-slate-900/60">
          <main className="container mx-auto p-4 md:p-10 space-y-10 max-w-7xl animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* Navigation & Title Section */}
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to House Dashboard
              </Link>
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                 <div className="space-y-1">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-800 dark:text-slate-100">
                       Participant File
                    </h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                       <MapPin className="h-4 w-4 text-purple-600" />
                       Resident • {data.participant.houseId}
                    </p>
                 </div>
                 
                 <div className="flex gap-2">
                    <button className="rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/60 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 transition-all hover:bg-slate-50 dark:bg-slate-900 shadow-sm shadow-slate-200/50">
                       Upload Doc
                    </button>
                    <button className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-slate-800 shadow-md shadow-slate-200/50">
                       Log Action
                    </button>
                 </div>
              </div>
            </div>

            {/* Profile Overview */}
            <ParticipantHero participant={data.participant} />

            {/* Details Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-slate-200/50 p-1.5 rounded-2xl w-full md:w-auto flex flex-wrap h-auto">
                <TabsTrigger value="overview" className="data-[state=active]:bg-white dark:bg-slate-950 data-[state=active]:shadow-sm px-6 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-300 data-[state=active]:text-purple-700">
                   <ListTodo className="h-4 w-4 mr-2" />
                   Today's Tasks
                </TabsTrigger>
                <TabsTrigger value="medical" className="data-[state=active]:bg-white dark:bg-slate-950 data-[state=active]:shadow-sm px-6 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-300 data-[state=active]:text-purple-700">
                   <Pill className="h-4 w-4 mr-2" />
                   Medication
                </TabsTrigger>
                <TabsTrigger value="appointments" className="data-[state=active]:bg-white dark:bg-slate-950 data-[state=active]:shadow-sm px-6 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-300 data-[state=active]:text-purple-700">
                   <Stethoscope className="h-4 w-4 mr-2" />
                   Medical Care
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-white dark:bg-slate-950 data-[state=active]:shadow-sm px-6 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-300 data-[state=active]:text-purple-700">
                   <History className="h-4 w-4 mr-2" />
                   Timeline
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8 mt-0 focus-visible:outline-none">
                 <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                       <div className="flex items-center justify-between">
                          <div className="space-y-1">
                             <h3 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100">Operational Log</h3>
                             <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Pending tasks today</p>
                          </div>
                       </div>
                       <TaskTimeline tasks={data.timelineTasks} />
                    </div>

                    <div className="space-y-6">
                       <div className="space-y-1">
                          <h3 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100">Support Context</h3>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Practical info for staff</p>
                       </div>
                       
                       <div className="space-y-4">
                          <div className="rounded-2xl border border-slate-200 dark:border-slate-800/60 bg-white dark:bg-slate-950 p-6 space-y-4 shadow-sm shadow-slate-200/50">
                             <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                                   <Users className="h-5 w-5 text-indigo-600" />
                                </div>
                                <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 tracking-tight">CommunicationPref</h4>
                             </div>
                             <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Liam prefers using his Picture Board for food choices. Takes time to process verbal requests (allow 10 seconds).</p>
                          </div>

                          <div className="rounded-2xl border border-slate-200 dark:border-slate-800/60 bg-white dark:bg-slate-950 p-6 space-y-4 shadow-sm shadow-slate-200/50 overflow-hidden relative">
                             <div className="absolute top-0 right-0 h-16 w-16 bg-blue-50 -mr-8 -mt-8 rounded-full blur-2xl" />
                             <div className="flex items-center gap-4 relative z-10">
                                <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                                   <ClipboardList className="h-5 w-5 text-blue-600" />
                                </div>
                                <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 tracking-tight relative z-10">Escort Requirement</h4>
                             </div>
                             <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium relative z-10">2 staff required for all external appointments. Bring seizure management pack (red bag) for all outings.</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </TabsContent>

              <TabsContent value="appointments" className="mt-0">
                 <AppointmentList appointments={data.appointments} />
              </TabsContent>

              <TabsContent value="medical" className="flex h-[300px] items-center justify-center rounded-2xl border-2 border-dashed bg-muted/50 mt-0">
                 <div className="text-center space-y-3">
                    <div className="mx-auto h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                       <Pill className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-sm font-bold">Medication Charting</h4>
                       <p className="text-xs text-muted-foreground italic">Full MAR (Medication Administration Record) module under development.</p>
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
