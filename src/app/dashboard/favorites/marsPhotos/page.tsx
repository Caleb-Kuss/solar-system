import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";
import Favorites from "@/components/marsRover/FavoriteRover";
import Navbar from "@/components/NavBar/NavBar";
import { getFavoriteMarsPhotos } from "@/app/actions/favoriteRover";
import ScrollToTopButton from "@/components/Top/Top";

import type { Metadata } from "next";
import MarsDetails from "@/components/Details/MarsDetails";

export const metadata: Metadata = {
  title: "Solar System | Mars Photos",
  description: "Your Favorite Mars Photos."
};

export default async function FavoriteApods() {
  const session = await getServerSession(options);
  if (!session) return null;

  const data: any = await getFavoriteMarsPhotos(session.user as any);
  if (!data) return null;

  const totalPhotos = data.length;

  const message =
    totalPhotos === 1 ? "1 Photo Found" : `${totalPhotos} Photos Found`;

  return (
    <>
      <Navbar />
      <div className="bg-gray-800 text-white min-h-screen py-8 px-4">
        <h1 className="text-xl md:text-3xl bg-gray-800 text-white p-4 md:p-8 flex flex-col items-center">
          {message}
        </h1>

        <div className="bg-gray-800 text-white flex flex-wrap justify-center">
          {data.map((marsData: any) => (
            <div
              key={marsData.marsRoverData.jsonData.id}
              className="bg-gray-800 text-white p-4 md:p-8 flex flex-col items-center max-w-md mx-2 mb-4"
            >
              <div className="mx-auto">
                <Image
                  className="mt-2 rounded"
                  width={500}
                  height={500}
                  src={marsData.marsRoverData.jsonData.img_src}
                  alt={marsData.marsRoverData.jsonData.camera.full_name}
                />
              </div>
              <div className="flex justify-center mt-2 space-x-10">
                <Favorites data={marsData} />
                <MarsDetails data={marsData.marsRoverData.jsonData} />
              </div>
            </div>
          ))}
        </div>
        <ScrollToTopButton />
      </div>
    </>
  );
}
