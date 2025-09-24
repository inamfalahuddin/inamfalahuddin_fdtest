import type { Request, Response } from "express";
import * as booksService from "../services/books.service.js";

export const getBooks = async (_req: Request, res: Response) => {
    const books = await booksService.getAllBooks();
    res.json({ books });
};

export const createBook = async (req: Request, res: Response) => {
    const { title, author, description, rating } = req.body;
    const thumbnail_url = req.file?.filename;
    const [book] = await booksService.createBook({ title, author, description, rating: Number(rating), thumbnail_url });
    res.json({ message: "Book created", book });
};
