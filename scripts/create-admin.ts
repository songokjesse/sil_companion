import { auth } from "../src/lib/auth";
import { prisma } from "../src/lib/db";
import "dotenv/config";

async function createAdmin() {
  const email = process.argv[2];
  const password = process.argv[3];
  const name = process.argv[4] || "Admin";

  if (!email || !password) {
    console.log("Usage: npx tsx scripts/create-admin.ts <email> <password> <name?>");
    process.exit(1);
  }

  // Find or Create an organization
  let org = await prisma.organization.findFirst();
  if (!org) {
    org = await prisma.organization.create({
        data: { name: "Default Organization" }
    });
  }

  try {
    const user = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        // @ts-ignore
        role: "ADMIN",
        // @ts-ignore
        organizationId: org.id
      }
    });

    console.log("Admin user created successfully!");
    console.log("Email:", email);
    console.log("Role: ADMIN");
    console.log("Org:", org.name);
  } catch (error: any) {
    console.error("Failed to create admin:", error.message || error);
  } finally {
    process.exit(0);
  }
}

createAdmin();
