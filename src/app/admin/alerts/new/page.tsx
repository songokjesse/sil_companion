import { getAllParticipantsAdmin, createAlert } from "@/lib/actions";
import { redirect } from "next/navigation";
import { ArrowLeft, Save, AlertTriangle, User, ShieldAlert, AlignLeft } from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function NewAlertPage() {
  const participants = await getAllParticipantsAdmin();

  async function handleSubmit(formData: FormData) {
    "use server";
    
    const participantId = formData.get("participantId") as string;
    const severity = formData.get("severity") as "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    const message = formData.get("message") as string;

    if (!participantId || !severity || !message) return;

    await createAlert({
      participantId,
      severity,
      message,
    });

    revalidatePath("/admin/alerts");
    revalidatePath("/alerts");
    revalidatePath("/"); // Update dashboard metrics
    redirect("/admin/alerts");
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-10">
      <div className="flex flex-col gap-4">
        <Link 
          href="/admin/alerts"
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Ledger
        </Link>

        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100">Issue Alert</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-500 dark:text-rose-400" />
            Broadcast a specific notification regarding a participant
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
                <User className="h-3 w-3" /> Targeted Participant *
              </label>
              <select
                id="participantId"
                name="participantId"
                required
                className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-900 focus:border-rose-400 transition-all text-slate-800 dark:text-slate-100 appearance-none"
              >
                <option value="" disabled selected>Select a registered participant...</option>
                {participants.map((p) => (
                  <option key={p.id} value={p.id}>{p.fullName} • {p.house.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="severity" className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <ShieldAlert className="h-3 w-3" /> Alert Severity *
              </label>
              <select
                id="severity"
                name="severity"
                required
                className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-900 focus:border-rose-400 transition-all text-slate-800 dark:text-slate-100 appearance-none"
              >
                <option value="LOW">Low (FYI / General Notice)</option>
                <option value="MEDIUM">Medium (Standard Alert)</option>
                <option value="HIGH">High (Important Behavior/Health Note)</option>
                <option value="CRITICAL">Critical (Immediate Call to Action)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <AlignLeft className="h-3 w-3" /> Notification Content *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Details regarding the alert..."
                className="w-full rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-900 focus:border-rose-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-100"
              />
            </div>

          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-rose-600 px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-rose-700 shadow-lg shadow-rose-200 dark:shadow-none hover:-translate-y-0.5"
          >
            <Save className="h-4 w-4 shrink-0" />
            Issue Notification
          </button>
        </div>
      </form>
    </div>
  );
}
