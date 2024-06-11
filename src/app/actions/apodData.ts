"use server";

import moment from "moment";

import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Session } from "@/types/Users/users";

export default async function getApodByDate(date: any) {
  const session: Session = await getServerSession(options);

  if (!session) {
    throw new Error("Unauthorized access: User does not have access.");
  }

  const formattedDate = moment(date).format("YYYY-MM-DD");
  const apodData = await fetch(
    `https://api.nasa.gov/planetary/apod/?api_key=${process.env.NASA_API_KEY}&date=${formattedDate}`,
  );
  return apodData.json();
}
