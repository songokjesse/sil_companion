import { getHouses, createParticipant } from "@/lib/actions";
import { redirect } from "next/navigation";
import { ShieldCheck, UserPlus, ArrowLeft, Building2, Calendar, User, Save, Lock } from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function NewParticipantPage() {
  const houses = await getHouses();

  async function handleSubmit(formData: FormData) {
    "use server";
    
    const fullName = formData.get("fullName") as string;
    const preferredName = formData.get("preferredName") as string;
    const dobString = formData.get("dob") as string;
    const houseId = formData.get("houseId") as string;

    if (!fullName || !dobString || !houseId) return;

    await createParticipant({
      fullName,
      preferredName: preferredName || undefined,
      dob: new Date(dobString),
      houseId,
    });

    revalidatePath("/admin/participants");
    revalidatePath("/participants");
    redirect("/admin/participants");
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-10">
      <div className="flex flex-col gap-4">
        <Link 
          href="/admin/participants"
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-purple-600 transition-colors w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Registry
        </Link>

        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-800">Register Resident</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Minimal Data Profile • Only required operational fields are collected here
          </p>
        </div>
      </div>

      <form action={handleSubmit} className="space-y-6">
        <div className="rounded-[2rem] border border-slate-200/60 bg-white p-6 md:p-10 shadow-sm shadow-slate-200/50 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 h-64 w-64 bg-slate-50 rounded-full blur-3xl opacity-50 pointer-events-none -mt-32 -mr-32" />

          <div className="space-y-8 relative z-10">
            {/* Disclaimer Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-4 items-start">
               <div className="mt-0.5 p-2 rounded-xl bg-amber-100/50 shrink-0">
                  <Lock className="h-5 w-5 text-amber-600" />
               </div>
               <div className="space-y-1">
                  <h4 className="text-sm font-black tracking-tight text-amber-800">Do not enter sensitive clinical data.</h4>
                  <p className="text-xs font-medium text-amber-700/80 leading-relaxed">
                     This interface is strictly for establishing Local Operations routing. Full medical histories, diagnosis codes, and care plans must exclusively reside in the Master EHR system.
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                  <User className="h-3 w-3" /> Full Legal Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="e.g. Liam Carter"
                  className="w-full rounded-xl border border-slate-200/60 bg-slate-50/50 px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="preferredName" className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                  <User className="h-3 w-3" /> Preferred Name / Alias
                </label>
                <input
                  type="text"
                  id="preferredName"
                  name="preferredName"
                  placeholder="e.g. Liam"
                  className="w-full rounded-xl border border-slate-200/60 bg-slate-50/50 px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="dob" className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" /> Date of Birth *
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  required
                  className="w-full rounded-xl border border-slate-200/60 bg-slate-50/50 px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all text-slate-800"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="houseId" className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                  <Building2 className="h-3 w-3" /> Primary Residence *
                </label>
                <select
                  id="houseId"
                  name="houseId"
                  required
                  className="w-full rounded-xl border border-slate-200/60 bg-slate-50/50 px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all text-slate-800 appearance-none"
                >
                  <option value="" disabled selected>Select an assignment facility...</option>
                  {houses.map((h) => (
                    <option key={h.id} value={h.id}>{h.name}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-purple-700 shadow-lg shadow-purple-200 hover:-translate-y-0.5"
          >
            <Save className="h-4 w-4" />
            Initialize Resident Profile
          </button>
        </div>
      </form>
    </div>
  );
}
