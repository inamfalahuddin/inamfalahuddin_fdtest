import { db } from "../config/database.js";
import { users } from "../models/user.model.js";
import { eq, like, and, count, or } from "drizzle-orm";

export interface UserResult {
    id: number;
    email: string;
    is_verified: boolean | null;
}

export const listUsers = async (
    search?: string,
    verified?: boolean,
    limit?: number,
    offset?: number
): Promise<{ data: UserResult[]; total: number }> => {
    const conditions = [];

    if (search) {
        conditions.push(
            or(
                like(users.email, `%${search}%`),
                like(users.name, `%${search}%`)
            )
        );
    }

    if (verified !== undefined) {
        conditions.push(eq(users.is_verified, verified));
    }

    const data = await db
        .select({
            id: users.id,
            email: users.email,
            is_verified: users.is_verified
        })
        .from(users)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .limit(limit ?? 10)
        .offset(offset ?? 0);

    const totalResult = await db
        .select({ total: count() })
        .from(users)
        .where(conditions.length > 0 ? and(...conditions) : undefined);

    const total = Number(totalResult[0]?.total ?? 0);

    return { data, total };
};

export const getUserById = async (id: number): Promise<UserResult | null> => {
    const result = await db
        .select({
            id: users.id,
            email: users.email,
            is_verified: users.is_verified
        })
        .from(users)
        .where(eq(users.id, id));

    return result[0] ?? null;
};