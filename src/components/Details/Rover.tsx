"use client";
import { useState } from "react";
import { MarsRover } from "@/types/MarsRover/marsRover";

const RoverDetails = ({ data }: { data: MarsRover }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { landing_date, launch_date, name, status } = data.rover;
  const { sol } = data;

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Details
      </button>

      {open && (
        <div
          onClick={handleClick}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10"
        >
          <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-md p-8 rounded-lg shadow-lg">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
              <p className="text-lg text-gray-600">Mars Sol: {sol}</p>
              <p className="text-lg text-gray-600">
                Departed Earth: {launch_date}
              </p>
              <p className="text-lg text-gray-600">
                Mars Arrival: {landing_date}
              </p>
              <p className="text-lg text-gray-600">Mission Status: {status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default RoverDetails;
