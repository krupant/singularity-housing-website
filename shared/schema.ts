import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Partnership inquiry schema
export const partnershipInquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  organization: z.string().optional(),
  email: z.string().email("Valid email is required"),
  interest: z.string().min(1, "Interest area is required"),
  message: z.string().min(1, "Message is required"),
  captchaVerified: z.boolean().refine((val) => val === true, {
    message: "Please verify that you are not a robot",
  }),
  formLoadedAt: z.number(),
});

export type PartnershipInquiry = z.infer<typeof partnershipInquirySchema>;
