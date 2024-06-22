"use server";

import { MarsPhoto } from "@/types/MarsRover/marsRover";
import { User } from "@/types/Users/users";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Session } from "@/types/Users/users";
const prisma = new PrismaClient();

export async function markImageAsFavorite(
  userData: User,
  marsPhoto: MarsPhoto,
) {
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

    let existingMarsData = await prisma.marsRoverData.findFirst({
      where: { jsonData: { equals: marsPhoto } },
    });

    if (!existingMarsData) {
      existingMarsData = await prisma.marsRoverData.create({
        data: {
          jsonData: marsPhoto,
          likes: 1,
        },
      });
    } else {
      existingMarsData = await prisma.marsRoverData.update({
        where: { id: existingMarsData.id },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    }

    let existingFavorite = await prisma.favoriteMarsRoverData.findFirst({
      where: { userId: user.id, marsRoverDataId: existingMarsData.id },
    });

    if (!existingFavorite) {
      existingFavorite = await prisma.favoriteMarsRoverData.create({
        data: {
          user: { connect: { id: user.id } },
          marsRoverData: { connect: { id: existingMarsData.id } },
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

export async function unMarkImageAsFavorite(userData: User, marsPhoto: any) {
  const session: Session = await getServerSession(options);

  if (!session) {
    throw new Error("Unauthorized: User does not have access.");
  }

  let existingMarsData;
  let id;
  try {
    const user = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (marsPhoto.marsRoverDataId) {
      existingMarsData = await prisma.marsRoverData.findFirst({
        where: { id: marsPhoto.marsRoverDataId },
      });

      id = existingMarsData?.id;
    } else {
      existingMarsData = await prisma.marsRoverData.findFirst({
        where: { jsonData: { equals: marsPhoto } },
      });
      id = existingMarsData?.id;
    }

    if (!existingMarsData) {
      throw new Error("Mars Photo not found");
    }

    const favoriteMarsPhotoToDelete =
      await prisma.favoriteMarsRoverData.findFirst({
        where: {
          userId: user.id,
          marsRoverDataId: id,
        },
      });

    if (!favoriteMarsPhotoToDelete) {
      console.error("Favorite Mars Photo not found for deletion.");
      return;
    }

    prisma.$transaction([
      prisma.marsRoverData.update({
        where: { id: id },
        data: {
          likes: {
            decrement: 1,
          },
        },
      }),
      prisma.favoriteMarsRoverData.delete({
        where: { id: favoriteMarsPhotoToDelete.id },
      }),
    ]);
  } catch (error) {
    console.error("Error unmarking image as favorite:", error);
    throw error;
  }
}

export async function getExistingMarsPhoto({ email }: User, data: any) {
  const session: Session = await getServerSession(options);

  if (!session) {
    throw new Error("Unauthorized: User does not have access.");
  }

  let existingMarsRoverData;
  let id;

  try {
    if (!email) return null;

    if (data.marsRoverDataId) {
      existingMarsRoverData = await prisma.marsRoverData.findFirst({
        where: { id: data.marsRoverDataId },
      });
      id = data.marsRoverDataId;
    } else {
      existingMarsRoverData = await prisma.marsRoverData.findFirst({
        where: { jsonData: { equals: data } },
      });

      id = existingMarsRoverData?.id;
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }
    if (!existingMarsRoverData) {
      return null;
    }

    const existingFavorite = await prisma.favoriteMarsRoverData.findFirst({
      where: { userId: user.id, marsRoverDataId: id as string },
    });

    return existingFavorite;
  } catch (error) {
    console.error("Error getting existing Apod:", error);
    throw error;
  }
}

export async function getFavoriteMarsPhotos(userData: User) {
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

    const favoriteMarsPhotos = await prisma.favoriteMarsRoverData.findMany({
      where: { userId: user.id },
      include: { marsRoverData: true },
      orderBy: { marsRoverData: { createdAt: "desc" } },
    });

    return favoriteMarsPhotos;
  } catch (error) {
    console.error("Error getting favorite Apods:", error);
    throw error;
  }
}
