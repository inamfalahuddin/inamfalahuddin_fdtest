// app/components/HeroSection.tsx
"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white py-20 px-4">
            <div className="max-w-7xl mx-auto text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold mb-6"
                >
                    BookMaster
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl mb-8 text-blue-200"
                >
                    Manage Your Digital Library with Ease
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <a
                        href="/login"
                        className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-100 transition duration-300"
                    >
                        Get Started
                    </a>
                    <a
                        href="#features"
                        className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition duration-300"
                    >
                        Learn More
                    </a>
                </motion.div>
            </div>
        </section>
    );
}