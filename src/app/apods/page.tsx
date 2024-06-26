import Navbar from "@/components/NavBar/NavBar";
import ApodByDate from "../../components/Apods/apodByDate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar System | Mars Rover Photos",
  description: "Discover photos of Mars from your favorite Rover.",
};
export default function MarsRoverPage() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-800  min-h-screen">
        <ApodByDate />
      </div>
    </>
  );
}

