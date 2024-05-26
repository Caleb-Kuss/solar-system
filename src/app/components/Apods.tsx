import Image from "next/image";
import Favorites from "../../components/Apods/Favorites";

export default async function Apod() {
  const getApod = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`,
  );
  const apod = await getApod.json();

  const video = apod.url.media_type === "video" ? true : false;

  return (
    <div className="bg-gray-800 text-white p-4 md:p-8 flex flex-col items-center ">
      <h1 className="text-base md:text-3xl font-bold mb-4">
        Astronomy {video ? "Video" : "Picture"} of the Day
      </h1>
      <div className="mb-4 w-full md:w-auto">
        <div className="mx-auto w-full" style={{ maxWidth: "500px" }}>
          {!video ? (
            <Image
              className="mt-2 rounded"
              width={500}
              height={500}
              src={apod.url}
              alt={apod.title}
            />
          ) : (
            <iframe
              src={apod.url}
              title={apod.title}
              width="100%"
              height="281"
              allowFullScreen
              className="border-2 border-white rounded-lg shadow-md bg-black mx-auto block"
            />
          )}
        </div>

        <h2 className="text-xl font-semibold text-center m-4">{apod.title}</h2>
        <div className="flex justify-center">
          <Favorites data={apod} />
        </div>
        <p className="mt-2 text-sm">{apod.explanation}</p>
      </div>
      {apod.copyright && (
        <p className="text-xs md:text-sm">&copy; {apod.copyright}</p>
      )}
    </div>
  );
}
