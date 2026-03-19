import { PrismaClient } from "@prisma/client";
import "dotenv/config";

try {
  const prisma = new PrismaClient({
    // @ts-ignore
    datasourceUrl: process.env.DATABASE_URL
  });
  console.log("Client created with datasourceUrl");
} catch (e) {
  console.log("Failed with datasourceUrl", e);
}

try {
  const prisma = new PrismaClient();
  console.log("Client created with no options");
} catch (e) {
  console.log("Failed with no options", e);
}
