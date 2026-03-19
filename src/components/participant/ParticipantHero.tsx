"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, User, MapPin, HeartPulse, ShieldAlert, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ParticipantHeroProps {
  participant: any;
}

export function ParticipantHero({ participant }: ParticipantHeroProps) {
  const [isPrivacyProtected, setIsPrivacyProtected] = useState(true);

  // Derive privacy-safe name (e.g., "Liam C.")
  const names = participant.fullName.split(' ');
  const safeName = names.length > 1 
    ? `${names[0]} ${names[names.length - 1][0]}.` 
    : participant.fullName;

  const handleTogglePrivacy = () => {
     // In a real app, this might trigger an audit log API call
     setIsPrivacyProtected(!isPrivacyProtected);
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-white border border-slate-200/60 shadow-sm p-6 md:p-10 transition-all">
      {/* Privacy Mode Banner */}
      <AnimatePresence>
         {isPrivacyProtected && (
            <motion.div 
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="absolute top-0 left-0 right-0 bg-slate-50 border-b border-slate-200/60 p-2 flex items-center justify-center gap-2 z-20"
            >
               <ShieldAlert className="h-4 w-4 text-slate-500" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Privacy Shield Active • Explicit Consent Required to View PII</span>
            </motion.div>
         )}
      </AnimatePresence>

      <div className="absolute top-0 right-0 h-64 w-64 bg-purple-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
        <div className={`relative transition-all duration-500 ${isPrivacyProtected ? "mt-8" : ""}`}>
          <Avatar className="h-28 w-28 md:h-32 md:w-32 ring-4 ring-white shadow-xl">
            <AvatarImage src={isPrivacyProtected ? undefined : (participant.photoUrl || undefined)} className={isPrivacyProtected ? "blur-md" : ""} />
            <AvatarFallback className="text-2xl font-black bg-purple-100 text-purple-700 tracking-tighter">
               {participant.fullName.split(' ').map((n: string)=>n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-2 right-2 h-5 w-5 rounded-full bg-emerald-500 ring-4 ring-white shadow-sm" />
        </div>

        <div className={`flex-1 space-y-5 text-center md:text-left relative z-10 ${isPrivacyProtected ? "mt-6 md:mt-10" : "mt-2 md:mt-0"}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-800">
                   {isPrivacyProtected ? safeName : participant.fullName}
                </h2>
                <Badge variant="outline" className="px-3 py-1 font-black text-[10px] uppercase tracking-widest w-fit mx-auto md:mx-0 bg-emerald-50 text-emerald-700 border-emerald-200">
                   Active Focus
                </Badge>
             </div>
             
             <button 
                onClick={handleTogglePrivacy}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-sm ${
                   isPrivacyProtected 
                   ? "bg-purple-600 text-white hover:bg-purple-700 shadow-purple-200" 
                   : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
             >
                {isPrivacyProtected ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                {isPrivacyProtected ? "Unlock PII" : "Lock PII"}
             </button>
          </div>

          <div className="grid grid-cols-2 lg:flex lg:items-center gap-y-4 lg:gap-x-8 text-sm font-medium text-slate-500 bg-slate-50 rounded-2xl p-4 border border-slate-100/50 w-fit mx-auto md:mx-0">
            <div className="flex items-center gap-2.5">
              <Calendar className="h-4 w-4 text-purple-600 shrink-0" />
              <span className="font-bold whitespace-nowrap">
                 DOB: {isPrivacyProtected ? "**/**/****" : new Date(participant.dob).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-purple-600 shrink-0" />
              <span className="font-bold whitespace-nowrap truncate max-w-[150px]">
                 {isPrivacyProtected ? "Primary Residence" : participant.houseId}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
            {isPrivacyProtected ? (
               <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[0.5rem] bg-slate-100 text-slate-500 text-[10px] uppercase font-black tracking-widest border border-slate-200">
                  <HeartPulse className="h-3.5 w-3.5" />
                  Protected Medical Data
               </div>
            ) : (
               participant.medicalAlerts?.split(',').map((alert: string, i: number) => (
                  <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-[0.5rem] bg-rose-50 text-rose-700 text-[10px] uppercase font-black tracking-widest border border-rose-100">
                     <HeartPulse className="h-3.5 w-3.5" />
                     {alert.trim()}
                  </div>
               ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
