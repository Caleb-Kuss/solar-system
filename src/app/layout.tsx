import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import AuthProvider from "./context/AuthProvider";
export const metadata: Metadata = {
  title: "Solar System",
  description:
    "See a daily Astronomy Picture of the Day (APOD) from NASA. Or explore Mars Rover photos."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <SpeedInsights />
        </AuthProvider>
      </body>
    </html>
  );
}
