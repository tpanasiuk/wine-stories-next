"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

function useInView(ref: React.RefObject<Element | null>, margin = "0px") {
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

function useRefArray<T>(length: number): React.RefObject<T | null>[] {
  const refs = useRef<React.RefObject<T | null>[]>([]);
  if (refs.current.length !== length) {
    refs.current = Array(length)
      .fill(null)
      .map(() => React.createRef<T>());
  }
  return refs.current;
}

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const images = [
  {
    src: `${base}/assets/wines/1.webp`,
    alt: "Chianti",
    style: "top-[30px] left-[5%]",
    animateFrom: "-translate-x-12",
    z: "z-20",
  },
  {
    src: `${base}/assets/wines/2.webp`,
    alt: "Nero d’Avola",
    style: "top-[80px] left-[28%]",
    animateFrom: "translate-y-12",
    z: "z-10",
  },
  {
    src: `${base}/assets/wines/5.webp`,
    alt: "Prosecco",
    style: "top-[160px] left-[52%]",
    animateFrom: "translate-x-12",
    z: "z-0",
  },
  {
    src: `${base}/assets/wines/4.webp`,
    alt: "Barolo",
    style: "top-[100px] left-[74%]",
    animateFrom: "-translate-y-12",
    z: "z-[1]",
  },
];

export default function ImageShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null);

  const [bgLoaded, setBgLoaded] = useState(false);
  const isTitleVisible = useInView(titleRef, "-100px");
  const bgVisible = useInView(bgWrapperRef, "-100px");

  const desktopImgRefs = useRefArray<HTMLDivElement>(images.length);
  const mobileImgRefs = useRefArray<HTMLDivElement>(images.length);

  const [loadedDesktop, setLoadedDesktop] = useState<boolean[]>(
    Array(images.length).fill(false),
  );
  const [loadedMobile, setLoadedMobile] = useState<boolean[]>(
    Array(images.length).fill(false),
  );

  const markLoaded = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<boolean[]>>,
  ) => {
    setter((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative md:h-[600px] w-full overflow-hidden bg-[#1e1e1e]"
    >
      {/* Background image */}
      <div
        ref={bgWrapperRef}
        className={`absolute inset-0 transition-opacity duration-[1000ms] ease-out ${
          bgVisible && bgLoaded ? "opacity-30" : "opacity-0"
        }`}
      >
        <Image
          src={`${base}/assets/wines/background.webp`}
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          onLoad={() => setBgLoaded(true)}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      {/* Title */}
      <div
        ref={titleRef}
        className={`w-full text-center px-4 z-20
          relative pt-6 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
          transition-all duration-[2000ms] ease-out
          ${isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 md:-translate-y-4"}
        `}
      >
        <h2 className="text-white text-3xl md:text-5xl font-bold drop-shadow-xl">
          Discover Our Finest Wines
        </h2>
      </div>

      {/* Desktop layout */}
      <div className="relative w-full h-full hidden md:block z-0">
        {images.map((img, index) => {
          const isVisible = useInView(desktopImgRefs[index], "-50px");
          const shouldAnimate = isVisible && loadedDesktop[index];

          return (
            <div
              key={img.alt}
              ref={desktopImgRefs[index]}
              className={`absolute ${img.style} ${img.z} max-w-[460px] w-auto max-h-[440px]
                transition-all duration-[2000ms] ease-out transform
                ${
                  shouldAnimate
                    ? "opacity-100 translate-x-0 translate-y-0"
                    : `opacity-0 ${img.animateFrom} invisible`
                }
              `}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={460}
                height={440}
                onLoad={() => markLoaded(index, setLoadedDesktop)}
                className="rounded object-cover shadow-lg w-full h-auto transition-opacity duration-700 ease-out"
                priority={index === 0}
              />
            </div>
          );
        })}
      </div>

      {/* Mobile layout */}
      <div className="relative w-full h-full flex flex-col items-center gap-6 py-20 px-4 md:hidden z-0">
        {images.map((img, index) => {
          const isVisible = useInView(mobileImgRefs[index], "-50px");
          const shouldAnimate = isVisible && loadedMobile[index];
          const delay = `${index * 200}ms`;

          return (
            <div
              key={img.alt}
              ref={mobileImgRefs[index]}
              style={{ transitionDelay: delay }}
              className={`w-full max-w-[360px] transition-all duration-[1200ms] ease-out transform
                ${
                  shouldAnimate
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6 invisible"
                }
              `}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={360}
                height={240}
                onLoad={() => markLoaded(index, setLoadedMobile)}
                className="rounded object-cover shadow-lg w-full h-auto transition-opacity duration-700 ease-out"
                priority={index === 0}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
