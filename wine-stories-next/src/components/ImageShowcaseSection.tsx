"use client";
import { useRef, useEffect, useState } from "react";

function useInView(ref: React.RefObject<HTMLElement>, margin = "0px") {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, margin]);
  return visible;
}

const images = [
  {
    src: "/assets/wines/1.png",
    alt: "Chianti",
    style: "top-[30px] left-[5%]",
    animateFrom: "-translate-x-12",
    z: "z-20",
  },
  {
    src: "/assets/wines/2.webp",
    alt: "Nero d’Avola",
    style: "top-[80px] left-[28%]",
    animateFrom: "translate-y-12",
    z: "z-10",
  },
  {
    src: "/assets/wines/5.jpg",
    alt: "Prosecco",
    style: "top-[160px] left-[52%]",
    animateFrom: "translate-x-12",
    z: "z-0",
  },
  {
    src: "/assets/wines/4.webp",
    alt: "Barolo",
    style: "top-[100px] left-[74%]",
    animateFrom: "-translate-y-12",
    z: "z-[1]",
  },
];

export default function ImageShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleVisible = useInView(titleRef, "-100px");
  const bgRef = useRef<HTMLDivElement>(null);
  const bgVisible = useInView(bgRef, "-100px");

  return (
    <section
      ref={sectionRef}
      className="relative md:h-[600px] w-full overflow-hidden bg-[#1e1e1e]"
    >
      {/* Background image */}
      <img
        ref={bgRef}
        src="/assets/wines/background.webp"
        alt="Background"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1000ms] ease-out ${
          bgVisible ? "opacity-30" : "opacity-0"
        }`}
      />

      {/* Overlay on top of images */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      <div
        ref={titleRef}
        className={`w-full text-center px-4 z-20
          relative pt-6 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
          transition-all duration-[3000ms] ease-out
          ${isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 md:-translate-y-4"}
        `}
      >
        <h2 className="text-white text-3xl md:text-5xl font-bold drop-shadow-xl">
          Discover Our Finest Wines
        </h2>
      </div>

      {/* Desktop overlapping layout */}
      <div className="relative w-full h-full hidden md:block z-0">
        {images.map((img) => {
          const imgRef = useRef<HTMLImageElement>(null);
          const isVisible = useInView(imgRef, "-50px");

          return (
            <img
              key={img.alt}
              ref={imgRef}
              src={img.src}
              alt={img.alt}
              className={`absolute ${img.style} ${img.z} max-w-[460px] w-auto h-auto max-h-[440px] rounded object-cover shadow-lg transition-all duration-[3000ms] ease-out transform ${
                isVisible
                  ? "opacity-100 translate-x-0 translate-y-0"
                  : `opacity-0 ${img.animateFrom}`
              }`}
            />
          );
        })}
      </div>

      {/* Mobile stacked layout with fade-in */}
      <div className="relative w-full h-full flex flex-col items-center gap-6 py-20 px-4 md:hidden z-0">
        {images.map((img, index) => {
          const imgRef = useRef<HTMLImageElement>(null);
          const isVisible = useInView(imgRef, "-50px");

          return (
            <img
              key={img.alt}
              ref={imgRef}
              src={img.src}
              alt={img.alt}
              className={`w-full max-w-[360px] h-auto rounded object-cover shadow-lg transition-all duration-[1200ms] ease-out transform
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          delay-[${index * 200}ms]
        `}
            />
          );
        })}
      </div>
    </section>
  );
}
