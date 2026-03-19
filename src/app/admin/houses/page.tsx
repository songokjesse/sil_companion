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
import { Building2, Plus, MoreVertical, Users, MapPin } from "lucide-react";
import Link from "next/link";

export default async function HouseManagement() {
  const houses = await prisma.house.findMany({
    include: { _count: { select: { participants: true, users: true } } }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-primary">Resource Management</h1>
            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
               <Building2 className="h-4 w-4 text-purple-600" />
               Manage organization residential properties, site capacity, and staff allocations.
            </p>
         </div>
         <Link href="/admin/houses/new" className="inline-flex items-center justify-center rounded-md font-bold bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-100 h-10 px-4 text-white text-sm transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Provision New House
         </Link>
      </div>

      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
         <Table>
            <TableHeader className="bg-slate-50">
               <TableRow>
                  <TableHead className="font-black text-xs uppercase tracking-widest text-slate-500 py-4">House Facility</TableHead>
                  <TableHead className="font-black text-xs uppercase tracking-widest text-slate-500">Utilization</TableHead>
                  <TableHead className="font-black text-xs uppercase tracking-widest text-slate-500">Staffing</TableHead>
                  <TableHead className="font-black text-xs uppercase tracking-widest text-slate-500">Compliance</TableHead>
                  <TableHead className="text-right"></TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {houses.map((house) => (
                  <TableRow key={house.id} className="hover:bg-slate-50 transition-colors">
                     <TableCell className="py-4">
                        <div className="flex items-center gap-4">
                           <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center font-bold text-purple-700">
                              <Building2 className="h-5 w-5" />
                           </div>
                           <div className="flex flex-col">
                              <span className="font-black text-sm text-slate-800 tracking-tight">{house.name}</span>
                              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1 uppercase tracking-widest">
                                 <MapPin className="h-3 w-3" />
                                 Main Campus Region
                              </span>
                           </div>
                        </div>
                     </TableCell>
                     <TableCell>
                        <div className="flex flex-col gap-1.5">
                           <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="font-black text-[10px] uppercase bg-blue-50 text-blue-700 border-blue-100">
                                 {house._count.participants} Resident(s)
                              </Badge>
                           </div>
                           <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden max-w-[120px]">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }} />
                           </div>
                        </div>
                     </TableCell>
                     <TableCell>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                           <Users className="h-4 w-4 text-purple-500" />
                           {house._count.users} Active Staff
                        </div>
                     </TableCell>
                     <TableCell>
                        <div className="flex items-center gap-1.5">
                           <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                           <span className="text-xs font-bold text-slate-700 uppercase tracking-tighter">Compliant</span>
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
