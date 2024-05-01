"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const SpaceSpinner = ({ classSize }: { classSize: string }) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const largeClass = {
    outer: "flex items-center justify-center h-screen",
    inner: "relative",
    image: "w-20 h-20"
  };

  const smallClass = {
    outer: "items-center justify-center",
    inner: "relative",
    image: "w-5 h-5"
  };

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
    <div
      className={classSize === "large" ? largeClass.outer : smallClass.outer}
    >
      <div
        className={classSize === "large" ? largeClass.inner : smallClass.inner}
      >
        <Image
          src={images[currentImageIndex]}
          alt="Saturn"
          width={20}
          height={20}
          className={
            classSize === "large"
              ? largeClass.image + " animate-pulse-slow"
              : smallClass.image + " animate-pulse-slow"
          }
        />
      </div>
    </div>
  );
};

export default SpaceSpinner;
