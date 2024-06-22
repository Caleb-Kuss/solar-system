
import { totalFavoriteApods, totalFavoriteRoverImages, DailyApodLikes, WeeklyApodLikes, DailyRoverLikes, WeeklyRoverLikes, LastWeekRoverLikes, LastWeekApodLikes } from "../actions/admin";
import { getServerSession } from "next-auth/next"
import { options } from "../api/auth/[...nextauth]/options";
import { Session } from "@/types/Users/users";
import Navbar from "@/components/NavBar/NavBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar System | Admin Dashboard",
  description: "Discover stats about your favorite photos.",
};


export default async function AdminPage() {
  const session: Session = await getServerSession(options);
  const userRole = session?.user?.role

  if (!session || userRole !== 'ADMIN') {
    throw new Error('Unauthorized access: User does not have admin privileges.')
  }

  const totalApods = await totalFavoriteApods()
  const totalRoverImages = await totalFavoriteRoverImages()
  const apodLikes = await DailyApodLikes()
  const apodLikesLastWeek = await LastWeekApodLikes()
  const apodLikesThisWeek = await WeeklyApodLikes()
  const roverLikes = await DailyRoverLikes()
  const roverLikesThisWeek = await WeeklyRoverLikes()
  const lastWeekRoverLikes = await LastWeekRoverLikes()
  return (
    <>
      <Navbar />
      <div className="bg-gray-800 text-white py-8 px-4 md:p-8 min-h-screen">
        <h4 className="flex justify-center mb-10 text-base md:text-3xl">
          Admin Dashboard for {session?.user?.name}
        </h4>
        <h1 className="flex justify-center text-xl font-bold mb-4">APOD Stats</h1>
        <div className="flex flex-col  md:items-center justify-center mb-4">
          <div className="flex flex-col items-center justify-center mb-4">
            <h3 className="text-l font-bold mb-2">Total Favorite Apods</h3>
            <p className="text-2xl">{totalApods}</p>
          </div>
          <div className="flex flex-col items-center justify-center mb-4">
            <h3 className="text-l font-bold mb-2">Total Favorite Apod Likes Today</h3>
            <p className="text-2xl">{apodLikes}</p>
          </div>
          <div className="flex flex-col items-center justify-center mb-4">
            <h3 className="text-l font-bold mb-2">Total Favorite Apod Likes This Week</h3>
            <p className="text-2xl">{apodLikesThisWeek}</p>
          </div>
          <div className="flex flex-col items-center justify-center mb-4">
            <h3 className="text-l font-bold mb-2">Total Favorite Apod Likes Last Week</h3>
            <p className="text-2xl">{apodLikesLastWeek}</p>
          </div>
          <h1 className="flex justify-center text-xl font-bold mb-4">Rover Stats</h1>
          <div className="flex flex-col items-center justify-center mb-4">
            <h3 className="text-l font-bold mb-2">Total Favorite Rover Images</h3>
            <p className="text-2xl">{totalRoverImages}</p>
          </div>
          <div className="flex flex-col items-center justify-center mb-4">
            <h3 className="text-l font-bold mb-2">Total Favorite Rover Likes Today</h3>
            <p className="text-2xl">{roverLikes}</p>
          </div>
          <div className="flex flex-col items-center justify-center mb-4">
            <h3 className="text-l font-bold mb-2">Total Favorite Rover Likes This Week</h3>
            <p className="text-2xl">{roverLikesThisWeek}</p>
          </div>
          <div className="flex flex-col items-center justify-center mb-4">
            <h3 className="text-l font-bold mb-2">Total Favorite Rover Likes Last Week</h3>
            <p className="text-2xl">{lastWeekRoverLikes}</p>
          </div>

        </div>
      </div>
    </>
  );
}
