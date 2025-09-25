// app/components/Footer.tsx
export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold mb-4">BookMaster</h3>
                        <p className="text-gray-400">
                            The ultimate solution for managing your digital book collection.
                            Simple, efficient, and powerful.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/books" className="hover:text-white transition">Books Management</a></li>
                            <li><a href="#features" className="hover:text-white transition">Features</a></li>
                            <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Email: support@bookmaster.com</li>
                            <li>Phone: (555) 123-4567</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 BookMaster. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}