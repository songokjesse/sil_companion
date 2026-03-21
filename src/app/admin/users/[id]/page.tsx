import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { EditStaffClient } from "./EditStaffClient";

export default async function EditStaffPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const user = await prisma.user.findUnique({
    where: { id },
    include: { houses: true }
  });

  const houses = await prisma.house.findMany();

  if (!user) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 md:px-0">
      <EditStaffClient user={user} allHouses={houses} />
    </div>
  );
}
