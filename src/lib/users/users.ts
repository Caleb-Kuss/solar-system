import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function getUserById(id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    });
    return user;
  } catch (error) {
    console.error("Error getting user by id:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export { getUsers, getUserById };
