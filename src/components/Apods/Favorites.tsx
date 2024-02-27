"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { markImageAsFavorite } from "@/app/actions/favoriteApod";
import { Apod } from "@/types/Apods/apods";
import { Session } from "@/types/Users/users";

export default function ApodClient({ data }: any) {
  const { data: session } = useSession();

  const [isFavorite, setIsFavorite] = useState(false);
  const [errormsg, setErrormsg] = useState("");

  const handleFavoriteToggle = async (session: Session, apod: Apod) => {
    if (!session) {
      setErrormsg("You must log in to favorite an image");
      setTimeout(() => setErrormsg(""), 5000);
    } else {
      const data = await markImageAsFavorite(session.user, apod);

      if (!data) {
        setErrormsg(
          "There was an issue with saving the image as a favorite, please try again"
        );
      } else {
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);
      }
    }
  };

  return (
    <>
      {errormsg && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 bg-black text-red-500 p-4 rounded-lg shadow-lg z-50">
          <span className="mr-2">⚠</span>
          {errormsg}
        </div>
      )}
      <button
        onClick={() => handleFavoriteToggle(session as Session, data)}
        className="p-2 text-yellow-500 relative"
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
    </>
  );
}
