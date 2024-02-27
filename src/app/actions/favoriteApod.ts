"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function markImageAsFavorite(userEmail: any, apod: Apod) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail.email },
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
          hdUrl: apod.hdUrl,
          copyRight: apod.copyRight,
          datePosted: apod.datePosted,
          favoritedById: user.id,
        },
      });
    }

    await prisma.user.update({
      where: { email: userEmail.email },
      data: {
        favoriteApods: {
          connect: { id: existingApod.id },
        },
      },
    });

    return "ok";
  } catch (error) {
    console.error("Error marking image as favorite:", error);
    throw error;
  }
}
