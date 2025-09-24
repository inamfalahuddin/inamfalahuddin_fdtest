import type { Request, Response } from "express";
import {
    registerUser,
    loginUser,
    verifyEmail,
    forgotPassword,
    resetPassword,
    // changePassword,
} from "../services/auth.service.js";
import { ApiResponse } from "../utils/response.utils.js";

export const registerController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await registerUser(email, password);

        return ApiResponse.success(
            res,
            { user },
            "User registered successfully. Please check your email to verify your account.",
            201
        );
    } catch (error: any) {
        return ApiResponse.error(res, error.message, 400);
    }
};

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);

        return ApiResponse.success(res, result, "Login successful");
    } catch (error: any) {
        return ApiResponse.error(res, error.message, 400);
    }
};

export const verifyEmailController = async (req: Request, res: Response) => {
    try {
        const { token } = req.query;
        if (!token || typeof token !== "string") throw new Error("Token required");

        await verifyEmail(token);

        return ApiResponse.success(res, {}, "Email verified successfully");
    } catch (error: any) {
        return ApiResponse.error(res, error.message, 400);
    }
};

export const forgotPasswordController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) throw new Error("Email required");

        await forgotPassword(email);

        return ApiResponse.success(res, {}, "Password reset email sent");
    } catch (error: any) {
        return ApiResponse.error(res, error.message, 400);
    }
};

export const resetPasswordController = async (req: Request, res: Response) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) throw new Error("Token and new password required");

        await resetPassword(token, newPassword);

        return ApiResponse.success(res, {}, "Password reset successfully");
    } catch (error: any) {
        return ApiResponse.error(res, error.message, 400);
    }
};

// =========================
// Change Password (optional)
// =========================
// export const changePasswordController = async (req: Request, res: Response) => {
//     try {
//         const userId = Number(req.user?.id); // assuming userId tersedia di req.user dari middleware auth
//         const { oldPassword, newPassword } = req.body;
//         if (!oldPassword || !newPassword) throw new Error("Old and new password required");

//         await changePassword(userId, oldPassword, newPassword);

//         return ApiResponse.success(res, {}, "Password changed successfully");
//     } catch (error: any) {
//         return ApiResponse.error(res, error.message, 400);
//     }
// };
