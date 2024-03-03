import Navbar from "@/components/NavBar/NavBar";
import Apods from "./components/Apods";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-800 text-white min-h-screen flex flex-col items-center justify-center py-8 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Solar System!</h1>
        </div>
        <div className="flex flex-col items-center justify-center mt-4">
          <Apods />
        </div>
      </div>
    </>
  );
}
