import SkeletonLoader from "@/components/loaders/SkeletonLoader";
import Spinner from "@/components/loaders/Spinner";

const loading = true;

export default function Home() {
  return (
    <>
      {loading && (
        <>
          <div>Main Page</div>

          {/* <SkeletonLoader /> */}
          <Spinner />
        </>
      )}
    </>
  );
}
