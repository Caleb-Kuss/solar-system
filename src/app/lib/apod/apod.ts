import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getApods() {
  try {
    const apods = await prisma.apod.findMany();
    return apods;
  } catch (error) {
    console.error("Error getting apods:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
