"use client";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { MarsPhoto } from "@/types/MarsRover/marsRover";
import SpaceSpinner from "../Loaders/Spinner";
import ScrollToTopButton from "../Top/Top";
import { getManifest, MarsRoverData } from "@/app/actions/roverData";
import FavoriteRover from "../marsRover/FavoriteRover";
import moment from "moment";
import RoverDetails from "../Details/Rover";
import MarsDetails from "@/components/Details/MarsDetails";
import usePagination from "@/hooks/usePagination";

const today = moment().format();

export default function MarsRoverParent() {
  const [startDate, setStartDate] = useState(today);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRover, setSelectedRover] = useState<string>("");
  const rovers = ["Curiosity", "Perseverance"];
  // Removed "Spirit" and "Opportunity" from the rovers array as they stopped sending images.
  //, "Spirit", "Opportunity"
  const {
    pageNumber,
    pageCount,
    pageData,
    nextPage,
    previousPage,
    resetPageNumber,
  } = usePagination(data);
  const handleRoverChange = async (rover: string) => {
    try {
      resetPageNumber();
      setData([]);
      setLoading(true);
      const data = await getManifest(rover);

      if (data.statusCode && data.statusCode !== 200) {
        setError(data.message);
        setLoading(false);
        return;
      }

      const lastRecievedPhoto = moment(data.rover.max_date).format();

      setStartDate(lastRecievedPhoto);
      setSelectedRover(rover);
      setLoading(false);
    } catch (error: unknown) {
      setError(error as string);
    }
  };

  useEffect(() => {
    const fetchMarsData = async () => {
      try {
        resetPageNumber();
        setLoading(true);
        setError(null);
        if (selectedRover === "") {
          return setError("Please select a rover to get started");
        }
        const data = await MarsRoverData(startDate, selectedRover);
        if (data.errors) {
          return setError(data.errors);
        }
        if (!data.photos) return;

        setData(data.photos);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchMarsData();
  }, [startDate, selectedRover]);

  return (
    <div className="bg-gray-800 text-white py-8 px-4 md:p-8">
      <h4 className="flex justify-center mb-10 text-base md:text-3xl">
        Explore Mars!
      </h4>
      <div className="flex flex-col md:flex-row md:items-center justify-center mb-4">
        <DatePicker
          selected={new Date(startDate)}
          onChange={(date: any) => {
            setStartDate(date);
            setData([]);
          }}
          className="datepicker border rounded-md shadow-sm w-full md:w-auto mb-2 md:mb-0 bg-gray-300 text-black text-center"
        />
        <div className="flex flex-wrap justify-center  mt-8 md:mt-0 md:ml-2">
          <select
            value={selectedRover}
            onChange={(e) => handleRoverChange(e.target.value)}
            className="border rounded-md shadow-sm w-full md:w-auto ml-0 md:ml-2 text-black text-center bg-gray-300"
          >
            <option>Select a Rover</option>
            {rovers.map((rover) => (
              <option key={rover} value={rover}>
                {rover}
              </option>
            ))}
          </select>
        </div>
      </div>
      {loading && <SpaceSpinner classSize={"large"} />}
      {error && !loading && (
        <div className="bg-gray-800 text-white p-4 md:p-8 h-screen flex justify-center mb-4">
          <h1 className="text-basemd:text-3xl">{error}</h1>
        </div>
      )}
      {!data.length && !error && !loading && (
        <div className="bg-gray-800 text-white p-4 md:p-8 h-screen flex flex-col justify-center ">
          <div>
            <h1 className="text-base md:text-3xl font-bold mb-4 text-center">
              No Images found for this date
            </h1>
          </div>
        </div>
      )}
      {data.length > 0 && (
        <div className="bg-gray-800 text-white p-4 md:p-8">
          <div className="flex justify-evenly">
            <h1 className="text-3xl font-bold mb-5 text-center">
              {data.length} images!
            </h1>
            <RoverDetails data={data[0]} />
          </div>
          <div className="flex flex-wrap justify-center">
            {pageData.map((photo: MarsPhoto) => (
              <div key={photo.id} className="mb-4 text-center mx-2">
                <div className="w-full max-w-md mx-auto">
                  <Image
                    src={photo.img_src}
                    alt="photo of Mars"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="flex justify-center mt-2 items-center space-x-10">
                  <FavoriteRover data={photo} />
                  <MarsDetails data={photo} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-evenly mt-4">
            <button
              onClick={previousPage}
              disabled={pageNumber === 0 ? true : false}
              className="py-1 px-2 md:py-3 md:px-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                width="40"
                height="40"
                transform="rotate(-90)"
              >
                <circle cx="50" cy="50" r="50" />
                <path fill="#FFF" d="m50 30 30 40-30-10-30 10z" />
                <circle cx="10" cy="20" r="1" fill="#FFF" />
                <circle cx="90" cy="20" r="1" fill="#FFF" />
                <circle cx="30" cy="40" r="1" fill="#FFF" />
                <circle cx="70" cy="40" r="1" fill="#FFF" />
                <circle cx="50" cy="10" r="1" fill="#FFF" />
                <circle cx="20" cy="80" r="1" fill="#FFF" />
                <circle cx="80" cy="80" r="1" fill="#FFF" />
              </svg>
            </button>
            <button
              onClick={nextPage}
              disabled={pageNumber === pageCount - 1 ? true : false}
              className="py-1 px-2 md:py-3 md:px-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                width="40"
                height="40"
                transform="scale(1 -1)rotate(90)"
              >
                <circle cx="50" cy="50" r="50" />
                <path fill="#FFF" d="m50 30 30 40-30-10-30 10z" />
                <circle cx="10" cy="20" r="1" fill="#FFF" />
                <circle cx="90" cy="20" r="1" fill="#FFF" />
                <circle cx="30" cy="40" r="1" fill="#FFF" />
                <circle cx="70" cy="40" r="1" fill="#FFF" />
                <circle cx="50" cy="10" r="1" fill="#FFF" />
                <circle cx="20" cy="80" r="1" fill="#FFF" />
                <circle cx="80" cy="80" r="1" fill="#FFF" />
              </svg>
            </button>
          </div>
          <p className="flex justify-center mt-5">
            {pageNumber + 1} of {pageCount}
          </p>
        </div>
      )}
      <ScrollToTopButton />
    </div>
  );
}
