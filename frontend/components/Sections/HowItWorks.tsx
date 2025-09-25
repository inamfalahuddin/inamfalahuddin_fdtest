// app/components/HowItWorks.tsx
"use client";

import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Search } from "lucide-react";

const steps = [
    {
        icon: Plus,
        title: "Add Books",
        description: "Easily add new books to your collection with our simple form interface.",
        color: "bg-green-500"
    },
    {
        icon: Edit,
        title: "Edit Details",
        description: "Update book information anytime with the intuitive edit functionality.",
        color: "bg-blue-500"
    },
    {
        icon: Search,
        title: "Browse Collection",
        description: "Search and filter through your entire book library effortlessly.",
        color: "bg-purple-500"
    },
    {
        icon: Trash2,
        title: "Manage Content",
        description: "Remove books safely with confirmation dialogs to prevent accidents.",
        color: "bg-red-500"
    }
];

export default function HowItWorks() {
    return (
        <section className="py-20 bg-white px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-xl text-gray-600">
                        Simple steps to manage your book collection
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                                <step.icon className="w-8 h-8 text-white" />
                            </div>
                            <div className="bg-gray-100 w-16 h-1 mx-auto mb-4"></div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {step.title}
                            </h3>
                            <p className="text-gray-600">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}