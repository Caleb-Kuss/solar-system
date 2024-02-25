"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const SpaceSpinner = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const importAll = (r: any) => {
      return r.keys().map((fileName: string) => r(fileName).default);
    };

    const imageContext = require.context(
      "../../../public/space-loaders",
      false,
      /\.(svg)$/
    );
    const imagePaths = importAll(imageContext);

    setImages(imagePaths);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="relative">
        <Image
          src={images[currentImageIndex]}
          alt="Saturn"
          className="w-20 h-20 animate-pulse-slow "
        />
      </div>
    </div>
  );
};

export default SpaceSpinner;
