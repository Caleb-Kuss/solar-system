"use client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div>
      <h1>Dashboard</h1>
      <button type="button" onClick={() => router.back()}>
        Click here to go back
      </button>{" "}
    </div>
  );
}
