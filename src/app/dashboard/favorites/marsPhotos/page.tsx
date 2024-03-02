import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";
import Favorites from "@/components/marsRover/FavoriteRover";
import Navbar from "@/components/NavBar/NavBar";
import { getFavoriteMarsPhotos } from "@/app/actions/favoriteRover";

export default async function FavoriteApods() {
  const session = await getServerSession(options);
  if (!session) return null;
  const data = await getFavoriteMarsPhotos(session.user as any);

  if (!data) return null;
  return (
    <div>
      <Navbar />
      <h1 className="text-3xl bg-gray-800 text-white p-8 flex flex-col items-center ">
        Favorite Photos of Mars
      </h1>

      <div>
        <div className="bg-gray-800 text-white p-8 flex flex-col items-center">
          {data.map((marsData) => (
            <div
              key={marsData.marsRoverData.jsonData.id}
              className="bg-gray-800 text-white p-8 flex flex-col items-center"
            >
              <h2 className="text-3xl font-bold mb-2">
                {marsData.marsRoverData.jsonData.title}
              </h2>
              <div className="mx-auto w-full" style={{ maxWidth: "500px" }}>
                <Image
                  className="mt-2 rounded"
                  width={500}
                  height={500}
                  src={marsData.marsRoverData.jsonData.img_src}
                  alt={marsData.marsRoverData.jsonData.camera.full_name}
                />
              </div>
              <Favorites data={marsData} />
              <p className="mt-2">
                Rover Name: {marsData.marsRoverData.jsonData.rover.name}, Rover
                ID: {marsData.marsRoverData.jsonData.rover.id}, Rover Camera:{" "}
                {marsData.marsRoverData.jsonData.camera.full_name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
