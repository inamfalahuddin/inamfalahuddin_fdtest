import * as bcrypt from "bcrypt";
import { db } from "../config/database.js";
import { users } from "../models/user.model.js";
import { redis } from "../config/redis.js";
import { generateToken } from "../utils/token.utils.js";
import { sendEmail } from "../config/mailer.js";
import { eq } from "drizzle-orm";

export const registerUser = async (email: string, password: string) => {
    const [existing] = await db.select().from(users).where(eq(users.email, email));
    if (existing) throw new Error("Email already registered");

    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await db.insert(users)
        .values({ email, password: hashedPassword })
        .returning();

    if (!user) throw new Error("Failed to create user");

    const token = generateToken({ id: user.id }, 3600 * 24);
    await redis.set(`verify_${token}`, String(user.id), "EX", 24 * 60 * 60);

    await sendEmail(
        email,
        "Verify your account",
        `<p>Click <a href="${process.env.FRONTEND_URL}/verify-email?token=${token}">here</a> to verify</p>`
    );

    return user;
};

export const loginUser = async (email: string, password: string) => {
    const result = await db.select().from(users).where(eq(users.email, email));
    const user = result[0];

    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = generateToken({ id: user.id }, 3600);
    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
};

export const verifyEmail = async (token: string) => {
    const userId = await redis.get(`verify_${token}`);
    if (!userId) throw new Error("Invalid or expired token");

    await db.update(users).set({ is_verified: true }).where(eq(users.id, Number(userId)));
    await redis.del(`verify_${token}`);
};

export const forgotPassword = async (email: string) => {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) throw new Error("User not found");

    const token = generateToken({ id: user.id }, 3600);
    await redis.set(`reset_${token}`, String(user.id), "EX", 60 * 60);

    await sendEmail(
        email,
        "Reset your password",
        `<p>Click <a href="${process.env.FRONTEND_URL}/reset-password?token=${token}">here</a> to reset</p>`
    );
};

export const resetPassword = async (token: string, newPassword: string) => {
    const userId = await redis.get(`reset_${token}`);
    if (!userId) throw new Error("Invalid or expired token");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.update(users).set({ password: hashedPassword }).where(eq(users.id, Number(userId)));
    await redis.del(`reset_${token}`);
};

export const changePassword = async (userId: number, oldPassword: string, newPassword: string) => {
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new Error("Old password incorrect");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.update(users).set({ password: hashedPassword }).where(eq(users.id, userId));
};
