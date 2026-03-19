import { prisma } from "../src/lib/db";
import "dotenv/config";

async function promoteToAdmin() {
  const email = process.argv[2];

  if (!email) {
    console.log("Usage: npx tsx scripts/promote-to-admin.ts <email>");
    process.exit(1);
  }

  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: "ADMIN" }
    });

    console.log(`Success! User ${user.name} (${user.email}) has been promoted to ADMIN.`);
  } catch (error: any) {
    if (error.code === 'P2025') {
       console.error(`Error: No user found with email ${email}`);
    } else {
       console.error("Failed to promote user:", error.message || error);
    }
  } finally {
    process.exit(0);
  }
}

promoteToAdmin();
