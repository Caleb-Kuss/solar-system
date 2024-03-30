"use client";
import { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollFunction = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", scrollFunction);

    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button
      className={`fixed bottom-8 right-8 z-10 bg-gray-600 text-white py-1 px-2 md:py-3 md:px-6 rounded-lg transition-opacity duration-300 shadow-md ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={scrollToTop}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="30"
        height="30"
      >
        <circle cx="50" cy="50" r="50" fill="#000" />

        <polygon points="50,30 80,70 50,60 20,70" fill="#FFF" />

        <circle cx="10" cy="20" r="1" fill="#FFF" />
        <circle cx="90" cy="20" r="1" fill="#FFF" />
        <circle cx="30" cy="40" r="1" fill="#FFF" />
        <circle cx="70" cy="40" r="1" fill="#FFF" />
        <circle cx="50" cy="10" r="1" fill="#FFF" />
        <circle cx="20" cy="80" r="1" fill="#FFF" />
        <circle cx="80" cy="80" r="1" fill="#FFF" />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
