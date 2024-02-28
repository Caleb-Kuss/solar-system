"use server";

import { Apod } from "@/types/Apods/apods";
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