"use client";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import SpaceSpinner from "../../components/Loaders/Spinner";
import ScrollToTopButton from "../../components/Top/Top";
import moment from "moment";
import getApodByDate from "@/app/actions/apodData";
import { Apod } from "@/types/Apods/apods";
import Favorites from "./Favorites";
import ApodDetails from "../Details/Apods";

const today = moment().format();

export default function ApodSelection() {
  const [startDate, setStartDate] = useState(today);
  const [data, setData] = useState<Apod>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    const fetchApodData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getApodByDate(startDate);
        if (data.errors) {
          return setError(data.errors);
        }
        if (!data) return;

        setData(data);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchApodData();
  }, [startDate]);
  return (
    <>
      <div className="bg-gray-800 text-white py-8 px-4 md:p-8 min-h-screen">
        <h4 className="flex justify-center mb-10 text-base md:text-3xl">
          Explore APODs!
        </h4>
        <div className="flex flex-col md:flex-row md:items-center justify-center mb-4">
          <DatePicker
            selected={new Date(startDate)}
            onChange={(date: any) => {
              setStartDate(date);
              setData(undefined);
            }}
            className="datepicker border rounded-md shadow-sm w-full md:w-auto mb-2 md:mb-0"
            wrapperClassName="flex justify-center"
            customInput={
              <input style={{ color: "black", textAlign: "center" }} />
            }
          />
        </div>
        {loading && <SpaceSpinner classSize={"large"} />}
        {error && !loading && (
          <div className="bg-gray-800 text-white p-4 md:p-8 h-screen flex justify-center mb-4">
            <h1 className="text-basemd:text-3xl">{error}</h1>
          </div>
        )}
        {!data && !error && !loading && (
          <div className="bg-gray-800 text-white p-4 md:p-8 h-screen flex flex-col justify-center ">
            <div>
              <h1 className="text-base md:text-3xl font-bold mb-4 text-center">
                No Images found for this date
              </h1>
            </div>
          </div>
        )}
        {data && (
          <div className="overflow-hidden">
            <div className="bg-gray-800 text-white  p-4 md:p-8 rounded-lg shadow-lg overflow-y-auto max-h-full">
              <div className="mx-auto w-full max-w-md">
                {data.media_type === "video" ? (
                  <iframe
                    src={data.url}
                    title={data.title}
                    width="100%"
                    height="281"
                    allowFullScreen
                    className="border-2 border-white rounded-lg shadow-md bg-black mx-auto block"
                  />
                ) : (
                  <Image
                    className="mt-2 rounded"
                    width={500}
                    height={500}
                    src={data.url}
                    alt={data.title}
                  />
                )}

              </div>

              <h1 className="text-xl md:text-3xl font-bold text-center  mb-4 mt-4">
                {data.title}
              </h1>
              <div className="flex justify-center mt-2 items-center space-x-10 mb-4">
                <Favorites data={data} />
              </div>
              <p className="text-lg md:text-xl  mb-4">
                {data.explanation}
              </p>
              <p className="text-lg md:text-xl  mb-4">
                Date: {data.date}
              </p>
              {data.copyright && (
                <p className="text-lg md:text-xl ">
                  &copy; {data.copyright}
                </p>
              )}
            </div>
          </div>
        )
        }
        <ScrollToTopButton />
      </div >
    </>
  );
}

