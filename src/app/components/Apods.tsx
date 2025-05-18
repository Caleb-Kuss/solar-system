import Image from "next/image";
import Favorites from "../../components/Apods/Favorites";

export default async function Apod() {
  const getApod = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`,
  );
  const apod = await getApod.json();

  const video = apod.media_type === "video" ? true : false;
  const other = apod.media_type === "other";

  const fallbackSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" fill="none">
  <g stroke="#d1d5db" stroke-width="2">
    <rect x="80" y="60" width="240" height="180" rx="12"/>
    <path d="M90 200l60-80 40 50 40-30 60 60"/>
  </g>
  <circle cx="130" cy="100" r="15" fill="#d1d5db"/>
  <text x="200" y="270" text-anchor="middle" fill="#6b7280" font-size="16" font-family="sans-serif">
    Content not found
  </text>
</svg>
`)}`;

  if (other) {
    return (
      <div className="bg-gray-800 text-white p-4 md:p-8 flex flex-col items-center ">
        <Image
          className="mt-2 rounded"
          src={fallbackSvg}
          alt={apod.title}
          width={500}
          height={500}
        />
        <h1 className="text-base md:text-3xl font-bold mb-4">{apod.title}</h1>
        <p className="mt-2 text-sm">{apod.explanation}</p>
      </div>
    );
  }
  return (
    <div className="bg-gray-800 text-white p-4 md:p-8 flex flex-col items-center ">
      {apod ? (
        <>
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

            <h2 className="text-xl font-semibold text-center m-4">
              {apod.title}
            </h2>
            <div className="flex justify-center">
              <Favorites data={apod} />
            </div>
            <p className="mt-2 text-sm">{apod.explanation}</p>
          </div>
          {apod.copyright && (
            <p className="text-xs md:text-sm">&copy; {apod.copyright}</p>
          )}
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            We are having trouble getting the APOD of the day, Please check back
            later.
          </h1>
        </div>
      )}
    </div>
  );
}
