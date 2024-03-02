import Navbar from "@/components/NavBar/NavBar";
import Link from "next/link";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="bg-purple-900 text-white min-h-screen flex flex-col items-center justify-start pt-16">
        <h1 className="text-4xl font-bold mb-8">Space Dashboard</h1>
        <Link href="/marsRover">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zM0 10a10 10 0 1120 0 10 10 0 01-20 0zm6-3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm7 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            <span>Explore Mars</span>
          </button>
        </Link>
        <Link href="/dashboard/favorites/apods" className="mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14"
              />
            </svg>
            <span>Favorite APODs</span>
          </button>{" "}
        </Link>
      </div>
    </>
  );
}
