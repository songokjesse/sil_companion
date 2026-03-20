import { createHouse } from "@/lib/actions";
import { redirect } from "next/navigation";
import { Building2, ArrowLeft, Save, MapPin } from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default function NewHousePage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    
    const name = formData.get("name") as string;
    
    if (!name) return;

    await createHouse(name);

    revalidatePath("/admin/houses");
    redirect("/admin/houses");
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-10">
      <div className="flex flex-col gap-4">
        <Link 
          href="/admin/houses"
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-purple-600 transition-colors w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Resource Management
        </Link>

        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100">Provision New House</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-emerald-600" />
            Add a new physical site to your organizational registry
          </p>
        </div>
      </div>

      <form action={handleSubmit} className="space-y-6">
        <div className="rounded-[2rem] border border-slate-200 dark:border-slate-800/60 bg-white dark:bg-slate-950 p-6 md:p-10 shadow-sm shadow-slate-200/50 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 h-64 w-64 bg-slate-50 dark:bg-slate-900 rounded-full blur-3xl opacity-50 pointer-events-none -mt-32 -mr-32" />

          <div className="space-y-8 relative z-10">
            <div className="space-y-2 max-w-lg">
              <label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Building2 className="h-3 w-3" /> House/Facility Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="e.g. Oakwood Residence"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all placeholder:text-slate-400"
              />
            </div>
            
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 italic max-w-md leading-relaxed">
               Note: To maintain operational simplicity, houses are globally registered within your primary Organization context automatically upon creation.
            </p>
          </div>
        </div>

        <div className="flex justify-start pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-purple-700 shadow-lg shadow-purple-200 hover:-translate-y-0.5"
          >
            <Save className="h-4 w-4 shrink-0" />
            Provision Facility
          </button>
        </div>
      </form>
    </div>
  );
}
