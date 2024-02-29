import Image from "next/image";
import moment from "moment";
import Favorites from "../../components/Apods/Favorites";
import { MarsPhoto } from "@/types/MarsRover/marsRover";
export default async function Apod() {
  const marsRoverData = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${process.env.NASA_API_KEY}&earth_date=2024-02-19`
  );
  const { photos: marsRoverPhotos } = await marsRoverData.json();

  //TODO: handle this return error better This breaks when the date is the current day
  // Gotta figure out how to get the last date photos have been stored in Nasa api
  if (!marsRoverPhotos.length) {
    return <div>There are no Mars rover photos from today</div>;
  }

  return (
    <div className="bg-gray-800 text-white p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Mars Rover Images</h1>
      <div className="flex flex-wrap justify-center">
        {marsRoverPhotos.map((photo: MarsPhoto) => (
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
            <Favorites data={photo} />
            <p className="mt-2">
              Rover Name: {photo.rover.name}, Rover ID: {photo.rover.id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
