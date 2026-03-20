import { getUpcomingAppointments } from "@/lib/actions";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Calendar, CalendarCheck, Plus } from "lucide-react";
import Link from "next/link";
import AppointmentActionCard from "./AppointmentActionCard";

export default async function AppointmentsPage() {
  const appointments = await getUpcomingAppointments();

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-slate-50/40 dark:bg-slate-950/40">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header houseName="Maple House" />
        <div className="flex-1 overflow-y-auto min-h-0 bg-slate-50/60 dark:bg-slate-900/40">
          <main className="container mx-auto p-4 pb-28 md:p-10 md:pb-10 space-y-10 max-w-5xl animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* Title Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
               <div className="space-y-1">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-800 dark:text-slate-100">
                     Appointments Roster
                  </h2>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2">
                     <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                     {appointments.length} upcoming events • Maple House
                  </p>
               </div>

                <Link 
                  href="/appointments/new"
                  className="flex items-center gap-2 rounded-2xl bg-purple-600 px-6 py-3.5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-purple-700 shadow-xl shadow-purple-100 dark:shadow-none hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
                >
                  <Plus className="h-4 w-4 shrink-0" />
                  Log Appointment
                </Link>
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 gap-6">
               {appointments.map((appt) => (
                  <AppointmentActionCard key={appt.id} appointment={appt} />
               ))}

               {appointments.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-center gap-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem]">
                     <div className="h-16 w-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center">
                        <CalendarCheck className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                     </div>
                     <div>
                        <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">No Appointments Scheduled</h3>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1">Residents have a clear schedule.</p>
                     </div>
                  </div>
               )}
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
