"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function totalFavoriteApods() {
  try {
    const total = await prisma.favoriteApod.count();
    return total;
  } catch (error) {
    console.error("Error getting total favorite Apods:", error);
    throw error;
  }
}

export async function totalFavoriteRoverImages() {
  try {
    const total = await prisma.favoriteMarsRoverData.count();
    return total;
  } catch (error) {
    console.error("Error getting total favorite rover images:", error);
    throw error;
  }
}
