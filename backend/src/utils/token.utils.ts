import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

export const generateToken = (payload: object, expiresIn: number = 3600) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined");

    const options: SignOptions = { expiresIn };
    return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined");

    return jwt.verify(token, secret);
};
