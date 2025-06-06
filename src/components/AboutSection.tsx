"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`bg-[#282828] py-16 text-white/70 transition-all duration-[1000ms] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="w-[80%] mx-auto border-2 border-white/70 text-center">
        <div className="my-10 mx-4 md:mx-32">
          <h2 className="text-white text-2xl md:text-3xl font-semibold">
            The Italian wine importer bringing you best of wine
          </h2>
          <hr className="w-[40%] mx-auto my-6 border-t border-white/70" />
          <p className="mb-6 leading-relaxed">
            Ozzano Selection is a leader in the sale of Italian wines abroad. It
            all stems from an entrepreneurial idea by Matteo Ozzano. The
            experience accumulated in over 10 years with the previous company
            Wine Selection &amp; Trading led the young entrepreneur to change
            the name of his company, choosing a way that could communicate a
            more personal relationship between company, customer and territory.
            Ozzano Selection, in fact, leads back to a brand that identifies
            with a person capable of offering an important and quality Italian
            wine selection abroad.
          </p>
          <figure className="mt-6">
            <Image
              src={`${base}/assets/image.png`}
              alt="Wine glass icon"
              width={200}
              height={200}
              className="mx-auto"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
