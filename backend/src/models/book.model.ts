import { pgTable, serial, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";

export const books = pgTable("books", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    author: varchar("author", { length: 255 }).notNull(),
    description: text("description"),
    thumbnail_url: varchar("thumbnail_url", { length: 255 }),
    rating: integer("rating"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});
