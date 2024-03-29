"use client";
import { useState } from "react";

const ApodDetails = ({ apod }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const { copyRight, title, explanation, datePosted } = apod;

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
                {title}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-4">
                {explanation}
              </p>
              <p className="text-lg md:text-xl text-gray-600 mb-4">
                Date: {datePosted}
              </p>
              {copyRight && (
                <p className="text-lg md:text-xl text-gray-600">
                  &copy; {copyRight}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApodDetails;
