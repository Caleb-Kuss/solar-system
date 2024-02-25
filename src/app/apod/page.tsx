import Navbar from "@/components/NavBar/NavBar";
import Apods from "../components/Apods";
import Favorites from "../../components/Apods/Favorites";

export default function ApodsPage() {
  return (
    <div>
      <Navbar />
      <Favorites>
        <Apods />
      </Favorites>
    </div>
  );
}
