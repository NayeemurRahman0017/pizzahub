import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db("pizzahub");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: ["http://localhost:3000"],
  database: mongodbAdapter(db),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  user: {
    additionalFields: {
      role: { type: "string", required: false, defaultValue: "customer", input: true },
      businessName: { type: "string", required: false, input: true },
      isBlocked: { type: "boolean", required: false, defaultValue: false, input: false },
      subscriptionPlan: { type: "string", required: false, defaultValue: "free", input: false },
      subscriptionExpiresAt: { type: "date", required: false, input: false },
    },
  },
  databaseHooks: {
    user: {
      create: {
        // Public sign-up may only create vendor or customer. Never admin.
        before: async (user) => ({
          data: {
            ...user,
            role: (user as { role?: string }).role === "vendor" ? "vendor" : "customer",
          },
        }),
      },
      update: {
        // Users cannot change role, block status or subscription from profile updates.
        before: async (data) => {
          const {
            role: _role,
            isBlocked: _blocked,
            subscriptionPlan: _plan,
            subscriptionExpiresAt: _exp,
            ...safe
          } = data as Record<string, unknown>;
          void _role; void _blocked; void _plan; void _exp;
          return { data: safe };
        },
      },
    },
  },
});