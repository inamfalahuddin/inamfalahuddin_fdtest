"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import RatingStars from "./RatingStars";
import BookFormModal from "./BookFormModal";
import { Book } from "../app/types/book";
import ConfirmModal from "./ConfirmModalProps";

export default function BooksTab() {
    const [books, setBooks] = useState<Book[]>([]);
    const [formOpen, setFormOpen] = useState(false);
    const [editBook, setEditBook] = useState<Book | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteBookId, setDeleteBookId] = useState<number | null>(null);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        async function fetchBooks() {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/book/all`, { headers });
                setBooks(res.data.data.books);
            } catch (err) {
                console.error(err);
            }
        }
        fetchBooks();
    }, [token]);

    const openCreateForm = () => {
        setEditBook(null);
        setFormOpen(true);
    };

    const openEditForm = (book: Book) => {
        setEditBook(book);
        setFormOpen(true);
    };

    const handleDelete = async (bookId: number) => {
        if (!confirm("Are you sure you want to delete this book?")) return;
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/book/${bookId}`, { headers });
            setBooks(books.filter((b) => b.id !== bookId));
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteClick = (bookId: number) => {
        setDeleteBookId(bookId);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleteBookId) return;
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/book/${deleteBookId}`, { headers });
            setBooks(books.filter((b) => b.id !== deleteBookId));
        } catch (err) {
            console.error(err);
        } finally {
            setConfirmOpen(false);
            setDeleteBookId(null);
        }
    };

    return (
        <div className="p-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h2 className="text-xl font-semibold">Books Management</h2>
                <button
                    onClick={openCreateForm}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                    Add Book
                </button>
            </div>

            {/* Responsive wrapper */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto border border-gray-300 rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2 text-left">Title</th>
                            <th className="border px-4 py-2 text-left">Author</th>
                            <th className="border px-4 py-2 text-left">Description</th>
                            <th className="border px-4 py-2 text-left">Thumbnail</th>
                            <th className="border px-4 py-2 text-left">Rating</th>
                            <th className="border px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((b) => (
                            <tr key={b.id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{b.title}</td>
                                <td className="border px-4 py-2">{b.author}</td>
                                <td className="border px-4 py-2 max-w-xs truncate">{b.description}</td>
                                <td className="border px-4 py-2">
                                    {b.thumbnail_url ? (
                                        <img src={b.thumbnail_url} alt={b.title} className="w-16 h-16 object-cover rounded" />
                                    ) : (
                                        "-"
                                    )}
                                </td>
                                <td className="border px-4 py-2"><RatingStars rating={b.rating} /></td>
                                <td className="border px-4 py-2 flex gap-2 flex-wrap">
                                    <button onClick={() => openEditForm(b)} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteClick(b.id!)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {formOpen && <BookFormModal editBook={editBook} setFormOpen={setFormOpen} setBooks={setBooks} />}

            <ConfirmModal
                isOpen={confirmOpen}
                onConfirm={handleConfirmDelete}
                onCancel={() => setConfirmOpen(false)}
                message="Are you sure you want to delete this book?"
            />

        </div>
    );
}
