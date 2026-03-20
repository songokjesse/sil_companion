import { getAllParticipantsAdmin, createAppointment, getParticipantsList } from "@/lib/actions";
import { redirect } from "next/navigation";
import { ArrowLeft, Save, Calendar, User, Clock, MapPin, Car, AlignLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function NewAppointmentStaffPage() {
  // Workers typically work within a house. We could filter this, 
  // but for MVP functionality, we'll allow selection of any participant they need to log for.
  const participants = await getParticipantsList(); // Defaults to Maple House

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
    <div className="space-y-6 max-w-4xl mx-auto py-10 px-4">
      <div className="flex flex-col gap-4">
        <Link 
          href="/appointments"
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Appointments
        </Link>

        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100">Log Appointment</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            Support Worker Entry • House Record
          </p>
        </div>
      </div>

      <form action={handleSubmit} className="space-y-6">
        <div className="rounded-[2rem] border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 p-6 md:p-10 shadow-sm shadow-slate-200/50 dark:shadow-none relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 h-64 w-64 bg-purple-50 dark:bg-slate-950 rounded-full blur-3xl opacity-50 pointer-events-none -mt-32 -mr-32" />

          <div className="space-y-8 relative z-10">
            <div className="space-y-2">
              <label htmlFor="participantId" className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <User className="h-3 w-3" /> Select Participant *
              </label>
              <select
                id="participantId"
                name="participantId"
                required
                className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 focus:border-purple-400 transition-all text-slate-800 dark:text-slate-100 appearance-none"
              >
                <option value="" disabled selected>Who is the appointment for?</option>
                {participants.map((p) => (
                  <option key={p.id} value={p.id}>{p.fullName} {p.preferredName ? `(${p.preferredName})` : ''}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <AlignLeft className="h-3 w-3" /> Appointment Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="e.g. Eye Specialist"
                  className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 focus:border-purple-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="type" className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" /> Category
                </label>
                <select
                  id="type"
                  name="type"
                  className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 focus:border-purple-400 transition-all text-slate-800 dark:text-slate-100 appearance-none"
                >
                  <option value="Medical">Medical / Allied Health</option>
                  <option value="Social">Social / Community</option>
                  <option value="Therapy">Therapy / Day Program</option>
                  <option value="Other">Other Engagement</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="dateTime" className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> Date and Time *
                </label>
                <input
                  type="datetime-local"
                  id="dateTime"
                  name="dateTime"
                  required
                  className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 focus:border-purple-400 transition-all text-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" /> Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Where is the appointment?"
                  className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 focus:border-purple-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <label className="flex items-center gap-3 rounded-xl border border-purple-200/60 dark:border-purple-900/40 bg-purple-50/60 dark:bg-purple-950/20 p-4 cursor-pointer hover:bg-purple-100/50 dark:hover:bg-purple-950/40 transition-colors w-full h-full min-h-[60px]">
                     <input
                       type="checkbox"
                       id="transportReq"
                       name="transportReq"
                       className="h-5 w-5 rounded border-purple-300 dark:border-purple-700 text-purple-600 focus:ring-purple-200 dark:focus:ring-purple-900"
                     />
                     <div className="flex flex-col">
                        <span className="text-[11px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                          <Car className="h-3.5 w-3.5" /> Transport Required
                        </span>
                     </div>
                  </label>

                  <input
                    type="text"
                    id="transportNotes"
                    name="transportNotes"
                    placeholder="Transport logistics / notes"
                    className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 focus:border-purple-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-100"
                  />
               </div>

               <div className="space-y-4">
                  <label className="flex items-center gap-3 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/40 p-4 cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-900 transition-colors w-full h-full min-h-[60px]">
                     <input
                       type="checkbox"
                       id="escortReq"
                       name="escortReq"
                       className="h-5 w-5 rounded border-slate-300 dark:border-slate-700 text-purple-600 focus:ring-purple-200 dark:focus:ring-purple-900"
                     />
                     <div className="flex flex-col">
                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5" /> Staff Escort (1:1)
                        </span>
                     </div>
                  </label>

                  <textarea
                    id="prepNotes"
                    name="prepNotes"
                    rows={2}
                    placeholder="Preparation notes (What to bring...)"
                    className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 focus:border-purple-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-100"
                  />
               </div>
            </div>

          </div>
        </div>

        <div className="flex justify-end pt-4 pb-10">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full md:w-auto rounded-2xl bg-purple-600 px-12 py-5 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-purple-700 shadow-xl shadow-purple-100 dark:shadow-none hover:-translate-y-0.5 active:scale-95"
          >
            <Save className="h-5 w-5 shrink-0" />
            Log Appointment
          </button>
        </div>
      </form>
    </div>
  );
}
