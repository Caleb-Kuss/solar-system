import Navbar from "@/components/NavBar/NavBar";
import MarsRover from "../components/MarsRover";
import DatePicker from "../../components/DatePicker/DatePicker";
export default function MarsRoverPage() {
  return (
    <>
      <Navbar />
      <DatePicker>
        <MarsRover />
      </DatePicker>
    </>
  );
}
