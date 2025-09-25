
export interface User {
    id: number;
    name: string | null;
    email: string;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
}

export interface LoginResponse {
    status: number;
    success: boolean;
    message: string;
    data: {
        user: User;
        token: string;
    };
}

export interface RegisterResponse {
    status: number;
    success: boolean;
    message: string;
    data: {
        user: User;
    };
}