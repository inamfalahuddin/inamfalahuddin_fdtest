import { Router } from "express";
import { getUserInfo, getUsers } from "../controllers/users.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// Protected route (requires login)
router.get("/all", authMiddleware, getUsers);
router.get("/info", authMiddleware, getUserInfo);

export default router;