import { getAllParticipantsAdmin, createAppointment, getParticipantsList } from "@/lib/actions";
import { redirect } from "next/navigation";
import { ArrowLeft, Save, Calendar, User, Clock, MapPin, Car, AlignLeft, ShieldCheck, Plus, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function NewAppointmentStaffPage() {
  const participants = await getParticipantsList();

  async function handleSubmit(formData: FormData) {
    "use server";
    
    const participantId = formData.get("participantId") as string;
    const title = formData.get("title") as string;
    const type = formData.get("type") as string;
    const dateTimeStr = formData.get("dateTime") as string;
    const location = formData.get("location") as string;
    const transportReq = formData.get("transportReq") === "on";
    const transportNotes = formData.get("transportNotes") as string;
    const escortReq = formData.get("escortReq") === "on";
    const prepNotes = formData.get("prepNotes") as string;

    if (!participantId || !title || !dateTimeStr) return;

    await createAppointment({
      participantId,
      title,
      type: type || undefined,
      location: location || undefined,
      dateTime: new Date(dateTimeStr),
      transportReq,
      transportNotes: transportNotes || undefined,
      escortReq,
      prepNotes: prepNotes || undefined
    });

    revalidatePath("/appointments");
    revalidatePath("/");
    redirect("/appointments");
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] selection:bg-purple-100 selection:text-purple-900">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-100/50 dark:bg-purple-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 dark:bg-indigo-900/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto py-12 px-6 md:py-20 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* Navigation & Header */}
        <div className="flex flex-col gap-8 mb-12">
          <Link 
            href="/appointments"
            className="group flex items-center gap-2.5 text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-purple-600 transition-all w-fit"
          >
            <div className="p-2 rounded-full border border-slate-200 dark:border-slate-800 group-hover:border-purple-200 group-hover:bg-purple-50 transition-all">
              <ArrowLeft className="h-3.5 w-3.5" />
            </div>
            Back to Roster
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-xl shadow-purple-500/20">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-3 py-1.5 rounded-full border border-purple-100 dark:border-purple-800/50">
                  New Record
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                Log <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Appointment</span>
              </h1>
              <p className="text-sm md:text-base font-medium text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                Document external medical, social, or therapeutic engagements for house participants. All logs are synced to the daily residence ledger.
              </p>
            </div>
          </div>
        </div>

        <form action={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Main Form Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-[2.5rem] border border-white dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl p-8 md:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border-t-white shadow-purple-900/5">
                
                <div className="space-y-10">
                  {/* Participant Selection */}
                  <div className="space-y-4">
                    <label htmlFor="participantId" className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 ml-1">
                      <User className="h-3.5 w-3.5 text-purple-500" /> Target Resident
                    </label>
                    <div className="relative group">
                      <select
                        id="participantId"
                        name="participantId"
                        required
                        className="w-full h-16 rounded-[1.25rem] border-2 border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950 px-6 text-base font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all appearance-none cursor-pointer group-hover:border-slate-200 dark:group-hover:border-slate-700"
                      >
                        <option value="" disabled selected>Who is this for?</option>
                        {participants.map((p) => (
                          <option key={p.id} value={p.id}>{p.fullName} {p.preferredName ? `(${p.preferredName})` : ''}</option>
                        ))}
                      </select>
                      <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none rotate-90 transition-transform group-focus-within:rotate-[-90deg]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label htmlFor="title" className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 ml-1">
                        <AlignLeft className="h-3.5 w-3.5 text-purple-500" /> Appointment Name
                      </label>
                      <input
                        type="text" id="title" name="title" required
                        placeholder="e.g. Dental Checkup"
                        className="w-full h-16 rounded-[1.25rem] border-2 border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950 px-6 text-base font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                      />
                    </div>

                    <div className="space-y-4">
                      <label htmlFor="type" className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 ml-1">
                        <Calendar className="h-3.5 w-3.5 text-purple-500" /> Category
                      </label>
                      <div className="relative">
                        <select
                          id="type" name="type"
                          className="w-full h-16 rounded-[1.25rem] border-2 border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950 px-6 text-base font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all appearance-none cursor-pointer"
                        >
                          <option value="Medical">Medical / Allied Health</option>
                          <option value="Social">Social / Community</option>
                          <option value="Therapy">Therapy / Day Program</option>
                          <option value="Other">Other Engagement</option>
                        </select>
                        <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none rotate-90" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label htmlFor="dateTime" className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 ml-1">
                        <Clock className="h-3.5 w-3.5 text-purple-500" /> Date & Time
                      </label>
                      <input
                        type="datetime-local" id="dateTime" name="dateTime" required
                        className="w-full h-16 rounded-[1.25rem] border-2 border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950 px-6 text-base font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all"
                      />
                    </div>

                    <div className="space-y-4">
                      <label htmlFor="location" className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 ml-1">
                        <MapPin className="h-3.5 w-3.5 text-purple-500" /> Exact Location
                      </label>
                      <input
                        type="text" id="location" name="location"
                        placeholder="Facility name or address"
                        className="w-full h-16 rounded-[1.25rem] border-2 border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950 px-6 text-base font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  {/* Requirements Section */}
                  <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group relative">
                      <input type="checkbox" id="transportReq" name="transportReq" className="peer hidden" />
                      <label htmlFor="transportReq" className="flex flex-col gap-3 p-6 rounded-[1.5rem] border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 cursor-pointer transition-all peer-checked:border-purple-500 peer-checked:bg-purple-50/50 dark:peer-checked:bg-purple-900/10 hover:border-purple-200">
                        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform">
                          <Car className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="space-y-1">
                           <span className="block text-sm font-black text-slate-800 dark:text-slate-100">Transport Required</span>
                           <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Vehicle logistics needed</span>
                        </div>
                      </label>
                    </div>

                    <div className="group relative">
                      <input type="checkbox" id="escortReq" name="escortReq" className="peer hidden" />
                      <label htmlFor="escortReq" className="flex flex-col gap-3 p-6 rounded-[1.5rem] border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 cursor-pointer transition-all peer-checked:border-purple-500 peer-checked:bg-purple-50/50 dark:peer-checked:bg-purple-900/10 hover:border-purple-200">
                        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform">
                          <ShieldCheck className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="space-y-1">
                           <span className="block text-sm font-black text-slate-800 dark:text-slate-100">Staff Escort (1:1)</span>
                           <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Requires support presence</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Information / Action */}
            <div className="space-y-8">
              <div className="rounded-[2rem] bg-slate-900 dark:bg-purple-900/10 border border-slate-800 dark:border-purple-900/30 p-8 text-white shadow-2xl">
                 <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                    <h3 className="font-black text-sm uppercase tracking-[0.2em]">Log Summary</h3>
                 </div>
                 <div className="space-y-4 mb-10">
                    <div className="flex justify-between items-start pb-4 border-b border-white/5">
                       <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Visibility</span>
                       <span className="text-xs font-black">All House Staff</span>
                    </div>
                    <div className="flex justify-between items-start pb-4 border-b border-white/5">
                       <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Type</span>
                       <span className="text-xs font-black">Clinical Record</span>
                    </div>
                 </div>
                 
                 <div className="space-y-4">
                    <label htmlFor="prepNotes" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Add Prep Instructions</label>
                    <textarea
                      id="prepNotes" name="prepNotes" rows={3}
                      placeholder="What should staff bring?..."
                      className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all placeholder:text-white/20"
                    />
                 </div>

                 <button
                   type="submit"
                   className="w-full mt-8 rounded-[1.25rem] bg-white text-slate-900 h-16 text-sm font-black uppercase tracking-[0.1em] hover:bg-purple-50 transition-all active:scale-[0.98] shadow-xl"
                 >
                   Sync Engagement
                 </button>
              </div>

              <div className="p-8 border border-slate-200 dark:border-slate-800 rounded-[2rem] bg-white/50 dark:bg-slate-900/30">
                 <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-relaxed">
                   Authorized personnel only. All submissions are timestamped and linked to your active session.
                 </p>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
