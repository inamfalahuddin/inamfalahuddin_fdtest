"use client";

import { useState } from "react";
import axios from "axios";

interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    rating: number;
}

interface Props {
    editBook: Book | null;
    setFormOpen: (open: boolean) => void;
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

export default function BookFormModal({ editBook, setFormOpen, setBooks }: Props) {
    const [formData, setFormData] = useState({
        title: editBook?.title || "",
        author: editBook?.author || "",
        description: editBook?.description || "",
        rating: editBook?.rating || 1,
        thumbnail: null as File | null,
    });

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headers = { Authorization: `Bearer ${token}` };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "rating" ? Number(value) : value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) setFormData({ ...formData, thumbnail: e.target.files[0] });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = new FormData();
        payload.append("title", formData.title);
        payload.append("author", formData.author);
        payload.append("description", formData.description);
        payload.append("rating", formData.rating.toString());
        if (formData.thumbnail) payload.append("thumbnail", formData.thumbnail);

        try {
            if (editBook) {
                await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/book/${editBook.id}`, payload, { headers: { ...headers, "Content-Type": "multipart/form-data" } });
            } else {
                await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/book/create`, payload, { headers: { ...headers, "Content-Type": "multipart/form-data" } });
            }
            // Refresh books
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/book/all`, { headers });
            setBooks(res.data.data.books);
            setFormOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">{editBook ? "Edit Book" : "Add Book"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded" />
                    <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded" />
                    <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} className="w-full px-3 py-2 border rounded" />
                    <select name="rating" value={formData.rating} onChange={handleInputChange} className="w-full px-3 py-2 border rounded">
                        {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                    <input type="file" name="thumbnail" onChange={handleFileChange} />
                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" onClick={() => setFormOpen(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">{editBook ? "Update" : "Create"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
