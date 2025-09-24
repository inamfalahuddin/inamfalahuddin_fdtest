import type { Request, Response } from "express";
import * as usersService from "../services/users.service.js";
import { ApiResponse } from "../utils/response.utils.js";

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