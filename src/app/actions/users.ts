"use server";

import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateUserRole(userId: string, role: Role) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to update user role:", error);
    return { success: false, error: "Failed to update role" };
  }
}

export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}

export async function createStaffUser(data: { name: string, email: string, role: Role }) {
  try {
    const org = await prisma.organization.findFirst();
    if (!org) throw new Error("No organization found");

    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        organizationId: org.id,
      },
    });
    
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create staff member:", error);
    return { success: false, error: error.message || "Failed to create staff" };
  }
}

export async function updateStaffUser(userId: string, data: { name: string, email: string, role: Role, houseIds?: string[] }) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        houses: data.houseIds ? {
          set: data.houseIds.map(id => ({ id }))
        } : undefined
      },
    });
    
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update staff member:", error);
    return { success: false, error: error.message || "Failed to update staff" };
  }
}
