"use server";

import { Apod, FavoriteApod } from "@/types/Apods/apods";
import { User } from "@/types/Users/users";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function markImageAsFavorite(userData: User, apod: Apod) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    let existingApod = await prisma.apod.findFirst({
      where: { url: apod.url },
    });

    if (!existingApod) {
      existingApod = await prisma.apod.create({
        data: {
          title: apod.title,
          explanation: apod.explanation,
          url: apod.url,
          hdUrl: apod.hdurl,
          copyRight: apod.copyright,
          datePosted: apod.date,
        },
      });
    }

    let existingFavorite = await prisma.favoriteApod.findFirst({
      where: { userId: user.id, apodId: existingApod.id },
    });

    if (!existingFavorite) {
      existingFavorite = await prisma.favoriteApod.create({
        data: {
          user: { connect: { id: user.id } },
          apod: { connect: { id: existingApod.id } },
        },
      });
    }

    if (!existingFavorite) {
      console.error("Could not save the Apod as a favorite for the user.");
    }
    return existingFavorite;
  } catch (error) {
    console.error("Error marking image as favorite:", error);
    throw error;
  }
}
export async function unMarkImageAsFavorite(userData: User, apod: Apod) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const existingApod = await prisma.apod.findFirst({
      where: { url: apod.url },
    });

    if (!existingApod) {
      throw new Error("Apod not found");
    }

    const favoriteApodToDelete = await prisma.favoriteApod.findFirst({
      where: {
        userId: user.id,
        apodId: existingApod.id,
      },
    });

    if (!favoriteApodToDelete) {
      console.error("FavoriteApod not found for deletion.");
      return;
    }

    return prisma.favoriteApod.delete({
      where: { id: favoriteApodToDelete.id },
    });
  } catch (error) {
    console.error("Error unmarking image as favorite:", error);
    throw error;
  }
}

export async function getExistingApod(userData: any, apod: Apod) {
  try {
    if (!userData) return null;
    const existingApod = await prisma.apod.findFirst({
      where: { url: apod.url },
    });

    const user = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!user) {
      return null;
    }
    if (!existingApod) {
      return null;
    }

    const existingFavorite = await prisma.favoriteApod.findFirst({
      where: { userId: user.id, apodId: existingApod.id },
    });

    return existingFavorite;
  } catch (error) {
    console.error("Error getting existing Apod:", error);
    throw error;
  }
}

export async function getFavoriteApods(userData: User) {
  console.log("userData: ", userData);

  try {
    const user = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const favoriteApods = await prisma.favoriteApod.findMany({
      where: { userId: user.id },
      include: { apod: true },
    });
    console.log("favoriteApods: ", favoriteApods);

    return favoriteApods;
  } catch (error) {
    console.error("Error getting favorite Apods:", error);
    throw error;
  }
}
