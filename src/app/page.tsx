import { Dashboard } from "@/components/dashboard/Dashboard";
import { getDashboardData, isMedicationsEnabled } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AuthScreen from "@/components/auth/AuthScreen";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    return <AuthScreen />;
  }

  const data = await getDashboardData();
  const medsEnabled = await isMedicationsEnabled();
  
  if (!data) return <div>No House Data Found. Please Seed Database.</div>;

  return (
    <>
      <Dashboard initialData={{
        ...data,
        medicationsEnabled: medsEnabled,
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
