// app/components/CTASection.tsx
"use client";

import { motion } from "framer-motion";

export default function CTASection() {
    return (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white px-4">
            <div className="max-w-7xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Organize Your Library?
                    </h2>
                    <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
                        Join thousands of users who are efficiently managing their book collections with BookMaster.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/books"
                            className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-100 transition duration-300"
                        >
                            Start Managing Books
                        </a>
                        <a
                            href="#features"
                            className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition duration-300"
                        >
                            See Features
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}