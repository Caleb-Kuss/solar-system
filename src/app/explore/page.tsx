import Navbar from "@/components/NavBar/NavBar";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
export const metadata: Metadata = {
  title: "Solar System | Explorer",
  description: "Your space Explorer."
};
export default async function Explore() {
  const session = await getServerSession(options);
  if (!session) return null;

  const userName = session.user?.name;
  function capitalizeFirstLetter(name: string | undefined | null) {
    if (!name) return null;
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  return (
    <>
      <Navbar />
      <div className="bg-purple-900 text-white min-h-screen flex flex-col items-center justify-start pt-16 px-4">
        <h1 className="text-base font-bold mb-8 md:text-2xl xl:text-5xl">
          Welcome, {capitalizeFirstLetter(userName)}
        </h1>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/marsRover">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center space-x-2">
              <div className="w-12 h-12 flex-shrink-0">
                <Image src="/rover.svg" alt="Mars Rover" width={48} height={48} className="object-contain" />
              </div>
              <span>Explore Mars</span>
            </button>
          </Link>
          <Link href="/apods">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center space-x-2">
              <div className="w-12 h-12 flex-shrink-0">
                <Image src="/constellation.svg" alt="A Constellation" width={48} height={48} className="object-contain" />
              </div>
              <span>Explore APODs</span>
            </button>
          </Link>
          <Link href="/explore/favorites/apods">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center space-x-2">
              <div className="w-12 h-12 flex-shrink-0">
                <Image src="/astronomy.svg" alt="Astronomy" width={48} height={48} className="object-contain" />
              </div>
              <span>Favorite APODs</span>
            </button>
          </Link>
          <Link href="/explore/favorites/marsPhotos">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center space-x-2">
              <div className="w-12 h-12 flex-shrink-0">
                <Image src="/mars.png" alt="Mars Rover" width={48} height={48} className="object-contain" />
              </div>
              <span>Favorite Mars Photos</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
