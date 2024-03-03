import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getFavoriteApods } from "@/app/actions/favoriteApod";
import Image from "next/image";
import Favorites from "@/components/Apods/Favorites";
import Navbar from "@/components/NavBar/NavBar";

export default async function FavoriteApods() {
  const session = await getServerSession(options);
  if (!session) return null;
  const data = await getFavoriteApods(session.user as any);

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl bg-gray-800 text-white p-8 flex flex-col items-center ">
        Favorite Apods
      </h1>

      <div>
        <div className="bg-gray-800 text-white p-8 flex flex-col items-center h-screen">
          {data.map((apod) => (
            <div
              key={apod.id}
              className="bg-gray-800 text-white p-8 flex flex-col items-center"
            >
              <h2 className="text-3xl font-bold mb-2">{apod.apod.title}</h2>
              <div className="mx-auto w-full" style={{ maxWidth: "500px" }}>
                {apod.apod.url.includes("youtube") ? (
                  <iframe
                    src={apod.apod.url}
                    title={apod.apod.title}
                    width="500"
                    height="281"
                    allowFullScreen
                    className="border-2 border-white rounded-lg shadow-md bg-black mx-auto block"
                  />
                ) : (
                  <Image
                    className="mt-2 rounded"
                    width={500}
                    height={500}
                    src={apod.apod.url}
                    alt={apod.apod.title}
                  />
                )}
              </div>
              <Favorites data={apod} />
              <p className="m-2">{apod.apod.explanation}</p>
              {apod.apod.copyRight && (
                <p className="text-sm">&copy; {apod.apod.copyRight}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
