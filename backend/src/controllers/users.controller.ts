import type { Request, Response } from "express";
import * as usersService from "../services/users.service.js";
import { ApiResponse } from "../utils/response.utils.js";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get list of users with optional search and verification filter
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name or email
 *       - in: query
 *         name: verified
 *         schema:
 *           type: boolean
 *         description: Filter by email verification status
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of users per page
 *     responses:
 *       200:
 *         description: List of users with pagination
 *       400:
 *         description: Bad request
 */
export const getUsers = async (req: Request, res: Response) => {
    try {
        // Query params
        const { search, verified, page = "1", limit = "10" } = req.query;

        // Konversi page & limit ke number
        const pageNumber = Math.max(parseInt(page as string, 10), 1);
        const limitNumber = Math.max(parseInt(limit as string, 10), 1);
        const offset = (pageNumber - 1) * limitNumber;

        // Ambil data users
        const { data: users, total } = await usersService.listUsers(
            search as string | undefined,
            verified === undefined ? undefined : verified === "true",
            limitNumber,
            offset
        );

        // Hitung total pages
        const totalPages = Math.ceil(total / limitNumber);

        return ApiResponse.success(res, {
            users,
            pagination: {
                total,
                page: pageNumber,
                limit: limitNumber,
                totalPages
            }
        });
    } catch (error: any) {
        return ApiResponse.error(res, error.message, 400);
    }
};

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current logged-in user info
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 *       400:
 *         description: User not found
 */
export const getUserInfo = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.user?.id);
        if (!userId) throw new Error("User not found");

        const user = await usersService.getUserById(userId);
        if (!user) throw new Error("User not found");

        return ApiResponse.success(res, { user }, "Current user info");
    } catch (error: any) {
        return ApiResponse.error(res, error.message, 400);
    }
};