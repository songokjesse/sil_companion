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
import { UserPlus, MoreVertical, ShieldCheck, Mail } from "lucide-react";

export default async function UserManagement() {
  const users = await prisma.user.findMany({
    include: { organization: true, houses: true }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-primary">Staff Management</h1>
            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
               <ShieldCheck className="h-4 w-4 text-purple-600" />
               Manage organization staff access, roles, and house assignments.
            </p>
         </div>
         <Button className="font-bold bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-100 h-10">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Staff Member
         </Button>
      </div>

      <div className="rounded-2xl border bg-white dark:bg-slate-950 shadow-sm overflow-hidden">
         <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-900">
               <TableRow>
                  <TableHead className="font-black text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 py-4">User</TableHead>
                  <TableHead className="font-black text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Role</TableHead>
                  <TableHead className="font-black text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Assignments</TableHead>
                  <TableHead className="font-black text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Status</TableHead>
                  <TableHead className="text-right"></TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-slate-50 dark:bg-slate-900 transition-colors">
                     <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                           <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700">
                              {user.name?.[0]}
                           </div>
                           <div className="flex flex-col">
                              <span className="font-bold text-sm text-slate-800 dark:text-slate-100">{user.name}</span>
                              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                 <Mail className="h-3 w-3" />
                                 {user.email}
                              </span>
                           </div>
                        </div>
                     </TableCell>
                     <TableCell>
                        <Badge variant="secondary" className="font-bold text-[10px] uppercase bg-purple-50 text-purple-700 border-purple-100">
                           {user.role}
                        </Badge>
                     </TableCell>
                     <TableCell>
                        <div className="flex flex-wrap gap-1">
                           {user.houses.map((house) => (
                              <Badge key={house.id} variant="outline" className="text-[10px] font-medium border-slate-200 dark:border-slate-800">
                                 {house.name}
                              </Badge>
                           ))}
                           {user.houses.length === 0 && <span className="text-xs text-muted-foreground italic">None</span>}
                        </div>
                     </TableCell>
                     <TableCell>
                        <div className="flex items-center gap-1.5">
                           <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                           <span className="text-xs font-bold text-slate-700">Active</span>
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
