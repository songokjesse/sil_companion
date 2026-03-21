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
  Loader2,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface UserRoleSelectProps {
  userId: string;
  currentRole: Role;
}

const roleConfig = {
  ADMIN: {
    label: "Administrator",
    shortLabel: "Admin",
    icon: ShieldAlert,
    color: "text-rose-600 bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/40",
    menuColor: "hover:bg-rose-50/50 dark:hover:bg-rose-950/30",
    indicator: "bg-rose-500"
  },
  TEAM_LEADER: {
    label: "Team Leader",
    shortLabel: "Leader",
    icon: Shield,
    color: "text-indigo-600 bg-indigo-50 border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900/40",
    menuColor: "hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30",
    indicator: "bg-indigo-500"
  },
  SUPPORT_WORKER: {
    label: "Support Worker",
    shortLabel: "Staff",
    icon: UserIcon,
    color: "text-slate-600 bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800",
    menuColor: "hover:bg-slate-50/50 dark:hover:bg-slate-900/50",
    indicator: "bg-slate-500"
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
        toast.success(`Access level updated to ${newRole.replace("_", " ")}`);
      } else {
        toast.error("Failed to update access level");
      }
    } catch (error) {
      toast.error("Connection error");
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
          "group flex items-center gap-2.5 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50",
          current.color,
          isOpen && "ring-4 ring-slate-100 dark:ring-slate-900 shadow-sm"
        )}
      >
        <div className="relative">
          {loading ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <current.icon className={cn("h-3.5 w-3.5 stroke-[2.5]", isOpen ? "animate-bounce" : "")} />
          )}
        </div>
        <span className="hidden sm:inline">{current.label}</span>
        <span className="sm:hidden">{current.shortLabel}</span>
        <ChevronDown className={cn("h-3 w-3 ml-1 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-900/5 backdrop-blur-[1px]" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="absolute top-full left-0 mt-2 w-52 rounded-[1.5rem] border border-slate-200/60 dark:border-slate-800/60 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden py-1.5"
            >
              <div className="px-3 py-2 mb-1 border-b border-slate-100 dark:border-slate-800/60">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Select Access Level</span>
              </div>
              {(Object.entries(roleConfig) as [Role, typeof roleConfig.ADMIN][]).map(([role, config]) => (
                <button
                  key={role}
                  onClick={() => handleRoleChange(role)}
                  className={cn(
                    "flex w-full items-center justify-between px-3 py-2.5 text-[11px] font-black tracking-tight uppercase transition-all",
                    config.menuColor,
                    role === currentRole ? "text-slate-900 dark:text-white" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  )}
                >
                  <div className="flex items-center gap-3">
                     <div className={cn("h-1.5 w-1.5 rounded-full", role === currentRole ? config.indicator : "bg-transparent")} />
                     <config.icon className={cn("h-4 w-4 stroke-[2]", role === currentRole ? "text-slate-900 dark:text-white" : "text-slate-300")} />
                     {config.label}
                  </div>
                  {role === currentRole && (
                    <Check className="h-3.5 w-3.5 text-emerald-500 stroke-[3]" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
