"use server";

import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Session } from "@/types/Users/users";
import moment from "moment";

export async function getManifest(rover: string) {
  const session: Session = await getServerSession(options);

  if (!session) {
    throw new Error("Unauthorized access: User does not have access.");
  }

  const manifest = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${process.env.NASA_API_KEY}`,
  );
  return manifest.json();
}

export async function MarsRoverData(date: any, selectedRover: string) {
  const session: Session = await getServerSession(options);

  if (!session) {
    throw new Error("Unauthorized access: User does not have access.");
  }

  const today = moment(date).format();

  const marsRoverData = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos?api_key=${process.env.NASA_API_KEY}&earth_date=${today}`,
  );

  return marsRoverData.json();
}
