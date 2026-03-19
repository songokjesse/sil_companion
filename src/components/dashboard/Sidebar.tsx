"use client";

import { 
  BarChart, 
  Calendar, 
  Clock, 
  Home, 
  LayoutDashboard, 
  Settings, 
  Users,
  BriefcaseMedical,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const menuItems = [
  { icon: LayoutDashboard, label: "Today Dashboard", active: true },
  { icon: Users, label: "Participants", active: false },
  { icon: BriefcaseMedical, label: "Medications", active: false },
  { icon: Calendar, label: "Appointments", active: false },
  { icon: Clock, label: "Routines", active: false },
  { icon: ShieldCheck, label: "Alerts", active: false },
];

const houses = [
  { name: "Maple House", active: true },
  { name: "Oak Residence", active: false },
  { name: "Willow Grove", active: false },
];

export function Sidebar() {
  return (
    <aside className="sticky top-0 h-screen w-80 flex flex-col border-r bg-muted/40 p-4 transition-all overflow-y-auto">
      <div className="flex items-center gap-3 mb-8 ml-3">
        <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-orange-600 shadow-lg shadow-orange-200">
          <ShieldCheck className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-primary">SILCompanion</h2>
      </div>

      <nav className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2 px-3">Main Menu</p>
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "group flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all hover:bg-muted active:scale-[0.98]",
              item.active && "bg-white shadow-sm shadow-black/5 text-primary"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary",
              item.active && "text-orange-600"
            )} />
            {item.label}
            {item.active && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-orange-600" />}
          </button>
        ))}
      </nav>

      <div className="mt-8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2 px-3">Your Houses</p>
        <div className="space-y-1">
          {houses.map((house) => (
            <button
              key={house.name}
              className={cn(
                "group flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm font-medium transition-all hover:bg-muted active:scale-[0.98]",
                house.active ? "text-primary bg-muted/50" : "text-muted-foreground"
              )}
            >
              <span className="truncate">{house.name}</span>
              <ChevronRight className={cn(
                "h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100",
                house.active && "opacity-100 text-primary"
              )} />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6">
        <Separator className="mb-4 opacity-50" />
        <button className="group flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-primary">
          <Settings className="h-5 w-5 transition-transform group-hover:rotate-45" />
          Settings
        </button>
      </div>
    </aside>
  );
}
