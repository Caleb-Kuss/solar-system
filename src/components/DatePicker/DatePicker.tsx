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

const today = moment().format();

export default function MarsRoverParent() {
  const [startDate, setStartDate] = useState(today);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRover, setSelectedRover] = useState<string>("");
  const rovers = ["Curiosity", "Perseverance", "Spirit", "Opportunity"];

  const handleRoverChange = async (rover: string) => {
    try {
      const data = await getManifest(rover);
      const lastRecievedPhoto = moment(data.photo_manifest.max_date).format();

      setStartDate(lastRecievedPhoto);
      setSelectedRover(rover);
    } catch (error: unknown) {
      setError(error as string);
    }
  };

  useEffect(() => {
    const fetchMarsData = async () => {
      setLoading(true);
      setError(null);
      try {
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
          onChange={(date: any) => setStartDate(date)}
          className="datepicker border rounded-md shadow-sm w-full md:w-auto mb-2 md:mb-0"
          wrapperClassName="flex justify-center"
          customInput={
            <input style={{ color: "black", textAlign: "center" }} />
          }
        />
        <div className="flex flex-wrap justify-center  mt-8 md:mt-0 md:ml-2">
          <select
            value={selectedRover}
            onChange={(e) => handleRoverChange(e.target.value)}
            className="border rounded-md shadow-sm w-full md:w-auto ml-0 md:ml-2 text-black text-center"
          >
            <option value="">Select a Rover</option>
            {rovers.map((rover) => (
              <option key={rover} value={rover}>
                {rover}
              </option>
            ))}
          </select>
        </div>
      </div>
      {loading && <SpaceSpinner classSize={"large"} />}
      {error && (
        <div className="bg-gray-800 text-white p-4 md:p-8 h-screen flex justify-center mb-4">
          <h1 className="text-basemd:text-3xl">{error}</h1>
        </div>
      )}
      {!data.length && !error && (
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
          <div className="flex justify-around">
            <h1 className="text-3xl font-bold mb-5 text-center">
              {data.length} images found!
            </h1>
            <RoverDetails data={data[0]} />
          </div>
          <div className="flex flex-wrap justify-center">
            {data.map((photo: MarsPhoto) => (
              <div key={photo.id} className="mb-4 text-center mx-2">
                <div className="w-full max-w-md mx-auto">
                  <Image
                    src={photo.img_src}
                    alt="photo of Mars"
                    width={500}
                    height={500}
                  />
                </div>
                <FavoriteRover data={photo} />
                <p>
                  Camera: {photo.camera.full_name}, Status: {photo.rover.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      <ScrollToTopButton />
    </div>
  );
}
