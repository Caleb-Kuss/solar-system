"use server";
import moment from "moment";
export async function MarsRoverData(date: any, selectedRover: string) {
  const today = moment(date).format("YYYY-MM-DD");

  const marsRoverData = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos?api_key=${process.env.NASA_API_KEY}&earth_date=${today}`
  );

  return await marsRoverData.json();
}
