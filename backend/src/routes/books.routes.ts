import express from "express";
import { getBooks, createBook, updateBook, deleteBook } from "../controllers/books.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../config/multer.js";

const router = express.Router();

router.get("/all", authMiddleware, getBooks);
router.post("/create", authMiddleware, upload.single("thumbnail"), createBook);
router.put("/:id", authMiddleware, upload.single("thumbnail"), updateBook);
router.delete("/:id", authMiddleware, deleteBook);

export default router;
