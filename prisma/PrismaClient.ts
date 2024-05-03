import { PrismaClient } from '@prisma/client';
// ? Create a new prisma client
export const prisma = new PrismaClient({
     log: ["info", "warn", "error"]
});
