"use server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Session } from "@/types/Users/users";
import moment from "moment";
const prisma = new PrismaClient();

export async function totalFavoriteApods() {
  const session: Session = await getServerSession(options);

  if (!session || session?.user?.role !== "ADMIN") {
    throw new Error(
      "Unauthorized access: User does not have admin privileges.",
    );
  }

  try {
    const total = await prisma.favoriteApod.count();
    return total;
  } catch (error) {
    console.error("Error getting total favorite Apods:", error);
    throw error;
  }
}

export async function totalFavoriteRoverImages() {
  const session: Session = await getServerSession(options);

  if (!session || session?.user?.role !== "ADMIN") {
    throw new Error(
      "Unauthorized access: User does not have admin privileges.",
    );
  }
  try {
    const total = await prisma.favoriteMarsRoverData.count();
    return total;
  } catch (error) {
    console.error("Error getting total favorite rover images:", error);
    throw error;
  }
}

// This only counts new records
export async function DailyApodLikes() {
  const session: Session = await getServerSession(options);

  if (!session || session?.user?.role !== "ADMIN") {
    throw new Error(
      "Unauthorized access: User does not have admin privileges.",
    );
  }
  const today = moment().startOf("day").toDate();
  const tomorrow = moment(today).add(1, "day").toDate();

  const favoriteApodsCount = await prisma.favoriteApod.count({
    where: {
      apod: {
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    },
  });

  return favoriteApodsCount;
}

export async function WeeklyApodLikes() {
  const session: Session = await getServerSession(options);

  if (!session || session?.user?.role !== "ADMIN") {
    throw new Error(
      "Unauthorized access: User does not have admin privileges.",
    );
  }
  const startOfThisWeek = moment().startOf("isoWeek");
  const startOfLastWeek = startOfThisWeek.clone().subtract(1, "week");

  const endOfLastWeek = startOfThisWeek.clone().subtract(1, "day").endOf("day");

  const favoriteApodsCount = await prisma.favoriteApod.count({
    where: {
      apod: {
        createdAt: {
          gte: startOfLastWeek.toDate(),
          lt: endOfLastWeek.toDate(),
        },
      },
    },
  });

  return favoriteApodsCount;
}

// This only counts new records
export async function DailyRoverLikes() {
  const session: Session = await getServerSession(options);

  if (!session || session?.user?.role !== "ADMIN") {
    throw new Error(
      "Unauthorized access: User does not have admin privileges.",
    );
  }
  const today = moment().startOf("day").toDate();
  const tomorrow = moment(today).add(1, "day").toDate();

  const favoriteRoverImagesCount = await prisma.favoriteMarsRoverData.count({
    where: {
      marsRoverData: {
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    },
  });

  return favoriteRoverImagesCount;
}

export async function WeeklyRoverLikes() {
  const session: Session = await getServerSession(options);

  if (!session || session?.user?.role !== "ADMIN") {
    throw new Error(
      "Unauthorized access: User does not have admin privileges.",
    );
  }
  const startOfThisWeek = moment().startOf("isoWeek");
  const startOfLastWeek = startOfThisWeek.clone().subtract(1, "week");

  const endOfLastWeek = startOfThisWeek.clone().subtract(1, "day").endOf("day");

  const favoriteRoverImagesCount = await prisma.favoriteMarsRoverData.count({
    where: {
      marsRoverData: {
        createdAt: {
          gte: startOfLastWeek.toDate(),
          lt: endOfLastWeek.toDate(),
        },
      },
    },
  });

  return favoriteRoverImagesCount;
}
