"use client";

import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
   houseName?: string;
}

export function Header({ houseName = "Maple House" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-slate-100/50 bg-white/70 px-8 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-black tracking-tight text-slate-800">SIL Companion</h1>
        <div className="hidden h-5 w-px bg-slate-200 sm:block" />
        <p className="hidden text-xs font-bold uppercase tracking-widest text-slate-400 sm:block">
          {houseName} View
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative hidden w-[320px] lg:block group">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
          <input
            type="search"
            placeholder="Search tasks, staff, or residents..."
            className="h-10 w-full rounded-full border border-slate-200/60 bg-slate-50/50 px-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition-all placeholder:text-slate-400"
          />
        </div>
        
        <button className="relative rounded-full p-2.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-white" />
        </button>

        <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-white shadow-sm">
          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&dpr=2" />
          <AvatarFallback className="bg-purple-100 text-purple-700 font-bold">SW</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
