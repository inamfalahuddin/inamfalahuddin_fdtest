import { sql } from "drizzle-orm";

export const books = {
    id: sql`serial primary key`,
    title: sql`varchar(255)`,
    author: sql`varchar(255)`,
    description: sql`text`,
    thumbnail_url: sql`varchar(255)`,
    rating: sql`int`,
    created_at: sql`timestamp default now()`,
    updated_at: sql`timestamp default now()`
};
