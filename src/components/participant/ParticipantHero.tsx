"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, User, MapPin, Phone, HeartPulse, Accessibility, Truck } from "lucide-react";
import { motion } from "framer-motion";

export function ParticipantHero() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border shadow-sm p-8">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 h-40 w-40 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl" />
      
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
        <div className="relative">
          <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
            <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&h=256&dpr=2" />
            <AvatarFallback className="text-2xl font-bold">LC</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-2 right-2 h-5 w-5 rounded-full bg-green-500 border-2 border-white" />
        </div>

        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
             <h2 className="text-3xl font-extrabold tracking-tight">Liam Chen</h2>
             <Badge variant="secondary" className="px-3 py-1 font-bold text-xs w-fit mx-auto md:mx-0">Active Resident</Badge>
          </div>

          <div className="grid grid-cols-2 md:flex md:items-center gap-y-4 md:gap-x-6 text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>DOB: 12/05/1992 (33 yrs)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Maple House, Room 4</span>
            </div>
             <div className="flex items-center gap-2">
              <Accessibility className="h-4 w-4 text-primary" />
              <span>Wheelchair - Manual</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              <span>Requires Hoist</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-bold border border-red-100">
               <HeartPulse className="h-3.5 w-3.5" />
               Severe Nut Allergy
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 text-xs font-bold border border-orange-100">
               <User className="h-3.5 w-3.5" />
               Uses Picture Board
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
               <Phone className="h-3.5 w-3.5" />
               Emergency: Mary Chen (Sister)
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto">
          <button className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:opacity-90">
             Edit Profile
          </button>
          <button className="rounded-xl border bg-white px-6 py-3 text-sm font-bold text-primary transition-all hover:bg-muted">
             View Documents
          </button>
        </div>
      </div>
    </div>
  );
}
