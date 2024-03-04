"use server";

import { Apod, FavoriteApod } from "@/types/Apods/apods";
import { User } from "@/types/Users/users";
import { PrismaClient } from "@prisma/client";
import { log } from "console";
import { revalidatePath } from "next/cache";
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
  } finally {
    revalidatePath("/dashboard/favorites/apods");
  }
}
export async function unMarkImageAsFavorite(userData: User, apod: any) {
  let existingApod;

  try {
    const user = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (apod.apodId) {
      existingApod = await prisma.apod.findFirst({
        where: { id: apod.apodId as string },
      });
    } else {
      existingApod = await prisma.apod.findFirst({
        where: { url: apod.url as string },
      });
    }

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
  } finally {
    revalidatePath("/dashboard/favorites/apods");
  }
}

export async function getExistingApod({ email }: User, data: any) {
  let existingApod;
  let id;
  try {
    if (!email) return null;

    if (data.apodId) {
      id = data.apodId;
    } else {
      existingApod = await prisma.apod.findFirst({
        where: { url: data.url as string },
      });
      id = existingApod?.id;
    }

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return null;
    }

    const existingFavorite = await prisma.favoriteApod.findFirst({
      where: { userId: user.id, apodId: id as string },
    });

    return existingFavorite;
  } catch (error) {
    console.error("Error getting existing Apod:", error);
    throw error;
  }
}

export async function getFavoriteApods(userData: User) {
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

    return favoriteApods;
  } catch (error) {
    console.error("Error getting favorite Apods:", error);
    throw error;
  } finally {
    revalidatePath("/dashboard/favorites/apods");
  }
}
