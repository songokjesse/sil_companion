import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // baseURL is optional in the browser if you are on the same domain
    baseURL: process.env.NEXT_PUBLIC_APP_URL,
    user: {
        additionalFields: {
            role: {
                type: "string",
            }
        }
    }
});
