"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Settings2, 
  Mail, 
  ShieldCheck, 
  Loader2, 
  CheckCircle2,
  Home,
  Trash2
} from "lucide-react";
import Link from "next/link";
import { updateStaffUser, deleteUser } from "@/app/actions/users";
import { Role, House } from "@prisma/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface EditStaffClientProps {
  user: any;
  allHouses: House[];
}

export function EditStaffClient({ user, allHouses }: EditStaffClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<Role>(user.role as Role);
  const [selectedHouses, setSelectedHouses] = useState<string[]>(
    user.houses.map((h: any) => h.id)
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    try {
      const result = await updateStaffUser(user.id, { 
        name, 
        email, 
        role,
        houseIds: selectedHouses
      });
      if (result.success) {
        toast.success("Staff profile updated");
        router.push("/admin/users");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to remove this staff member? This cannot be undone.")) return;
    
    setLoading(true);
    try {
      const result = await deleteUser(user.id);
      if (result.success) {
        toast.success("Staff member removed");
        router.push("/admin/users");
      } else {
        toast.error("Failed to remove staff member");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const toggleHouse = (houseId: string) => {
    setSelectedHouses(prev => 
      prev.includes(houseId) 
        ? prev.filter(id => id !== houseId) 
        : [...prev, houseId]
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link 
          href="/admin/users" 
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-purple-600 transition-colors w-fit group"
        >
          <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
          Back to Personnel Hub
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-500/20">
              <Settings2 className="h-7 w-7 text-white stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-[900] tracking-tight text-slate-900 dark:text-slate-100 uppercase">Edit Staff Profile</h1>
              <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Modifying access for {user.name}</p>
            </div>
          </div>
          <button 
            onClick={handleDelete}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-rose-100 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20 text-rose-600 text-[10px] font-black uppercase tracking-widest hover:bg-rose-100 transition-all hover:shadow-lg hover:shadow-rose-500/5 active:scale-95"
          >
            <Trash2 className="h-4 w-4" />
            Remove Staff Member
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <Card className="lg:col-span-2 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-950 p-8 md:p-12 shadow-sm relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Identity Name</Label>
                <Input 
                  name="name" 
                  defaultValue={user.name} 
                  required 
                  className="h-14 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 px-5 text-[14px] font-[900] text-slate-900 dark:text-slate-100 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all uppercase"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Credential Email</Label>
                <div className="relative group">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                   <Input 
                     name="email" 
                     type="email" 
                     defaultValue={user.email} 
                     required 
                     className="h-14 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 pl-12 pr-5 text-[14px] font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                   />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Administrative Role Access</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                 {(['SUPPORT_WORKER', 'TEAM_LEADER', 'ADMIN'] as Role[]).map((r) => (
                   <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={cn(
                        "flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all active:scale-[0.98]",
                        role === r 
                          ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 text-indigo-700 dark:text-indigo-400 shadow-lg shadow-indigo-500/5" 
                          : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-200"
                      )}
                   >
                      <ShieldCheck className={cn("h-6 w-6 stroke-[2.5]", role === r ? "text-indigo-600" : "text-slate-300")} />
                      <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                        {r.replace('_', ' ')}
                      </span>
                   </button>
                 ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Assigned Residence Hubs</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 {allHouses.map((house) => (
                   <button
                      key={house.id}
                      type="button"
                      onClick={() => toggleHouse(house.id)}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all active:scale-[0.98]",
                        selectedHouses.includes(house.id)
                          ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-400 shadow-lg shadow-emerald-500/5"
                          : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-200"
                      )}
                   >
                      <div className={cn(
                        "h-8 w-8 rounded-lg flex items-center justify-center transition-colors",
                        selectedHouses.includes(house.id) ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
                      )}>
                        <Home className="h-4 w-4" />
                      </div>
                      <span className="text-[11px] font-[900] uppercase tracking-widest truncate">
                        {house.name}
                      </span>
                   </button>
                 ))}
              </div>
            </div>

            <div className="pt-6">
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-16 rounded-[1.5rem] bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[12px] font-black uppercase tracking-[0.2em] transition-all hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white shadow-2xl active:scale-95 group"
              >
                {loading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 stroke-[2.5]" />
                    Update Staff Profile
                  </div>
                )}
              </Button>
            </div>
          </form>
        </Card>

        {/* Audit Info */}
        <div className="space-y-6">
           <Card className="rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-8 space-y-6">
              <div className="space-y-6">
                 <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Member Since</h4>
                    <p className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">
                       {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                 </div>
                 <div className="h-px bg-slate-200 dark:bg-slate-800" />
                 <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Total Assignments</h4>
                    <p className="text-xl font-[900] text-slate-900 dark:text-slate-100">
                       {selectedHouses.length} <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Residence Hubs</span>
                    </p>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
