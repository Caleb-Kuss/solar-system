import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";
import Navbar from "@/components/NavBar/NavBar";
import type { Metadata } from "next";
import ScrollToTopButton from "@/components/Top/Top";
import SolarPlanets from "@/components/StaticPlanets/SolarPlanets";

export const metadata: Metadata = {
  title: "Solar System | Our Solar System",
  description: "The place to learn about our solar system."
};

export default async function SolarSystemPage() {
  const session = await getServerSession(options);
  if (!session) return null;




  return (

    <>

      < Navbar />

      <div className="bg-gray-800 text-white min-h-screen py-8 px-4">
        <h1 className="text-xl md:text-3xl bg-gray-800 text-white p-4 m-8 md:p-8 flex flex-col items-center">
          Welcome, {session.user?.name}
        </h1>

        <div className="bg-gray-800 text-white">

          <SolarPlanets />
        </div>

      </div>



      <ScrollToTopButton />
    </>
  )
}
