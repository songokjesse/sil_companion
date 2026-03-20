import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ShieldAlert, Users, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getParticipantsList } from "@/lib/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function ParticipantsPage() {
  const participants = await getParticipantsList();

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-slate-50 dark:bg-slate-900/40">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header houseName="Maple House" />
        <div className="flex-1 overflow-y-auto min-h-0 bg-slate-50 dark:bg-slate-900/60">
          <main className="container mx-auto p-4 pb-28 md:p-10 md:pb-10 space-y-10 max-w-5xl animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* Title Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
               <div className="space-y-1">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-800 dark:text-slate-100">
                     Participants
                  </h2>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                     <Users className="h-4 w-4 text-purple-600" />
                     {participants.length} Active Residents • Maple House
                  </p>
               </div>
               
               <div className="flex items-center gap-2 rounded-xl bg-purple-50 px-4 py-2 border border-purple-100 shadow-sm">
                  <ShieldAlert className="h-4 w-4 text-purple-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-purple-700">
                     Data minimization applied
                  </span>
               </div>
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {participants.map((p) => {
                  // Only show first letter of last name for privacy on index
                  const names = p.fullName.split(' ');
                  const safeName = names.length > 1 
                    ? `${names[0]} ${names[names.length - 1][0]}.` 
                    : p.fullName;
                    
                  const initials = p.fullName.split(' ').map((n: string) => n[0]).join('');

                  return (
                     <Link 
                        href={`/participants/${p.id}`} 
                        key={p.id}
                        className="group relative overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-800/60 bg-white dark:bg-slate-950 p-6 transition-all hover:bg-slate-50 dark:bg-slate-900 hover:border-purple-200 hover:shadow-md hover:-translate-y-1 shadow-sm shadow-slate-200/50 flex flex-col items-center text-center gap-4"
                     >
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 h-32 w-32 bg-purple-50 rounded-full blur-2xl opacity-60 pointer-events-none -mr-16 -mt-16 group-hover:bg-purple-100 transition-colors" />

                        <Avatar className="h-24 w-24 ring-4 ring-white shadow-md z-10">
                          <AvatarImage src={p.photoUrl || undefined} className="blur-sm group-hover:blur-none transition-all duration-500" />
                          <AvatarFallback className="text-xl font-black bg-purple-100 text-purple-700 uppercase">{initials}</AvatarFallback>
                        </Avatar>

                        <div className="z-10 space-y-1 mt-2">
                           <h3 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100 transition-colors group-hover:text-purple-700">
                              {safeName}
                           </h3>
                           <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                              {p.preferredName ? `Prefers "${p.preferredName}"` : "Resident"}
                           </p>
                        </div>
                        
                        <div className="z-10 mt-4 flex items-center justify-center w-full">
                           <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-purple-600 bg-purple-50 px-4 py-2 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
                              Access Secure File
                              <ArrowRight className="h-4 w-4" />
                           </div>
                        </div>
                     </Link>
                  );
               })}

               {/* Add Participant Skeleton / CTA */}
               <div className="group relative overflow-hidden rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6 transition-all hover:bg-slate-50 dark:bg-slate-900 hover:border-purple-300 flex flex-col items-center justify-center text-center gap-4 min-h-[300px] cursor-pointer">
                  <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-purple-100 group-hover:scale-110 transition-all">
                     <Users className="h-8 w-8 text-slate-400 group-hover:text-purple-600" />
                  </div>
                  <div className="space-y-1">
                     <h3 className="text-lg font-black tracking-tight text-slate-800 dark:text-slate-100">Add Participant</h3>
                     <p className="text-xs font-bold text-slate-400">Register a new resident securely</p>
                  </div>
               </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
