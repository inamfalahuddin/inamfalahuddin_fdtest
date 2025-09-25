import { db } from "../config/database.js";
import { books } from "../models/book.model.js";
import { eq } from "drizzle-orm";

export interface BookData {
    title: string;
    author: string;
    description: string;
    rating: number;
    thumbnail_url?: string | null;
}

export interface BookUpdateData {
    title?: string;
    author?: string;
    description?: string | null;
    rating?: number;
    thumbnail_url?: string | null;
}

export const getAllBooks = async ({ limit, offset }: { limit: number; offset: number }) => {
    const total = await db.select().from(books).then(r => r.length);

    const data = await db.select().from(books)
        .limit(limit)
        .offset(offset);

    return { data, total };
};

export const getBookById = async (id: number) =>
    db.select().from(books).where(eq(books.id, id)).then(r => r[0]);

export const createBook = async (data: BookData) =>
    db.insert(books).values(data).returning();

export const updateBook = async (id: number, data: BookUpdateData) =>
    db.update(books).set(data).where(eq(books.id, id));

export const deleteBook = async (id: number) =>
    db.delete(books).where(eq(books.id, id));
