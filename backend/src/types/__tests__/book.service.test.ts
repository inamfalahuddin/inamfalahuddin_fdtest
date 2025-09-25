// __tests__/book.service.test.ts
import {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    type BookData,
    type BookUpdateData
} from "../../services/books.service.js";
import { db } from "../../config/database.js";

jest.mock("../../config/database.js", () => ({
    db: {
        select: jest.fn(() => ({
            from: jest.fn(() => ({
                limit: jest.fn().mockReturnThis(),
                offset: jest.fn().mockResolvedValue([
                    { id: 1, title: "Book A", author: "Author A", description: "Desc", rating: 5 },
                ]),
                then: jest.fn((cb: any) => cb([{ id: 1 }])), // for total
            })),
        })),
        insert: jest.fn(() => ({
            values: jest.fn().mockReturnThis(),
            returning: jest.fn().mockResolvedValue([{ id: 2, title: "Book B" }]),
        })),
        update: jest.fn(() => ({
            set: jest.fn().mockReturnThis(),
            where: jest.fn().mockResolvedValue({ affectedRows: 1 }),
        })),
        delete: jest.fn(() => ({
            where: jest.fn().mockResolvedValue({ affectedRows: 1 }),
        })),
    },
}));

describe("Book Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getAllBooks", () => {
        it("should return data and total", async () => {
            const result = await getAllBooks({ limit: 10, offset: 0 });
            expect(result.data).toEqual([
                { id: 1, title: "Book A", author: "Author A", description: "Desc", rating: 5 },
            ]);
            expect(result.total).toBe(1);
        });
    });

    describe("getBookById", () => {
        it("should return a book when found", async () => {
            const book = await getBookById(1);
            expect(book).toEqual({ id: 1, title: "Book A", author: "Author A", description: "Desc", rating: 5 });
        });
    });

    describe("createBook", () => {
        it("should create a new book", async () => {
            const newBook: BookData = { title: "Book B", author: "Author B", description: "Desc B", rating: 4 };
            const result = await createBook(newBook);
            expect(result).toEqual([{ id: 2, title: "Book B" }]);
        });
    });

    describe("updateBook", () => {
        it("should update a book", async () => {
            const data: BookUpdateData = { title: "Updated Title" };
            const result = await updateBook(1, data);
            expect(result).toEqual({ affectedRows: 1 });
        });
    });

    describe("deleteBook", () => {
        it("should delete a book", async () => {
            const result = await deleteBook(1);
            expect(result).toEqual({ affectedRows: 1 });
        });
    });
});
