import { getActiveHouseAlerts } from "@/lib/actions";
import { HeaderClient } from "./HeaderClient";

interface HeaderProps {
   houseName?: string;
}

export async function Header({ houseName = "Maple House" }: HeaderProps) {
  const alerts = await getActiveHouseAlerts(houseName);
  
  return <HeaderClient houseName={houseName} alerts={alerts} />;
}
