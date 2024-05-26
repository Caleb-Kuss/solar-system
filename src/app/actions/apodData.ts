"use server";

import moment from "moment";

export default async function getApodByDate(date: any) {
  const formattedDate = moment(date).format("YYYY-MM-DD");
  const apodData = await fetch(
    `https://api.nasa.gov/planetary/apod/?api_key=${process.env.NASA_API_KEY}&date=${formattedDate}`,
  );
  return apodData.json();
}
