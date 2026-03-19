"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, User, MapPin, Phone, HeartPulse, Accessibility, Truck } from "lucide-react";
import { motion } from "framer-motion";

interface ParticipantHeroProps {
  participant: any;
}

export function ParticipantHero({ participant }: ParticipantHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border shadow-sm p-8">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 h-40 w-40 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl" />
      
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
        <div className="relative">
          <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
            <AvatarImage src={participant.photoUrl || ""} />
            <AvatarFallback className="text-2xl font-bold">{participant.fullName.split(' ').map((n: string)=>n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-2 right-2 h-5 w-5 rounded-full bg-green-500 border-2 border-white" />
        </div>

        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
             <h2 className="text-3xl font-extrabold tracking-tight">{participant.fullName}</h2>
             <Badge variant="secondary" className="px-3 py-1 font-bold text-xs w-fit mx-auto md:mx-0">Active Resident</Badge>
          </div>

          <div className="grid grid-cols-2 md:flex md:items-center gap-y-4 md:gap-x-6 text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>DOB: {new Date(participant.dob).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{participant.houseId}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
            {participant.medicalAlerts?.split(',').map((alert: string, i: number) => (
               <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 text-xs font-bold border border-purple-100">
                  <HeartPulse className="h-3.5 w-3.5" />
                  {alert.trim()}
               </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
