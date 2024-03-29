"use client";
import { useState } from "react";

const MarsDetails = ({ data }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const { sol, earth_date, camera, rover } = data;
  const { full_name } = camera;
  const { name, landing_date, launch_date, status, total_photos } = rover;
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded"
        onClick={handleClick}
      >
        Details
      </button>

      {open && (
        <div className="overflow-hidden">
          <div
            onClick={handleClick}
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
          >
            <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg overflow-y-auto max-h-full">
              <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-4">
                Mars Rover Details
              </h1>
              <div className="mb-4">
                <p className="text-lg md:text-xl text-gray-600">Sol: {sol}</p>
                <p className="text-lg md:text-xl text-gray-600">
                  Earth Date: {earth_date}
                </p>
                <p className="text-lg md:text-xl text-gray-600">
                  Camera: {full_name}
                </p>
                <p className="text-lg md:text-xl text-gray-600">
                  Rover Name: {name}
                </p>
                <p className="text-lg md:text-xl text-gray-600">
                  Departed Earth: {launch_date}
                </p>
                <p className="text-lg md:text-xl text-gray-600">
                  Mars Arrival: {landing_date}
                </p>
                <p className="text-lg md:text-xl text-gray-600">
                  Status: {status}
                </p>
                <p className="text-lg md:text-xl text-gray-600">
                  Photos Captured: {total_photos}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarsDetails;
