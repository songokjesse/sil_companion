"use client";

import { useState } from "react";
import { Role } from "@prisma/client";
import { updateUserRole } from "@/app/actions/users";
import { toast } from "sonner";
import { 
  Shield, 
  User as UserIcon, 
  ShieldAlert,
  ChevronDown,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserRoleSelectProps {
  userId: string;
  currentRole: Role;
}

const roleConfig = {
  ADMIN: {
    label: "Administrator",
    icon: ShieldAlert,
    color: "text-rose-600 bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30",
  },
  TEAM_LEADER: {
    label: "Team Leader",
    icon: Shield,
    color: "text-indigo-600 bg-indigo-50 border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900/30",
  },
  SUPPORT_WORKER: {
    label: "Support Worker",
    icon: UserIcon,
    color: "text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30",
  },
};

export function UserRoleSelect({ userId, currentRole }: UserRoleSelectProps) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleRoleChange = async (newRole: Role) => {
    if (newRole === currentRole) return;
    
    setLoading(true);
    setIsOpen(false);
    
    try {
      const result = await updateUserRole(userId, newRole);
      if (result.success) {
        toast.success(`Role updated to ${newRole.replace("_", " ")}`);
      } else {
        toast.error("Failed to update role");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const current = roleConfig[currentRole];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50",
          current.color
        )}
      >
        {loading ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <current.icon className="h-3 w-3" />
        )}
        {current.label}
        <ChevronDown className={cn("h-3 w-3 ml-1 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute top-full left-0 mt-2 w-48 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
            {(Object.entries(roleConfig) as [Role, typeof roleConfig.ADMIN][]).map(([role, config]) => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-3 text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors border-b last:border-0 border-slate-100 dark:border-slate-900",
                  role === currentRole && "text-purple-600 dark:text-purple-400 bg-purple-50/30"
                )}
              >
                <config.icon className={cn("h-4 w-4", role === currentRole ? "text-purple-600" : "text-slate-400")} />
                {config.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
