import type { Request, Response } from "express";
import * as booksService from "../services/books.service.js";
import { ApiResponse } from "../utils/response.utils.js";

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management endpoints
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get list of books with pagination
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of books with pagination
 *       500:
 *         description: Failed to fetch books
 */
export const getBooks = async (req: Request, res: Response) => {
    try {
        const { page = "1", limit = "10" } = req.query;

        const pageNumber = Math.max(parseInt(page as string, 10), 1);
        const limitNumber = Math.max(parseInt(limit as string, 10), 1);
        const offset = (pageNumber - 1) * limitNumber;

        const { data: books, total } = await booksService.getAllBooks({ limit: limitNumber, offset });

        const totalPages = Math.ceil(total / limitNumber);

        return ApiResponse.success(res, {
            books,
            pagination: {
                total,
                page: pageNumber,
                limit: limitNumber,
                totalPages
            }
        });
    } catch (error: any) {
        console.error(error);
        return ApiResponse.error(res, error.message || "Failed to fetch books", 500);
    }
};

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               description:
 *                 type: string
 *               rating:
 *                 type: number
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Validation error (Title and Author required)
 *       500:
 *         description: Failed to create book
 */
export const createBook = async (req: Request, res: Response) => {
    try {
        const { title, author, description, rating } = req.body;

        if (!title || !author) {
            return ApiResponse.validation(res, { title, author }, "Title and Author are required");
        }

        const host = req.get('host');
        const protocol = req.protocol;
        const thumbnail_url = req.file
            ? `${protocol}://${host}/uploads/${req.file.filename}`
            : "";

        const [book] = await booksService.createBook({
            title,
            author,
            description,
            rating: Number(rating),
            thumbnail_url,
        });

        return ApiResponse.success(res, { book }, "Book created successfully", 201);
    } catch (error: any) {
        console.error(error);
        return ApiResponse.error(res, error.message || "Failed to create book", 500);
    }
};


/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               description:
 *                 type: string
 *               rating:
 *                 type: number
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Book ID is required
 *       404:
 *         description: Book not found
 *       500:
 *         description: Failed to update book
 */
export const updateBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, author, description, rating } = req.body;

        if (!id) return ApiResponse.validation(res, {}, "Book ID is required");

        const book = await booksService.getBookById(Number(id));
        if (!book) return ApiResponse.error(res, "Book not found", 404);

        const host = req.get("host");
        const protocol = req.protocol;
        const thumbnail_url = req.file ? `${protocol}://${host}/uploads/${req.file.filename}` : undefined;

        const updateData: {
            title?: string;
            author?: string;
            description?: string | null;
            rating?: number;
            thumbnail_url?: string | null;
        } = {};

        if (title !== undefined) updateData.title = title;
        if (author !== undefined) updateData.author = author;
        if (description !== undefined) updateData.description = description;
        if (rating !== undefined) updateData.rating = Number(rating);
        if (thumbnail_url !== undefined) updateData.thumbnail_url = thumbnail_url;

        await booksService.updateBook(Number(id), updateData);

        const updatedBook = await booksService.getBookById(Number(id));
        return ApiResponse.success(res, { book: updatedBook }, "Book updated successfully");
    } catch (error: any) {
        console.error(error);
        return ApiResponse.error(res, error.message || "Failed to update book", 500);
    }
};

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       400:
 *         description: Book ID is required
 *       404:
 *         description: Book not found
 *       500:
 *         description: Failed to delete book
 */
export const deleteBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) return ApiResponse.validation(res, {}, "Book ID is required");

        const book = await booksService.getBookById(Number(id));
        if (!book) return ApiResponse.error(res, "Book not found", 404);

        await booksService.deleteBook(Number(id));

        return ApiResponse.success(res, null, "Book deleted successfully");
    } catch (error: any) {
        console.error(error);
        return ApiResponse.error(res, error.message || "Failed to delete book", 500);
    }
};
