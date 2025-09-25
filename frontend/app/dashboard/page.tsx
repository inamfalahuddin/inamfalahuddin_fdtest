"use client";

import { useState, useEffect } from "react";
import Tabs from "@/components/Tabs";
import WelcomeTab from "@/components/WelcomeTab";
import UsersTab from "@/components/UsersTab";
import BooksTab from "@/components/BooksTab";

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<"welcome" | "users" | "books">("welcome");
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const u = typeof window !== "undefined" ? localStorage.getItem("user") : null;
        if (u) setUser(JSON.parse(u));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>

                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} userData={user} />

                <div className="mt-4">
                    {activeTab === "welcome" && <WelcomeTab user={user} />}
                    {activeTab === "users" && <UsersTab />}
                    {activeTab === "books" && <BooksTab />}
                </div>
            </div>
        </div>
    );
}
