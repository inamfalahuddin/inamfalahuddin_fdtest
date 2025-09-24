import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
    interface Request {
        user?: {
            id: number;
            email?: string;
        };
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1] || "";

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json({ message: "JWT secret not configured" });
    }

    try {
        const decoded = jwt.verify(token, secret) as unknown as JwtPayload & { id: number; email?: string };

        if (!decoded.id) {
            return res.status(401).json({ message: "Invalid token payload" });
        }

        req.user = { id: decoded.id, email: decoded.email || '' };
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
