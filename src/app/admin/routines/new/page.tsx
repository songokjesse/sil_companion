import { getAllParticipantsAdmin, createRoutine } from "@/lib/actions";
import { redirect } from "next/navigation";
import { ArrowLeft, Save, ClipboardList, User, Clock, AlignLeft, CalendarRange } from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function NewRoutinePage() {
  const participants = await getAllParticipantsAdmin();

  async function handleSubmit(formData: FormData) {
    "use server";
    
    const participantId = formData.get("participantId") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const frequency = formData.get("frequency") as string;
    const timeDue = formData.get("timeDue") as string;

    if (!participantId || !title || !frequency) return;

    await createRoutine({
      participantId,
      title,
      description: description || undefined,
      frequency,
      timeDue: timeDue || undefined
    });

    revalidatePath("/admin/routines");
    revalidatePath("/routines");
    redirect("/admin/routines");
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-10">
      <div className="flex flex-col gap-4">
        <Link 
          href="/admin/routines"
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Ledger
        </Link>

        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100">Provision Routine</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Establish a new skill-building task or daily requirement
          </p>
        </div>
      </div>

      <form action={handleSubmit} className="space-y-6">
        <div className="rounded-[2rem] border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 p-6 md:p-10 shadow-sm shadow-slate-200/50 dark:shadow-none relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 h-64 w-64 bg-slate-50 dark:bg-slate-950 rounded-full blur-3xl opacity-50 pointer-events-none -mt-32 -mr-32" />

          <div className="space-y-8 relative z-10">
            <div className="space-y-2">
              <label htmlFor="participantId" className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <User className="h-3 w-3" /> Target Resident *
              </label>
              <select
                id="participantId"
                name="participantId"
                required
                className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 focus:border-emerald-400 transition-all text-slate-800 dark:text-slate-100 appearance-none"
              >
                <option value="" disabled selected>Select a registered participant...</option>
                {participants.map((p) => (
                  <option key={p.id} value={p.id}>{p.fullName} • {p.house.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <AlignLeft className="h-3 w-3" /> Task / Routine Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="e.g. Shower Routine, Laundry Day"
                  className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 focus:border-emerald-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="frequency" className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <CalendarRange className="h-3 w-3" /> Frequency Rule *
                </label>
                <select
                  id="frequency"
                  name="frequency"
                  required
                  className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 focus:border-emerald-400 transition-all text-slate-800 dark:text-slate-100 appearance-none"
                >
                  <option value="DAILY">Daily (Every day)</option>
                  <option value="MON-FRI">Weekdays (Mon-Fri)</option>
                  <option value="WEEKENDS">Weekends (Sat-Sun)</option>
                  <option value="WEEKLY">Weekly</option>
                  <option value="AS-NEEDED">As Needed (PRN)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="timeDue" className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> Target Time (Optional)
                </label>
                <input
                  type="time"
                  id="timeDue"
                  name="timeDue"
                  className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 focus:border-emerald-400 transition-all text-slate-800 dark:text-slate-100 w-fit"
                />
                <p className="text-[10px] text-slate-500 font-bold mt-1">Leave blank if routine spans the entire day.</p>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <AlignLeft className="h-3 w-3" /> Support Instructions & Details
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="e.g. Prompt participant to gather towels before starting. Provide verbal prompts only."
                className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 focus:border-emerald-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-100"
              />
            </div>

          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-emerald-700 shadow-lg shadow-emerald-200 dark:shadow-none hover:-translate-y-0.5"
          >
            <Save className="h-4 w-4 shrink-0" />
            Provision Routine
          </button>
        </div>
      </form>
    </div>
  );
}
