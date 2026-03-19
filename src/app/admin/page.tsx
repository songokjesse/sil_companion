import { prisma } from "@/lib/db";
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  Calendar,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboard() {
  const counts = await prisma.$transaction([
    prisma.house.count(),
    prisma.participant.count(),
    prisma.user.count(),
  ]);

  const stats = [
    { title: "Total Houses", value: counts[0], icon: Building2, href: "/admin/houses", color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Total Residents", value: counts[1], icon: Users, href: "/admin/participants", color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Staff Members", value: counts[2], icon: ShieldCheck, href: "/admin/users", color: "text-indigo-600", bg: "bg-indigo-50" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight text-slate-900">Admin Console</h1>
        <p className="text-muted-foreground font-medium text-lg italic">Organization-wide resource management and oversight.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-500">{stat.title}</CardTitle>
                <div className={`h-10 w-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                   <stat.icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-slate-800 tabular-nums">{stat.value}</div>
                <div className="flex items-center mt-4 text-xs font-bold text-slate-400 gap-1 group-hover:text-purple-600 transition-colors">
                   Manage Resources <ArrowUpRight className="h-3 w-3" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
         <Card className="border-none shadow-sm">
            <CardHeader>
               <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
               <CardDescription className="font-medium">Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
               <button className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 border-2 border-transparent hover:border-purple-200 hover:bg-white transition-all gap-2 group">
                  <Building2 className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-600">Add House</span>
               </button>
               <button className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 border-2 border-transparent hover:border-purple-200 hover:bg-white transition-all gap-2 group">
                  <Users className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-600">Register Resident</span>
               </button>
            </CardContent>
         </Card>

         <Card className="border-none shadow-sm">
            <CardHeader>
               <CardTitle className="text-xl font-bold">System Health</CardTitle>
               <CardDescription className="font-medium">Data synchronization status</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm p-3 rounded-xl bg-green-50/50 border border-green-100/50">
                     <span className="font-bold text-slate-600">Database Sync</span>
                     <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 font-bold">OPTIMAL</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm p-3 rounded-xl bg-purple-50/50 border border-purple-100/50">
                     <span className="font-bold text-slate-600">Auth Engine</span>
                     <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200 font-bold">ACTIVE</Badge>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}

function Badge({ children, className, variant }: any) {
   return (
      <span className={`px-2 py-0.5 text-[10px] rounded-full flex items-center justify-center ${className}`}>
         {children}
      </span>
   );
}
