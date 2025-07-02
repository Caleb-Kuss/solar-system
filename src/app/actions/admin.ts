"use server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Session } from "@/types/Users/users";
import moment from "moment";

const prisma = new PrismaClient();
const startOfThisWeek = moment().startOf("isoWeek");
const startOfLastWeek = startOfThisWeek.clone().subtract(1, "week");

const startOfNextWeek = startOfThisWeek.clone().add(1, "week");
const today = moment().startOf("day").toDate();
const tomorrow = moment(today).add(1, "day").toDate();

const getFavoriteApods = async (greaterDate: Date, lessDate: Date) => {
  return prisma.favoriteApod.findMany({
    where: {
      apod: {
        createdAt: {
          gte: greaterDate,
          lt: lessDate,
        },
        likes: {
          gt: 0,
        },
      },
    },
    select: {
      apod: {
        select: {
          id: true,
          likes: true,
        },
      },
    },
  });
};

const getFavoriteRoverImages = async (greaterDate: Date, lessDate: Date) => {
  return prisma.favoriteMarsRoverData.findMany({
    where: {
      marsRoverData: {
        createdAt: {
          gte: startOfLastWeek.toDate(),
          lt: startOfThisWeek.toDate(),
        },
        likes: { gt: 0 },
      },
    },
    select: {
      marsRoverData: {
        select: {
          id: true,
          likes: true,
        },
      },
    },
  });
};

const reducer = (data: any, isApod: boolean) => {
  if (isApod) {
    const uniqueApods = new Set();
    const total = data.reduce((total: number, apod: any) => {
      const id = apod?.apod?.id;
      const likes = apod?.apod?.likes ?? 0;

      if (id && !uniqueApods.has(id)) {
        uniqueApods.add(id);
        return total + likes;
      } else {
        return total;
      }
    }, 0);
    return total;
  } else {
    const uniqueRoverImages = new Set();
    const total = data.reduce((total: number, marsRoverData: any) => {
      const id = marsRoverData?.marsRoverData?.id;
      const likes = marsRoverData?.marsRoverData?.likes ?? 0;

      if (id && !uniqueRoverImages.has(id)) {
        uniqueRoverImages.add(id);
        return total + likes;
      } else {
        return total;
      }
    }, 0);

    return total;
  }
};

export async function totalFavoriteApods() {
  const session: Session = await getServerSession(options);

  if (!session || session?.user?.role !== "ADMIN") {
    throw new Error(
      "Unauthorized access: User does not have admin privileges.",
    );
  }

  try {
    return prisma.favoriteApod.count();
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
    return prisma.favoriteMarsRoverData.count();
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

  const favoriteApods = await getFavoriteApods(today, tomorrow);

  return reducer(favoriteApods, true);
}

export async function WeeklyApodLikes() {
  const session: Session = await getServerSession(options);

  if (!session || session?.user?.role !== "ADMIN") {
    throw new Error(
      "Unauthorized access: User does not have admin privileges.",
    );
  }

  const favoriteApodsCount = await getFavoriteApods(
    startOfThisWeek.toDate(),
    startOfNextWeek.toDate(),
  );

  return reducer(favoriteApodsCount, true);
}

export async function LastWeekApodLikes() {
  const session: Session = await getServerSession(options);

  if (!session || session?.user?.role !== "ADMIN") {
    throw new Error(
      "Unauthorized access: User does not have admin privileges.",
    );
  }

  const favoriteApodsCount = await getFavoriteApods(
    startOfLastWeek.toDate(),
    startOfThisWeek.toDate(),
  );

  return reducer(favoriteApodsCount, true);
}

export async function DailyRoverLikes() {
  const session: Session = await getServerSession(options);

  if (!session || session?.user?.role !== "ADMIN") {
    throw new Error(
      "Unauthorized access: User does not have admin privileges.",
    );
  }

  const favoriteRoverImagesCount = await getFavoriteRoverImages(
    today,
    tomorrow,
  );

  return reducer(favoriteRoverImagesCount, false);
}

export async function WeeklyRoverLikes() {
  const session: Session = await getServerSession(options);

  if (!session || session?.user?.role !== "ADMIN") {
    throw new Error(
      "Unauthorized access: User does not have admin privileges.",
    );
  }

  const favoriteRoverImagesCount = await getFavoriteRoverImages(
    startOfThisWeek.toDate(),
    startOfNextWeek.toDate(),
  );

  return reducer(favoriteRoverImagesCount, false);
}

export async function LastWeekRoverLikes() {
  const session: Session = await getServerSession(options);

  if (!session || session?.user?.role !== "ADMIN") {
    throw new Error(
      "Unauthorized access: User does not have admin privileges.",
    );
  }

  const favoriteRoverImagesCount = await getFavoriteRoverImages(
    startOfLastWeek.toDate(),
    startOfThisWeek.toDate(),
  );

  return reducer(favoriteRoverImagesCount, false);
}
