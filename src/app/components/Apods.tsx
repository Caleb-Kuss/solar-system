import Image from "next/image";

export default async function Apod() {
  const getApod = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
  );
  const apod = await getApod.json();

  return (
    <div className="bg-gray-800 text-white p-8 flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Astronomy Picture of the Day</h1>
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold">{apod.title}</h2>
        <div className="mx-auto w-full" style={{ maxWidth: "500px" }}>
          <Image
            className="mt-2 rounded"
            width={500}
            height={500}
            src={apod.url}
            alt={apod.title}
          />
        </div>
        <p className="mt-2">{apod.explanation}</p>
      </div>
      {apod.copyright && <p className="text-sm">&copy; {apod.copyright}</p>}
    </div>
  );
}
