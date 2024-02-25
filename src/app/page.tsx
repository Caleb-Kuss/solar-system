import SkeletonLoader from "@/components/Loaders/SkeletonLoader";
import Spinner from "@/components/Loaders/Spinner";
import Navbar from "@/components/NavBar/NavBar";
import Link from "next/link";

const loading = true;

export default function Home() {
  return (
    <>
      {loading && (
        <>
          <div>Main Page</div>
          <Navbar />
          {/* <SkeletonLoader /> */}
          <Spinner />
        </>
      )}
    </>
  );
}
