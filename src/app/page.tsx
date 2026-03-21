import { Dashboard } from "@/components/dashboard/Dashboard";
import { getDashboardData, isMedicationsEnabled } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AuthScreen from "@/components/auth/AuthScreen";
import { prisma } from "@/lib/db";

export default async function Home({ searchParams }: { searchParams: { house?: string } }) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    return <AuthScreen />;
  }

  const { house } = await searchParams;
  const data = await getDashboardData(house);
  const medsEnabled = await isMedicationsEnabled();
  
  // Fetch user's assigned houses for the switcher
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { houses: true }
  });

  if (!data) return <div>No House Data Found. Please Seed Database.</div>;

  return (
    <>
      <Dashboard initialData={{
        ...data,
        medicationsEnabled: medsEnabled,
        userHouses: user?.houses || [],
        metrics: [
          { title: "Due Now", value: data.metrics.dueNow, icon: "clock", color: "blue" },
          { title: "Upcoming Appts", value: data.metrics.upcomingAppts, icon: "calendar", color: "primary" },
          { title: "Overdue", value: data.metrics.overdue, icon: "alert", color: "red" },
          { title: "Completed", value: data.metrics.completed, icon: "check", color: "green" },
        ]
      }} />
    </>
  );
}

