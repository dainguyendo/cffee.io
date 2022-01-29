import { PrismaClient } from "db";

const prisma: PrismaClient = (global as any).prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") (global as any).prisma = prisma;

export default prisma;
