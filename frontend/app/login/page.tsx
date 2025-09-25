"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LoginResponse } from "../types/auth";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            const res = await axios.post<LoginResponse>(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}api/auth/login`,
                { email, password }
            );

            const { token, user } = res.data.data;

            document.cookie = `token=${token}; path=/; samesite=lax`;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);

            setSuccessMessage("Login successful! Redirecting to dashboard...");
            setRedirect(true); // trigger redirect di useEffect
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    // Redirect ke dashboard setelah 1 detik
    useEffect(() => {
        if (redirect) {
            const timer = setTimeout(() => {
                router.push("/dashboard");
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [redirect, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-3xl w-full max-w-md p-10">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
                    Welcome Back
                </h1>
                <p className="text-gray-500 text-center mb-8">
                    Sign in to your account
                </p>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="mb-4 p-3 bg-green-100 text-green-600 rounded-lg text-sm text-center">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder=" "
                            className="peer w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                        />
                        <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-indigo-500 peer-focus:text-xs">
                            Email
                        </label>
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder=" "
                            className="peer w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                        />
                        <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-indigo-500 peer-focus:text-xs">
                            Password
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold hover:from-indigo-600 hover:to-blue-600 transition disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div className="flex justify-between mt-6 text-sm text-gray-500">
                    <a href="/forgot-password" className="hover:text-indigo-500 transition">
                        Forgot Password?
                    </a>
                    <a href="/register" className="hover:text-indigo-500 transition">
                        Create Account
                    </a>
                </div>
            </div>
        </div>
    );
}
