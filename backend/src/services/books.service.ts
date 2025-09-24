import { db } from "../config/database.js";
import { books } from "../models/book.model.js";
import { eq } from "drizzle-orm";

export const getAllBooks = async () => db.select().from(books);

export const getBookById = async (id: number) =>
    db.select().from(books).where(eq(books.id, id)).then(r => r[0]);

export const createBook = async (data: { title: string; author: string; description: string; thumbnail_url?: string; rating: number }) =>
    db.insert(books).values(data).returning();

export const updateBook = async (id: number, data: Partial<typeof books>) =>
    db.update(books).set(data).where(eq(books.id, id));

export const deleteBook = async (id: number) =>
    db.delete(books).where(eq(books.id, id));
