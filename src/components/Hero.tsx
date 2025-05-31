"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface HeroProps {
  background: string;
}

export default function Hero({ background }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = background;
    img.onload = () => setIsLoaded(true);
  }, [background]);

  return (
    <section
      className={`relative h-[80vh] md:h-[60vh] bg-cover bg-center text-white font-sans transition-opacity duration-700 ease-in-out ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundImage: `url(${background})`, paddingTop: "200px" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Content on top */}
      <div className="relative z-10 w-4/5 mx-auto text-right text-white/70">
        <blockquote className="italic leading-snug">
          <q>My only regret in life is that I did not drink more wine.</q>
          <footer className="mt-2 not-italic">— Ernest Hemingway</footer>
        </blockquote>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-20 mb-20 px-4">
          <Link
            href="/catalogue"
            className="bg-[#Bfa46f] text-white text-sm tracking-widest uppercase px-6 py-3 text-center hover:bg-[#282828] transition"
          >
            Wine Catalogue
          </Link>
          <Link
            href="/events"
            className="bg-[#Bfa46f] text-white text-sm tracking-widest uppercase px-6 py-3 text-center hover:bg-[#282828] transition"
          >
            Upcoming Wine Tastings
          </Link>
        </div>
      </div>
    </section>
  );
}
