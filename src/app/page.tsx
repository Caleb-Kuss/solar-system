import Navbar from "@/components/NavBar/NavBar";
import Apods from "./components/Apods";
import Favorites from "../components/Apods/Favorites";
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-800 text-white h-screen flex flex-col items-center">
        <div className="text-center mt-10">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Space Explorer!
          </h1>
          <p className="text-lg">Embark on an interstellar journey with us.</p>
          <p>Check out the Astronomy Picture of the Day below!</p>
        </div>
        <Favorites>
          <Apods />
        </Favorites>
      </div>
    </>
  );
}
