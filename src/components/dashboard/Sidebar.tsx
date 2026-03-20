import { SidebarClient } from "./SidebarClient";
import { isMedicationsEnabled } from "@/lib/actions";

export async function Sidebar({ isAdminView = false }: { isAdminView?: boolean }) {
  const medsEnabled = await isMedicationsEnabled();
  
  return <SidebarClient isAdminView={isAdminView} medicationsEnabled={medsEnabled} />;
}
