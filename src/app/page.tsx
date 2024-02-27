import Navbar from "@/components/NavBar/NavBar";
import Apods from "./components/Apods";
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-800 text-white h-screen flex flex-col items-center">
        <div className="text-center mt-10">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Space Explorer!
          </h1>
        </div>
        <br />
        <Apods />
      </div>
    </>
  );
}
