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

export default function MarsRoverParent() {
  const [startDate, setStartDate] = useState(new Date());
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRover, setSelectedRover] = useState<string>("");
  const rovers = ["Curiosity", "Perseverance", "Spirit", "Opportunity"];

  const handleRoverChange = async (rover: string) => {
    try {
      const data = await getManifest(rover);
      setStartDate(new Date(data.photo_manifest.max_date));
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
    <div className="bg-gray-800 text-white p-8">
      <h4 className="flex justify-center mb-4">
        Choose an earth date to see the images that were taken on mars that day
      </h4>
      <div className="flex flex-wrap justify-center">
        <DatePicker
          selected={startDate}
          onChange={(date: any) => setStartDate(date)}
          className="datepicker border rounded-md shadow-sm w-full"
          wrapperClassName="flex justify-center"
          customInput={
            <input style={{ color: "black", textAlign: "center" }} />
          }
        />
        <div className="flex flex-wrap justify-center ml-2">
          <select
            value={selectedRover}
            onChange={(e) => handleRoverChange(e.target.value)}
            className="border rounded-md shadow-sm w-full text-black"
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
      {loading && <SpaceSpinner />}
      {error && (
        <div className="bg-gray-800 text-white p-8 h-screen flex justify-center mb-4">
          <h1 className="text-3xl">{error}</h1>
        </div>
      )}
      {!data.length && !error && (
        <div className="bg-gray-800 text-white p-8 h-screen">
          <div>
            <h1 className="text-3xl font-bold mb-4 text-center">
              No Images found for this date
            </h1>
          </div>
        </div>
      )}
      {data.length > 0 && (
        <div className="bg-gray-800 text-white p-8 ">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Mars Rover Images {data.length} images found!
          </h1>
          <div className="flex flex-wrap justify-center">
            {data.map((photo: MarsPhoto) => (
              <div key={photo.id} className="mb-4 text-center mx-2">
                <h2 className="text-xl font-semibold">
                  Earth date this photo was taken {photo.earth_date}
                </h2>
                <div
                  className="w-full"
                  style={{ maxWidth: "500px", margin: "auto" }}
                >
                  <Image
                    src={photo.img_src}
                    alt="photo of Mars"
                    width={500}
                    height={500}
                  />
                </div>
                <FavoriteRover data={photo} />
                <p className="mt-2">
                  Rover Name: {photo.rover.name}, Rover ID: {photo.rover.id},
                  Rover Camera: {photo.camera.full_name}
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
