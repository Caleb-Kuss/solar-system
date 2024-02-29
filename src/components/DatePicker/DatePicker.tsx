"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function MarsRoverParent({ children }: any) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="bg-gray-800 text-white p-8">
      <h4 className="flex justify-center mb-4">
        Choose an earth date to see the images that were taken on mars that day
      </h4>

      <div className="flex flex-wrap justify-center">
        <DatePicker
          selected={startDate}
          onChange={(date: any) => setStartDate(date)}
          className="datepicker border rounded-md shadow-sm w-full" // Centering
          wrapperClassName="flex justify-center" // Centering wrapper
          customInput={
            // Custom input for precise style control
            <input style={{ color: "black", textAlign: "center" }} />
          }
        />
      </div>
      {children}
    </div>
  );
}
