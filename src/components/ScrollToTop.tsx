"use client";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed cursor-pointer bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full text-white text-lg transition-all duration-300 ease-in-out ${
        isVisible
          ? "bg-[#Bfa46f] opacity-100 hover:bg-[#7a6b24] hover:scale-105 shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
}
