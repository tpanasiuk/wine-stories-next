"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const wines = [
  {
    name: "Chianti Classico",
    image: `${base}/assets/wines/chianti.webp`,
    description:
      "A traditional Tuscan red wine with notes of cherry and earthy spice.",
  },
  {
    name: "Barolo Riserva",
    image: `${base}/assets/wines/barolo.webp`,
    description:
      "Aged to perfection, this wine boasts deep flavors of plum and leather.",
  },
  {
    name: "Montepulciano d’Abruzzo",
    image: `${base}/assets/wines/montepulciano.webp`,
    description:
      "A medium-bodied red with soft tannins and dark fruit flavors.",
  },
  {
    name: "Amarone della Valpolicella",
    image: `${base}/assets/wines/amarone.webp`,
    description:
      "Rich and full-bodied, known for its dried fruit and chocolate notes.",
  },
  {
    name: "Prosecco Superiore",
    image: `${base}/assets/wines/prosecco.webp`,
    description:
      "A crisp and refreshing sparkling wine with hints of green apple and citrus.",
  },
  {
    name: "Nero d’Avola",
    image: `${base}/assets/wines/nero.webp`,
    description:
      "A bold Sicilian red with flavors of black cherry, plum, and spice.",
  },
];

function useInView(
  ref: React.RefObject<HTMLElement | null>,
  rootMargin = "0px",
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin, threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.unobserve(node);
  }, [ref, rootMargin]);

  return isVisible;
}

export default function CataloguePage() {
  const [flipped, setFlipped] = useState<string | null>(null);

  return (
    <div className="bg-[#282828] text-white/70 min-h-screen font-sans">
      <Header
        background={`${base}/assets/grapes-cellar.webp`}
        height="40vh"
        overlayOpacity="bg-black/50"
      />

      <main className="w-[90%] md:w-[80%] mx-auto py-16">
        <h1 className="text-3xl md:text-4xl text-center text-white font-bold mb-6">
          Wine Catalogue
        </h1>
        <hr className="w-20 border-t border-white/70 mx-auto mb-12" />

        <section className="grid gap-8 md:grid-cols-3">
          {wines.map((wine) => {
            const cardRef = useRef<HTMLDivElement>(null);
            const isVisible = useInView(cardRef, "-50px");
            const isFlipped = flipped === wine.name;

            return (
              <div
                key={wine.name}
                ref={cardRef}
                role="button"
                tabIndex={0}
                aria-pressed={isFlipped}
                onClick={() => setFlipped(isFlipped ? null : wine.name)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setFlipped(isFlipped ? null : wine.name);
                  }
                }}
                className={`relative cursor-pointer focus:outline-none transition-all duration-1000 ease-out transform
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                  perspective`}
              >
                <div
                  className={`relative w-full h-80 rounded shadow-md transform-style-preserve-3d transition-transform duration-500
                    ${isFlipped ? "rotate-y-180 scale-105" : ""}`}
                >
                  {/* Front */}
                  <div className="absolute w-full h-full backface-hidden bg-[#1e1e1e] rounded overflow-hidden">
                    <Image
                      src={wine.image}
                      alt={wine.name}
                      width={400}
                      height={256}
                      loading="lazy"
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4 text-center">
                      <h3 className="text-white font-semibold text-lg transition-colors duration-300 hover:text-[#Bfa46f]">
                        {wine.name}
                      </h3>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="absolute w-full h-full backface-hidden bg-[#Bfa46f] text-black rounded p-6 transform rotate-y-180 flex items-center justify-center text-center">
                    <p>{wine.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
