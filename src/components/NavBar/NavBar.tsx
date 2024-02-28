import Link from "next/link";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export default async function Navbar() {
  const session = await getServerSession(options);

  return (
    <nav className="bg-gray-900 p-4">
      <ul className="flex justify-evenly text-lg font-bold text-white">
        <li>
          <Link href="/">
            <span className="cursor-pointer hover:text-gray-300">Home</span>
          </Link>
        </li>
        {session && (
          <li>
            <Link href="/dashboard">
              <span className="cursor-pointer hover:text-gray-300">
                Dashboard
              </span>
            </Link>
          </li>
        )}
        {session ? (
          <li>
            <Link href="/api/auth/signout">
              <span className="cursor-pointer hover:text-gray-300">
                Sign Out
              </span>
            </Link>
          </li>
        ) : (
          <li>
            <Link href="/api/auth/signin">
              <span className="cursor-pointer hover:text-gray-300">
                Sign In
              </span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
