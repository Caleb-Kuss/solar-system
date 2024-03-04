import Navbar from "@/components/NavBar/NavBar";
import DatePicker from "../../components/DatePicker/DatePicker";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar System | Mars Rover Photos",
  description: "Discover photos of Mars from your favorite Rover.",
};
export default function MarsRoverPage() {
  return (
    <>
      <Navbar />
      <DatePicker />
    </>
  );
}
