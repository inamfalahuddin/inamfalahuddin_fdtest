// app/components/FeaturesSection.tsx
"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Star, Shield } from "lucide-react";

const features = [
    {
        icon: BookOpen,
        title: "Comprehensive Library",
        description: "Manage thousands of books with detailed information including ratings, descriptions, and thumbnails."
    },
    {
        icon: Users,
        title: "User-Friendly Interface",
        description: "Intuitive design that makes book management simple and enjoyable for all users."
    },
    {
        icon: Star,
        title: "Rating System",
        description: "Track and display book ratings to help users discover the best content in your collection."
    },
    {
        icon: Shield,
        title: "Secure Management",
        description: "Protected access with authentication to ensure your library data remains safe and secure."
    }
];

export default function FeaturesSection() {
    return (
        <section id="features" className="py-20 bg-gray-50 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Powerful Features
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Everything you need to efficiently manage your digital book collection
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                        >
                            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <feature.icon className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}