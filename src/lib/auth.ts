import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true
    },
    trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:3000"],
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "SUPPORT_WORKER"
            },
            organizationId: {
                type: "string",
                required: false
            }
        }
    }
});
