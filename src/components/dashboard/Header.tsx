"use client";

import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
   houseName?: string;
}

export function Header({ houseName = "Maple House" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold tracking-tight text-primary">SIL Companion</h1>
        <div className="hidden h-6 w-px bg-border sm:block" />
        <p className="hidden text-sm font-medium text-muted-foreground sm:block">
          {houseName} Dashboard
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden w-64 md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search participants..."
            className="h-9 w-full rounded-md border border-input bg-muted px-9 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        
        <button className="relative rounded-full p-2 hover:bg-muted">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
        </button>

        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&dpr=2" />
          <AvatarFallback>SW</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
