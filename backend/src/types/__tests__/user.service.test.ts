// __tests__/user.service.test.ts
import { listUsers, getUserById, type UserResult } from "../../services/users.service.js";
import { db } from "../../config/database.js";

// Mock db object
jest.mock("../../config/database.js", () => ({
    db: {
        select: jest.fn(() => ({
            from: jest.fn(() => ({
                where: jest.fn(() => ({
                    limit: jest.fn().mockReturnThis(),
                    offset: jest.fn().mockResolvedValue([
                        { id: 1, email: "test@example.com", is_verified: true },
                    ]),
                    // Tambahkan total count mock
                    then: jest.fn().mockResolvedValue([{ total: 1 }]),
                })),
            })),
        })),
    },
}));

describe("User Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("listUsers", () => {
        it("should return users with default limit and offset", async () => {
            const result = await listUsers();
            expect(result.data).toEqual([
                { id: 1, email: "test@example.com", is_verified: true },
            ]);
            expect(result.total).toBe(1);
        });

        it("should apply search filter", async () => {
            await listUsers("test");
            expect(db.select).toHaveBeenCalled();
        });

        it("should apply verified filter", async () => {
            await listUsers(undefined, true);
            expect(db.select).toHaveBeenCalled();
        });
    });

    describe("getUserById", () => {
        it("should return user when found", async () => {
            const result = await getUserById(1);
            expect(result).toEqual({
                id: 1,
                email: "test@example.com",
                is_verified: true,
            });
        });

        it("should return null when not found", async () => {
            // override mock
            (db.select().from().where as jest.Mock).mockResolvedValueOnce([]);
            const result = await getUserById(999);
            expect(result).toBeNull();
        });
    });
});
