import express from "express";
import { getBooks, createBook } from "../controllers/books.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", authMiddleware, getBooks);
router.post("/", authMiddleware, upload.single("thumbnail"), createBook);

export default router;
