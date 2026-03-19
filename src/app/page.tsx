import { Dashboard } from "@/components/dashboard/Dashboard";
import { getDashboardData } from "@/lib/actions";

export default async function Home() {
  const data = await getDashboardData();
  
  if (!data) return <div>No House Data Found. Please Seed Database.</div>;

  return (
    <main className="min-h-screen bg-background">
      <Dashboard initialData={{
        ...data,
        metrics: [
          { title: "Due Now", value: data.metrics.dueNow, icon: "clock", color: "blue" },
          { title: "Upcoming Appts", value: data.metrics.upcomingAppts, icon: "calendar", color: "primary" },
          { title: "Overdue", value: data.metrics.overdue, icon: "alert", color: "red" },
          { title: "Completed", value: data.metrics.completed, icon: "check", color: "green" },
        ]
      }} />
    </main>
  );
}
