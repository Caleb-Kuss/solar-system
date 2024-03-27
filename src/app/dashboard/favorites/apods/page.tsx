import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getFavoriteApods } from "@/app/actions/favoriteApod";
import Image from "next/image";
import Favorites from "@/components/Apods/Favorites";
import Navbar from "@/components/NavBar/NavBar";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar System | Favorite APODs",
  description: "Your Favorite APODs."
};

export default async function FavoriteApods() {
  const session = await getServerSession(options);
  if (!session) return null;

  const data = await getFavoriteApods(session.user as any);
  const totalApods = data.length;

  const message =
    totalApods === 1 ? "1 APOD Found" : `${totalApods} APODS Found`;

  return (
    <>
      <Navbar />
      <div className="bg-gray-800 text-white min-h-screen py-8 px-4">
        <h1 className="text-xl md:text-3xl bg-gray-800 text-white p-4 m-8 md:p-8 flex flex-col items-center">
          {message}
        </h1>

        <div className="bg-gray-800 text-white">
          {data.map((apod) => (
            <div
              key={apod.id}
              className="bg-gray-800 text-white p-4 md:p-8 flex flex-col items-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                {apod.apod.title}
              </h2>
              <div className="mx-auto w-full max-w-md">
                {apod.apod.url.includes("youtube") ? (
                  <iframe
                    src={apod.apod.url}
                    title={apod.apod.title}
                    width="100%"
                    height="281"
                    allowFullScreen
                    className="border-2 border-white rounded-lg shadow-md bg-black mx-auto block"
                  />
                ) : (
                  <Image
                    className="mt-2 rounded"
                    width={500}
                    height={500}
                    src={apod.apod.url}
                    alt={apod.apod.title}
                  />
                )}
              </div>
              <div className="flex justify-center mt-2">
                <Favorites data={apod} />
              </div>
              <p className="m-2 text-center">{apod.apod.explanation}</p>
              {apod.apod.copyRight && (
                <p className="text-sm text-center">
                  &copy; {apod.apod.copyRight}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
