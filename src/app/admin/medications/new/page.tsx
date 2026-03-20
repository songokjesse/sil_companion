import { getAllParticipantsAdmin, createMedication } from "@/lib/actions";
import { redirect } from "next/navigation";
import { ArrowLeft, Save, BriefcaseMedical, User, Pill, Clock, ShieldAlert, AlignLeft } from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function NewMedicationPage() {
  const participants = await getAllParticipantsAdmin();

  async function handleSubmit(formData: FormData) {
    "use server";
    
    const participantId = formData.get("participantId") as string;
    const name = formData.get("name") as string;
    const dosage = formData.get("dosage") as string;
    const instructions = formData.get("instructions") as string;
    const timeDue = formData.get("timeDue") as string;
    const isCritical = formData.get("isCritical") === "on";

    if (!participantId || !name || !dosage || !timeDue) return;

    await createMedication({
      participantId,
      name,
      dosage,
      instructions: instructions || undefined,
      timeDue,
      isCritical
    });

    revalidatePath("/admin/medications");
    revalidatePath("/medications");
    redirect("/admin/medications");
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-10">
      <div className="flex flex-col gap-4">
        <Link 
          href="/admin/medications"
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Registry
        </Link>

        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100">Provision Medication</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <BriefcaseMedical className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Establish a new targeted delivery schedule for a resident
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
                className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 focus:border-purple-400 transition-all text-slate-800 dark:text-slate-100 appearance-none"
              >
                <option value="" disabled selected>Select a registered participant...</option>
                {participants.map((p) => (
                  <option key={p.id} value={p.id}>{p.fullName} • {p.house.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Pill className="h-3 w-3" /> Prescribed Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. Epilim"
                  className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 focus:border-purple-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="dosage" className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <AlignLeft className="h-3 w-3" /> Dosage String *
                </label>
                <input
                  type="text"
                  id="dosage"
                  name="dosage"
                  required
                  placeholder="e.g. 500mg (2x Tablets)"
                  className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 focus:border-purple-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="timeDue" className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> Scheduled Time *
                </label>
                <input
                  type="time"
                  id="timeDue"
                  name="timeDue"
                  required
                  className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 focus:border-purple-400 transition-all text-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="space-y-2 flex flex-col justify-end">
                <label className="flex items-center gap-3 rounded-xl border border-rose-200/60 dark:border-rose-900/40 bg-rose-50/60 dark:bg-rose-950/20 p-4 cursor-pointer hover:bg-rose-100/50 dark:hover:bg-rose-950/40 transition-colors w-full h-full min-h-[50px]">
                  <input
                    type="checkbox"
                    id="isCritical"
                    name="isCritical"
                    className="h-4 w-4 rounded border-rose-300 dark:border-rose-700 text-rose-600 focus:ring-rose-200 dark:focus:ring-rose-900"
                  />
                  <div className="flex flex-col">
                     <span className="text-[11px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                       <ShieldAlert className="h-3 w-3" /> Flag as Critical Delivery
                     </span>
                     <span className="text-[10px] font-bold text-rose-500/80 dark:text-rose-500/80">Requires strict verification logging</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="instructions" className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <AlignLeft className="h-3 w-3" /> Prep / Delivery Instructions
              </label>
              <textarea
                id="instructions"
                name="instructions"
                rows={3}
                placeholder="e.g. Must be taken with food. Do not crush."
                className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 focus:border-purple-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-100"
              />
            </div>

          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-purple-700 shadow-lg shadow-purple-200 dark:shadow-none hover:-translate-y-0.5"
          >
            <Save className="h-4 w-4 shrink-0" />
            Provision Schedule
          </button>
        </div>
      </form>
    </div>
  );
}
