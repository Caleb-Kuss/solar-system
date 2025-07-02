"use server";

import { Apod } from "@/types/Apods/apods";
import { User } from "@/types/Users/users";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Session } from "@/types/Users/users";

const prisma = new PrismaClient();

async function upsertApod(apod: Apod) {
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
        likes: 1,
      },
    });
  } else {
    existingApod = await prisma.apod.update({
      where: { id: existingApod.id },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
  }

  return existingApod;
}

export async function markImageAsFavorite(userData: User, apod: Apod) {
  const session: Session = await getServerSession(options);

  if (!session) {
    throw new Error("Unauthorized access: User does not have access.");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const existingApod = await upsertApod(apod);

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

export async function unMarkImageAsFavorite(userData: User, apod: any) {
  const session: Session = await getServerSession(options);

  if (!session) {
    throw new Error("Unauthorized: User does not have access.");
  }

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
        where: { id: apod.apodId },
      });
    } else {
      existingApod = await prisma.apod.findFirst({
        where: { url: apod.url },
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

    prisma.$transaction([
      prisma.apod.update({
        where: { id: existingApod.id },
        data: {
          likes: {
            decrement: 1,
          },
        },
      }),
      prisma.favoriteApod.delete({
        where: { id: favoriteApodToDelete.id },
      }),
    ]);
  } catch (error) {
    console.error("Error unmarking image as favorite:", error);
    throw error;
  }
}

export async function getExistingApod({ email }: User, data: any) {
  const session: Session = await getServerSession(options);

  if (!session) {
    throw new Error("Unauthorized: User does not have access.");
  }

  let existingApod;
  let id;
  try {
    if (!email) return null;

    if (data.apodId) {
      existingApod = await prisma.apod.findFirst({
        where: { id: data.apodId },
      });
      id = data.apodId;
    } else {
      existingApod = await prisma.apod.findFirst({
        where: { url: data.url },
      });

      id = existingApod?.id;
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingApod || !user) {
      return null;
    }

    return prisma.favoriteApod.findFirst({
      where: { userId: user.id, apodId: id as string },
    });
  } catch (error) {
    console.error("Error getting existing Apod:", error);
    throw error;
  }
}

export async function getFavoriteApods(userData: User) {
  const session: Session = await getServerSession(options);

  if (!session) {
    throw new Error("Unauthorized: User does not have access.");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return prisma.favoriteApod.findMany({
      where: { userId: user.id },
      include: { apod: true },
      orderBy: { apod: { createdAt: "desc" } },
    });
  } catch (error) {
    console.error("Error getting favorite Apods:", error);
    throw error;
  }
}
