"use server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Session } from "@/types/Users/users";
import moment from "moment";
const prisma = new PrismaClient();

const reducer = (count: number, data: any, isApod: boolean) => {
  if (isApod) {
    return count + data[0]?.apod?.likes || 0;
  }
  return count + data[0]?.marsRoverData?.likes || 0;
};

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
  const yesterday = moment(today).subtract(1, "day").toDate();

  const favoriteApods = await prisma.favoriteApod.findMany({
    where: {
      apod: {
        createdAt: {
          gt: yesterday,
          lte: tomorrow,
        },
        likes: {
          gt: 0,
        },
      },
    },
    select: {
      apod: {
        select: {
          likes: true,
        },
      },
    },
  });

  return reducer(0, favoriteApods, true);
}

export async function WeeklyApodLikes() {
  const session: Session = await getServerSession(options);

  if (!session || session?.user?.role !== "ADMIN") {
    throw new Error(
      "Unauthorized access: User does not have admin privileges.",
    );
  }
  const startOfThisWeek = moment().startOf("isoWeek");
  const startOfNextWeek = startOfThisWeek.clone().add(1, "week");

  const favoriteApodsCount = await prisma.favoriteApod.findMany({
    where: {
      apod: {
        createdAt: {
          gte: startOfThisWeek.toDate(),
          lt: startOfNextWeek.toDate(),
        },
        likes: {
          gt: 0,
        },
      },
    },
    select: {
      apod: {
        select: {
          likes: true,
        },
      },
    },
  });

  return reducer(0, favoriteApodsCount, true);
}

export async function LastWeekApodLikes() {
  const session: Session = await getServerSession(options);

  if (!session || session?.user?.role !== "ADMIN") {
    throw new Error(
      "Unauthorized access: User does not have admin privileges.",
    );
  }
  const startOfThisWeek = moment().startOf("isoWeek");
  const startOfLastWeek = startOfThisWeek.clone().subtract(1, "week");

  const favoriteApodsCount = await prisma.favoriteApod.findMany({
    where: {
      apod: {
        createdAt: {
          gte: startOfLastWeek.toDate(),
          lt: startOfThisWeek.toDate(),
        },
        likes: {
          gt: 0,
        },
      },
    },
    select: {
      apod: {
        select: {
          likes: true,
        },
      },
    },
  });

  return reducer(0, favoriteApodsCount, true);
}

export async function DailyRoverLikes() {
  const session: Session = await getServerSession(options);

  if (!session || session?.user?.role !== "ADMIN") {
    throw new Error(
      "Unauthorized access: User does not have admin privileges.",
    );
  }
  const today = moment().startOf("day").toDate();
  const tomorrow = moment(today).add(1, "day").toDate();
  const yesterday = moment(today).subtract(1, "day").toDate();

  const favoriteRoverImagesCount = await prisma.favoriteMarsRoverData.findMany({
    where: {
      marsRoverData: {
        createdAt: {
          gt: yesterday,
          lt: tomorrow,
        },
        likes: {
          gt: 0,
        },
      },
    },
    select: {
      marsRoverData: {
        select: {
          likes: true,
        },
      },
    },
  });
  console.log(favoriteRoverImagesCount);
  return reducer(0, favoriteRoverImagesCount, false);
}

export async function WeeklyRoverLikes() {
  const session: Session = await getServerSession(options);

  if (!session || session?.user?.role !== "ADMIN") {
    throw new Error(
      "Unauthorized access: User does not have admin privileges.",
    );
  }
  const startOfThisWeek = moment().startOf("isoWeek");
  const startOfNextWeek = startOfThisWeek.clone().add(1, "week");
  const favoriteRoverImagesCount = await prisma.favoriteMarsRoverData.findMany({
    where: {
      marsRoverData: {
        createdAt: {
          gte: startOfThisWeek.toDate(),
          lt: startOfNextWeek.toDate(),
        },
        likes: {
          gt: 0,
        },
      },
    },
    select: { marsRoverData: { select: { likes: true } } },
  });

  return reducer(0, favoriteRoverImagesCount, false);
}

export async function LastWeekRoverLikes() {
  const session: Session = await getServerSession(options);

  if (!session || session?.user?.role !== "ADMIN") {
    throw new Error(
      "Unauthorized access: User does not have admin privileges.",
    );
  }
  const startOfThisWeek = moment().startOf("isoWeek");
  const startOfLastWeek = startOfThisWeek.clone().subtract(1, "week");

  const favoriteRoverImagesCount = await prisma.favoriteMarsRoverData.findMany({
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
          likes: true,
        },
      },
    },
  });

  return reducer(0, favoriteRoverImagesCount, false);
}
