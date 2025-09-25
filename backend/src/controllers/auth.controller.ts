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

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
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


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Bad request
 */
export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);

        return ApiResponse.success(res, result, "Login successful");
    } catch (error: any) {
        return ApiResponse.error(res, error.message, 400);
    }
};


/**
 * @swagger
 * /auth/verify-email:
 *   get:
 *     summary: Verify user email
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Verification token sent via email
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Token required or invalid
 */
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


/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       400:
 *         description: Email required
 */
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


/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Token and new password required
 */
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
