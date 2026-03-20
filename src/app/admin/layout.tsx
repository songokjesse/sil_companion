import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { ShieldAlert } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session || (session.user as any).role !== "ADMIN") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-destructive/5">
        <div className="text-center space-y-4">
          <ShieldAlert className="h-16 w-16 text-destructive mx-auto" />
          <h1 className="text-2xl font-black">Access Denied</h1>
          <p className="text-muted-foreground font-medium">You do not have administrative privileges to access this portal.</p>
          <a href="/" className="inline-block text-purple-600 font-bold hover:underline">Return to Dashboard</a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-background">
      <Sidebar isAdminView />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header houseName="Administrative Portal" />
        <div className="flex-1 overflow-y-auto min-h-0 bg-muted/20">
          <main className="container mx-auto p-4 pb-28 md:p-8 md:pb-8 space-y-8 max-w-7xl">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
