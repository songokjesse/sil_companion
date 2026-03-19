import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, MoreVertical, ShieldCheck, UserCircle2, Filter, Link as LinkIcon, Lock } from "lucide-react";
import Link from "next/link";

export default async function ParticipantManagement() {
  const participants = await prisma.participant.findMany({
    include: { house: true }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-slate-800">Resident Registry</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
               <ShieldCheck className="h-4 w-4 text-purple-600" />
               Minimal Data Storage Policy Active • EHR Sync Enabled
            </p>
         </div>
         <div className="flex gap-2">
            <Button variant="outline" className="font-bold border-slate-200">
               <Filter className="h-4 w-4 mr-2" />
               Filter
            </Button>
            <Link href="/admin/participants/new" className="inline-flex items-center justify-center rounded-md font-bold bg-purple-600 px-4 py-2 hover:bg-purple-700 shadow-lg shadow-purple-100 text-white transition-colors text-sm">
                 <UserPlus className="h-4 w-4 mr-2" />
                 Register New Resident
            </Link>
         </div>
      </div>

      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
         <Table>
            <TableHeader className="bg-slate-50 border-b border-slate-200/60">
               <TableRow>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 py-4 px-6 h-auto">Participant Identity</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 px-6 h-auto">Placement</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 px-6 h-auto">Clinical Data Link</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 px-6 h-auto">Status</TableHead>
                  <TableHead className="text-right"></TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {participants.map((p) => (
                  <TableRow key={p.id} className="hover:bg-slate-50 transition-colors border-b border-slate-100/50">
                     <TableCell className="py-4 px-6">
                        <div className="flex items-center gap-4">
                           <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center font-black text-purple-700 tracking-tighter">
                              {p.fullName?.[0]}
                           </div>
                           <div className="flex flex-col text-slate-800">
                              <span className="font-black text-sm tracking-tight">{p.fullName}</span>
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 flex flex-wrap items-center gap-1.5">
                                 <LinkIcon className="h-3 w-3" />
                                 SysID: EXT-{p.id.slice(0, 6).toUpperCase()}
                              </span>
                           </div>
                        </div>
                     </TableCell>
                     <TableCell className="px-6">
                        <div className="flex items-center gap-2 font-bold text-[11px] uppercase tracking-widest text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg w-fit">
                           {p.house.name}
                        </div>
                     </TableCell>
                     <TableCell className="px-6">
                        <div className="flex flex-wrap gap-2 max-w-[200px]">
                            <Badge variant="outline" className="text-[9px] font-black border-slate-200 bg-white text-slate-500 uppercase tracking-widest px-2.5 py-1">
                               <Lock className="h-3 w-3 mr-1.5" />
                               Remote EHR Data
                            </Badge>
                        </div>
                     </TableCell>
                     <TableCell className="px-6">
                        <div className="flex items-center gap-2">
                           <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 mt-0.5">Synced</span>
                        </div>
                     </TableCell>
                     <TableCell className="text-right px-6">
                        <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-slate-800 shadow-md shadow-slate-200/50">
                           Manage Link
                        </button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
    </div>
  );
}
