"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "@/types/Users/users";
import {
  getExistingMarsPhoto,
  markImageAsFavorite,
  unMarkImageAsFavorite
} from "@/app/actions/favoriteRover";
import { FavoriteMarsPhoto, MarsPhoto } from "@/types/MarsRover/marsRover";
import SpaceSpinner from "../Loaders/Spinner";

export default function RoverClient({ data }: any) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [errormsg, setErrormsg] = useState("");

  useEffect(() => {
    const checkIfFavorite = async (
      session: Session,
      marsPhoto: FavoriteMarsPhoto
    ) => {
      const existingFavorite = await getExistingMarsPhoto(
        session?.user,
        marsPhoto
      );

      if (existingFavorite) {
        setIsFavorite(true);
      }
    };
    if (session) checkIfFavorite(session as Session, data);
  }, [session, data]);

  const timeoutErrorMessage = () => {
    setTimeout(() => setErrormsg(""), 5000);
  };
  const handleFavoriteToggle = async (
    session: Session,
    marsPhoto: MarsPhoto
  ) => {
    setIsLoading(true);

    if (!session) {
      setIsFavorite(true);
      setErrormsg("You must log in to favorite an image");
      timeoutErrorMessage();
      setIsLoading(false);
      return;
    }
    if (!isFavorite) {
      setIsFavorite(true);
      const data = await markImageAsFavorite(session.user, marsPhoto);
      if (!data) {
        setErrormsg(
          "There was an issue with saving the image as a favorite, please try again"
        );
        timeoutErrorMessage();
      }
    } else {
      const data = await unMarkImageAsFavorite(session.user, marsPhoto);
      if (!data) {
        setErrormsg(
          "There was an issue with removing this image as a favorite, please try again"
        );
        timeoutErrorMessage();
      }
      setIsFavorite(false);
    }
    setIsLoading(false);
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
        disabled={isLoading}
        className="p-2 text-yellow-500 relative"
      >
        {!isLoading && (
          <>
            {isFavorite ? (
              <svg
                height="20px"
                width="20px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 47.94 47.94"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    style={{ fill: "#f7e302" }}
                    d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"
                  ></path>{" "}
                </g>
              </svg>
            ) : (
              <svg
                height="20px"
                width="20px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 47.94 47.94"
                fill="#000000"
                stroke="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    style={{ fill: "#f2f0ed" }}
                    d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"
                  ></path>
                </g>
              </svg>
            )}
          </>
        )}
        {isLoading && <SpaceSpinner classSize={"small"} />}
      </button>
    </>
  );
}
