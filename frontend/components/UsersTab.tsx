"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface User {
    id: number;
    email: string;
    name?: string | null;
    is_verified: boolean;
}

export default function UsersTab() {
    const [users, setUsers] = useState<User[]>([]);
    const [searchUser, setSearchUser] = useState("");
    const [filterVerified, setFilterVerified] = useState<"all" | "verified" | "unverified">("all");

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/user/all`, { headers });
                setUsers(res.data.data.users);
            } catch (err) {
                console.error(err);
            }
        }
        fetchUsers();
    }, [token]);

    const filteredUsers = users.filter((u) => {
        const search = searchUser.toLowerCase();
        const matchesSearch =
            u.email.toLowerCase().includes(search) || (u.name && u.name.toLowerCase().includes(search));
        const matchesVerified =
            filterVerified === "all" ||
            (filterVerified === "verified" && u.is_verified) ||
            (filterVerified === "unverified" && !u.is_verified);
        return matchesSearch && matchesVerified;
    });

    return (
        <div>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    className="px-3 py-2 border rounded w-full"
                />
                <select
                    value={filterVerified}
                    onChange={(e) => setFilterVerified(e.target.value as any)}
                    className="px-3 py-2 border rounded"
                >
                    <option value="all">All</option>
                    <option value="verified">Verified</option>
                    <option value="unverified">Unverified</option>
                </select>
            </div>
            <table className="w-full table-auto border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Verified</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">{u.name || "-"}</td>
                            <td className="border px-4 py-2">{u.email}</td>
                            <td className="border px-4 py-2">{u.is_verified ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
