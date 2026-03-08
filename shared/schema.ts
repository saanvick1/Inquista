import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
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

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull().references(() => conversations.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const savedTopics = pgTable("saved_topics", {
  id: serial("id").primaryKey(),
  topic: text("topic").notNull(),
  question: text("question").notNull(),
  tags: text("tags").array().notNull(),
  noveltyScore: integer("novelty_score").notNull(),
  feasibilityScore: integer("feasibility_score").notNull(),
  impactScore: integer("impact_score").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const notebookEntries = pgTable("notebook_entries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  folder: text("folder").notNull().default("General"),
  type: text("type").notNull().default("note"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const insertSavedTopicSchema = createInsertSchema(savedTopics).omit({
  id: true,
  createdAt: true,
});

export const insertNotebookEntrySchema = createInsertSchema(notebookEntries).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type SavedTopic = typeof savedTopics.$inferSelect;
export type InsertSavedTopic = z.infer<typeof insertSavedTopicSchema>;
export type NotebookEntry = typeof notebookEntries.$inferSelect;
export type InsertNotebookEntry = z.infer<typeof insertNotebookEntrySchema>;
export type Conversation = typeof conversations.$inferSelect;
export type Message = typeof messages.$inferSelect;
