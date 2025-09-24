import { Router } from "express";
import {
    registerController,
    loginController,
    verifyEmailController,
    forgotPasswordController,
    resetPasswordController,
    // changePasswordController,
} from "../controllers/auth.controller.js";
// import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/verify-email", verifyEmailController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);

// Protected route (requires login)
// router.post("/change-password", authMiddleware, changePasswordController);

export default router;
