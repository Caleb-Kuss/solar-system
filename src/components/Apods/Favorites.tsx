"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { markImageAsFavorite } from "@/app/actions/favoriteApod";
export default function ApodClient({ data }: any) {
  const { data: session } = useSession();

  const [isFavorite, setIsFavorite] = useState(false);
  console.log(session);

  const handleFavoriteToggle = async (session, apod) => {
    const data = await markImageAsFavorite(session.user, apod);
    if (data === "ok") {
      setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    }
  };

  return (
    <button
      onClick={() => handleFavoriteToggle(session, data)}
      className=" p-2 text-yellow-500"
    >
      {isFavorite ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 14.267l4.148 2.269-1.232-4.531 4.088-3.488-5.398-.39L10 3.333 7.394 7.127l-5.398.39 4.088 3.488-1.232 4.531L10 14.267z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 20 20"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.208 18.834c-.27 0-.539-.101-.743-.304L10 14.902l-4.465 3.628a1.476 1.476 0 0 1-2.156-1.559l.871-5.137L.491 7.559a1.476 1.476 0 0 1 .855-2.515l5.111-.741L9.032.75a1.476 1.476 0 0 1 2.935 0l2.574 5.553 5.112.741a1.476 1.476 0 0 1 .856 2.515l-3.868 3.78.871 5.137a1.476 1.476 0 0 1-.744 1.763 1.41 1.41 0 0 1-.743.2z"
          />
        </svg>
      )}
    </button>
  );
}
