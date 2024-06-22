
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


  const StatCard = ({ title, value }: { title: string; value: number }) => (
    <div className="flex flex-col items-center justify-center mb-4">
      <h3 className="text-l font-bold mb-2">{title}</h3>
      <p className="text-xl">{value}</p>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="bg-gray-800 text-white py-8 px-4 md:p-8 min-h-screen">
        <h4 className="flex justify-center mb-10 text-base md:text-3xl">
          Admin Dashboard for {session?.user?.name}
        </h4>
        <div className="flex flex-row justify-center mb-8 space-x-4 md:space-x-4">
          <h1 className="text-xl font-bold mr-8">APOD Stats</h1>
          <h1 className="text-xl font-bold ml-8">Rover Stats</h1>
        </div>
        <div className="flex flex-row justify-center space-x-16">
          <div className="flex flex-col md:items-center space-y-8">
            <StatCard title="Total Favorite" value={totalApods} />
            <StatCard title="Today" value={apodLikes} />
            <StatCard title="This Week" value={apodLikesThisWeek} />
            <StatCard title="Last Week" value={apodLikesLastWeek} />
          </div>
          <div className="flex flex-col md:items-center space-y-8">
            <StatCard title="Total Favorite" value={totalRoverImages} />
            <StatCard title="Today" value={roverLikes} />
            <StatCard title="This Week" value={roverLikesThisWeek} />
            <StatCard title="Last Week" value={lastWeekRoverLikes} />
          </div>
        </div>
      </div>
    </>


  );
}
