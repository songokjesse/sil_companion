"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  UserPlus, 
  Mail, 
  ShieldCheck, 
  Loader2, 
  CheckCircle2,
  Users
} from "lucide-react";
import Link from "next/link";
import { createStaffUser } from "@/app/actions/users";
import { Role } from "@prisma/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function NewStaffPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<Role>("SUPPORT_WORKER");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    try {
      const result = await createStaffUser({ name, email, role });
      if (result.success) {
        toast.success("Staff member added successfully");
        router.push("/admin/users");
      } else {
        toast.error(result.error || "Failed to add staff member");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link 
          href="/admin/users" 
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-purple-600 transition-colors w-fit group"
        >
          <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
          Back to Staff List
        </Link>
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-[1.5rem] bg-slate-900 dark:bg-white flex items-center justify-center shadow-xl shadow-slate-200 dark:shadow-none">
            <UserPlus className="h-7 w-7 text-white dark:text-slate-900 stroke-[2.5]" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-[900] tracking-tight text-slate-900 dark:text-slate-100 uppercase">Onboard New Staff</h1>
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Create a permanent organization account</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <Card className="lg:col-span-2 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-950 p-8 md:p-12 shadow-sm relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 h-40 w-40 bg-purple-100/30 dark:bg-purple-900/10 rounded-full blur-3xl pointer-events-none -mt-20 -mr-20" />
          
          <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</Label>
                <div className="relative group">
                  <Input 
                    name="name" 
                    placeholder="e.g. Sarah Jenkins" 
                    required 
                    className="h-14 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 px-5 text-[14px] font-bold focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all"
                  />
                  <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500 opacity-0 group-focus-within:opacity-100 transition-opacity" />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Work Email Address</Label>
                <div className="relative group">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-purple-500 transition-colors" />
                   <Input 
                     name="email" 
                     type="email" 
                     placeholder="sarah.j@sil-residence.com" 
                     required 
                     className="h-14 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 pl-12 pr-5 text-[14px] font-bold focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all"
                   />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Initial Access Level</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                   {(['SUPPORT_WORKER', 'TEAM_LEADER', 'ADMIN'] as Role[]).map((r) => (
                     <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={cn(
                          "flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all active:scale-[0.98]",
                          role === r 
                            ? "bg-purple-50 dark:bg-purple-900/20 border-purple-500 text-purple-700 dark:text-purple-400 shadow-lg shadow-purple-500/5" 
                            : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-200"
                        )}
                     >
                        <ShieldCheck className={cn("h-6 w-6 stroke-[2.5]", role === r ? "text-purple-600" : "text-slate-300")} />
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none truncate w-full px-1">
                          {r.replace('_', ' ')}
                        </span>
                     </button>
                   ))}
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-16 rounded-[1.5rem] bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[12px] font-black uppercase tracking-[0.2em] transition-all hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white shadow-2xl active:scale-95 group"
              >
                {loading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 stroke-[2.5]" />
                    Complete Activation
                  </div>
                )}
              </Button>
            </div>
          </form>
        </Card>

        {/* Sidebar Info */}
        <div className="space-y-6">
           <Card className="rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-8 space-y-6">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 w-fit border border-slate-100 dark:border-slate-800 shadow-sm">
                 <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="space-y-3">
                 <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-slate-100">Direct Activation</h4>
                 <p className="text-[11px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest">
                   You are creating a permanent system account. This staff member will be able to log in immediately using their work email.
                 </p>
              </div>
              <div className="h-px bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-3">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Security Note</h4>
                 <ul className="space-y-2">
                    {['Automated Org Assignment', 'Role-Based Access Control', 'Encrypted Credentials'].map(note => (
                      <li key={note} className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                         <div className="h-1 w-1 rounded-full bg-emerald-500" />
                         {note}
                      </li>
                    ))}
                 </ul>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
