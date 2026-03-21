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
import { UserPlus, MoreVertical, ShieldCheck, Mail, Users as UsersIcon } from "lucide-react";
import { UserRoleSelect } from "@/components/admin/UserRoleSelect";
import Link from "next/link";

export default async function UserManagement() {
  const users = await prisma.user.findMany({
    include: { organization: true, houses: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-1">
            <div className="flex items-center gap-2">
               <div className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-600/80 dark:text-purple-400">Personnel Operations</span>
            </div>
            <h1 className="text-3xl font-[900] tracking-tight text-slate-900 dark:text-slate-100 uppercase">Staff Management</h1>
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-2">
               Manage organization staff access, roles, and residence assignments.
            </p>
         </div>
         <Link href="/admin/users/new">
            <Button className="font-black text-[11px] uppercase tracking-widest bg-slate-900 hover:bg-purple-600 dark:bg-white dark:text-slate-900 dark:hover:bg-purple-600 dark:hover:text-white transition-all shadow-xl shadow-slate-200 dark:shadow-none h-[3.5rem] px-8 rounded-2xl group active:scale-95">
               <UserPlus className="h-4 w-4 mr-2.5 group-hover:rotate-12 transition-transform" />
               Add Staff Member
            </Button>
         </Link>
      </div>

      <div className="rounded-[2rem] border border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl shadow-sm">
         <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
               <TableRow className="border-slate-200/60 dark:border-slate-800/60 hover:bg-transparent">
                  <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 py-6 pl-8">Worker Profile</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Access Role</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Residence Hubs</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Status</TableHead>
                  <TableHead className="text-right pr-8"></TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {users.length > 0 ? (
                 users.map((user) => (
                   <TableRow key={user.id} className="border-slate-100 dark:border-slate-900 group hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors">
                      <TableCell className="py-4 pl-8">
                         <div className="flex items-center gap-4">
                            <div className="relative">
                               <div className="absolute inset-0 bg-purple-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                               <div className="relative h-11 w-11 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center font-black text-slate-800 dark:text-slate-100 text-[14px] shadow-sm group-hover:border-purple-200/50 transition-all">
                                 {user.name?.[0].toUpperCase()}
                               </div>
                            </div>
                            <div className="flex flex-col min-w-0">
                               <span className="font-black text-[13px] text-slate-800 dark:text-slate-100 uppercase tracking-tight truncate">{user.name}</span>
                               <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1.5 uppercase tracking-widest mt-0.5 truncate">
                                  <Mail className="h-3 w-3 text-slate-300" />
                                  {user.email}
                               </span>
                            </div>
                         </div>
                      </TableCell>
                      <TableCell>
                         <UserRoleSelect userId={user.id} currentRole={user.role} />
                      </TableCell>
                      <TableCell>
                         <div className="flex flex-wrap gap-1.5">
                            {user.houses.length > 0 ? (
                              user.houses.map((house) => (
                                <Badge key={house.id} variant="outline" className="text-[9px] font-black uppercase tracking-widest border-slate-200/60 dark:border-slate-800/60 px-2 py-0.5 rounded-md bg-white/50 dark:bg-slate-900/50">
                                   {house.name}
                                </Badge>
                              ))
                            ) : (
                              <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-dashed border-slate-200 text-slate-300 px-2 py-0.5 rounded-md">
                                 Not Assigned
                              </Badge>
                            )}
                         </div>
                      </TableCell>
                      <TableCell>
                         <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-900/30">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50 animate-pulse" />
                            <span className="text-[9px] font-black text-emerald-600/80 dark:text-emerald-400 uppercase tracking-widest">Active</span>
                         </div>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                         <Link 
                           href={`/admin/users/${user.id}`}
                           className="inline-flex h-9 w-9 items-center justify-center rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all text-slate-400 hover:text-purple-600 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 hover:shadow-sm"
                         >
                            <MoreVertical className="h-4 w-4" />
                         </Link>
                      </TableCell>
                   </TableRow>
                 ))
               ) : (
                 <TableRow>
                   <TableCell colSpan={5} className="py-24 text-center">
                      <div className="flex flex-col items-center gap-5">
                         <div className="h-16 w-16 rounded-[2rem] bg-slate-50 dark:bg-slate-900 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 shadow-inner">
                            <UsersIcon className="h-8 w-8 text-slate-200" />
                         </div>
                         <div className="space-y-1">
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Personnel Depleted</p>
                            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">No staff members found in this organization</p>
                         </div>
                      </div>
                   </TableCell>
                 </TableRow>
               )}
            </TableBody>
         </Table>
      </div>
    </div>
  );
}

