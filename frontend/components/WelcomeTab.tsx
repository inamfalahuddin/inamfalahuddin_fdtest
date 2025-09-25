interface WelcomeTabProps {
    user: { name?: string | null; email: string; is_verified: boolean } | null;
}

export default function WelcomeTab({ user }: WelcomeTabProps) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Welcome, {user?.name || user?.email}!</h2>
            <p>Email Verified: {user?.is_verified ? "Yes" : "No"}</p>
        </div>
    );
}
