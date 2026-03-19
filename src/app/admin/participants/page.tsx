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
import { UserPlus, MoreVertical, HeartPulse, UserCircle2, Filter } from "lucide-react";

export default async function ParticipantManagement() {
  const participants = await prisma.participant.findMany({
    include: { house: true }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-primary">Resident Registry</h1>
            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
               <UserCircle2 className="h-4 w-4 text-purple-600" />
               Manage organization residents, mobility needs, and house placements.
            </p>
         </div>
         <div className="flex gap-2">
            <Button variant="outline" className="font-bold border-slate-200">
               <Filter className="h-4 w-4 mr-2" />
               Filter
            </Button>
            <Button className="font-bold bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-100">
               <UserPlus className="h-4 w-4 mr-2" />
               Register New Resident
            </Button>
         </div>
      </div>

      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
         <Table>
            <TableHeader className="bg-slate-50">
               <TableRow>
                  <TableHead className="font-black text-xs uppercase tracking-widest text-slate-500 py-4">Participant</TableHead>
                  <TableHead className="font-black text-xs uppercase tracking-widest text-slate-500">Placement</TableHead>
                  <TableHead className="font-black text-xs uppercase tracking-widest text-slate-500">Alerts</TableHead>
                  <TableHead className="font-black text-xs uppercase tracking-widest text-slate-500">Stability</TableHead>
                  <TableHead className="text-right"></TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {participants.map((p) => (
                  <TableRow key={p.id} className="hover:bg-slate-50 transition-colors">
                     <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                           <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700">
                              {p.fullName?.[0]}
                           </div>
                           <div className="flex flex-col text-slate-800">
                              <span className="font-bold text-sm">{p.fullName}</span>
                              <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                                 DOB: {new Date(p.dob).toLocaleDateString()}
                              </span>
                           </div>
                        </div>
                     </TableCell>
                     <TableCell>
                        <div className="flex items-center gap-1.5 font-bold text-xs text-slate-700">
                           {p.house.name}
                        </div>
                     </TableCell>
                     <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                           {p.medicalAlerts?.split(',').map((alert: string, i: number) => (
                              <Badge key={i} variant="outline" className="text-[10px] font-bold border-orange-100 bg-orange-50 text-orange-700 uppercase">
                                 {alert.trim()}
                              </Badge>
                           ))}
                        </div>
                     </TableCell>
                     <TableCell>
                        <div className="flex items-center gap-1.5">
                           <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                           <span className="text-xs font-bold text-slate-700 tracking-tight">Standard Stability</span>
                        </div>
                     </TableCell>
                     <TableCell className="text-right">
                        <button className="p-2 hover:bg-slate-200 rounded-lg transition-all text-slate-400">
                           <MoreVertical className="h-4 w-4" />
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
