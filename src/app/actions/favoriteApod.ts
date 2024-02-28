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
          favoritedById: user.id,
        },
      });
    }

    const connectApodToUser = await prisma.user.update({
      where: { email: userData.email },
      data: {
        favoriteApods: {
          connect: { id: existingApod.id },
        },
      },
    });
    if (!connectApodToUser) {
      console.error("Could not save the Apod as a favorite for the user.");
    }
    return connectApodToUser;
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

    const updatedUser = await prisma.user.update({
      where: { email: userData.email },
      data: {
        favoriteApods: {
          disconnect: { id: existingApod?.id },
        },
      },
    });

    if (!updatedUser) {
      console.error("Could not remove the Apod as a favorite for the user.");
    }
    return updatedUser;
  } catch (error) {
    console.error("Error marking image as favorite:", error);
    throw error;
  }
}
