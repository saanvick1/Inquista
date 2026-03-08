import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import {
  users, savedTopics, notebookEntries, conversations, messages,
  type User, type InsertUser,
  type SavedTopic, type InsertSavedTopic,
  type NotebookEntry, type InsertNotebookEntry,
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getSavedTopics(): Promise<SavedTopic[]>;
  createSavedTopic(topic: InsertSavedTopic): Promise<SavedTopic>;
  deleteSavedTopic(id: number): Promise<void>;

  getNotebookEntries(): Promise<NotebookEntry[]>;
  getNotebookEntry(id: number): Promise<NotebookEntry | undefined>;
  createNotebookEntry(entry: InsertNotebookEntry): Promise<NotebookEntry>;
  updateNotebookEntry(id: number, entry: Partial<InsertNotebookEntry>): Promise<NotebookEntry | undefined>;
  deleteNotebookEntry(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getSavedTopics(): Promise<SavedTopic[]> {
    return db.select().from(savedTopics).orderBy(desc(savedTopics.createdAt));
  }

  async createSavedTopic(topic: InsertSavedTopic): Promise<SavedTopic> {
    const [saved] = await db.insert(savedTopics).values(topic).returning();
    return saved;
  }

  async deleteSavedTopic(id: number): Promise<void> {
    await db.delete(savedTopics).where(eq(savedTopics.id, id));
  }

  async getNotebookEntries(): Promise<NotebookEntry[]> {
    return db.select().from(notebookEntries).orderBy(desc(notebookEntries.updatedAt));
  }

  async getNotebookEntry(id: number): Promise<NotebookEntry | undefined> {
    const [entry] = await db.select().from(notebookEntries).where(eq(notebookEntries.id, id));
    return entry;
  }

  async createNotebookEntry(entry: InsertNotebookEntry): Promise<NotebookEntry> {
    const [created] = await db.insert(notebookEntries).values(entry).returning();
    return created;
  }

  async updateNotebookEntry(id: number, entry: Partial<InsertNotebookEntry>): Promise<NotebookEntry | undefined> {
    const [updated] = await db.update(notebookEntries)
      .set({ ...entry, updatedAt: new Date() })
      .where(eq(notebookEntries.id, id))
      .returning();
    return updated;
  }

  async deleteNotebookEntry(id: number): Promise<void> {
    await db.delete(notebookEntries).where(eq(notebookEntries.id, id));
  }
}

export const storage = new DatabaseStorage();
