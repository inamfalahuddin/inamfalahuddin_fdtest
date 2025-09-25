interface TabsProps {
    activeTab: "welcome" | "users" | "books";
    userData: { name?: string | null; email: string; is_verified: boolean } | null;
    setActiveTab: (tab: "welcome" | "users" | "books") => void;
}

export default function Tabs({ activeTab, setActiveTab, userData }: TabsProps) {
    console.log(userData);
    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-4 mb-6">
                {["welcome", "users", "books"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as "welcome" | "users" | "books")}
                        className={`px-4 py-2 rounded-lg ${activeTab === tab ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {userData ? (
                userData.is_verified ? (
                    <span className="text-green-500">Email Verified</span>
                ) : (
                    <button className="px-4 py-2 rounded-lg text-white bg-gray-800">
                        Verify Email
                    </button>
                )
            ) : null}
        </div>
    );
}
