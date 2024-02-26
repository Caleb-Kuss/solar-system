import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getApods() {
  try {
    const apods = await prisma.apod.findMany();
    return apods;
  } catch (error) {
    console.error("Error getting apods:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

type Apod = {
  title: string;
  explanation: string;
  url: string;
  hdurl: string;
  copyright: string;
  date: string;
  media_type: string;
  service_version: string;
};

export async function markImageAsFavorite(userEmail: string, apod: Apod) {
  try {
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    console.log("User", user);

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the Apod already exists in the database
    let existingApod = await prisma.apod.findFirst({
      where: { url: apod.url }
    });
    console.log("Existing Apod", existingApod);

    if (!existingApod) {
      // If the Apod does not exist, create it
      existingApod = await prisma.apod.create({ data: apod });
    }

    // Connect the Apod to the user's favoriteApods
    await prisma.user.update({
      where: { email: userEmail },
      data: {
        favoriteApods: {
          connect: { id: existingApod.id }
        }
      }
    });

    console.log("Image marked as favorite successfully");
  } catch (error) {
    console.error("Error marking image as favorite:", error);
    throw error;
  }
}
