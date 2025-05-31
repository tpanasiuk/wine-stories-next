"use client";

import { useRef, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

function useInView(ref: React.RefObject<Element | null>, margin = "0px") {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { rootMargin: margin, threshold: 0.1 },
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [ref, margin]);

  return visible;
}

export default function TastingForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const leftImgRef = useRef<HTMLDivElement>(null);
  const rightImgRef = useRef<HTMLDivElement>(null);

  const sectionVisible = useInView(sectionRef, "-100px");
  const leftVisible = useInView(leftImgRef, "-100px");
  const rightVisible = useInView(rightImgRef, "-100px");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Successfully registered!");
    formRef.current?.reset();
  };

  return (
    <section
      ref={sectionRef}
      id="tasting"
      className={`bg-[#282828] text-white/70 py-16 font-sans transition-all duration-1000 ease-out
        ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="flex flex-row justify-between items-center md:items-start px-10 md:px-20 gap-6 md:gap-0 mb-[-6rem] md:mb-[-15rem] will-change-transform">
        <div
          ref={leftImgRef}
          className={`max-w-[150px] transition-all duration-1000 ease-out ${
            leftVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
        >
          <Image
            src={`${base}/assets/grapes.jpg`}
            alt="Grapes icon"
            width={100}
            height={100}
            className="h-auto w-[100px] md:w-auto"
          />
        </div>
        <div
          ref={rightImgRef}
          className={`max-w-[150px] transition-all duration-1000 ease-out delay-300 ${
            rightVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
        >
          <Image
            src={`${base}/assets/barrel.jpeg`}
            alt="Barrel icon"
            width={100}
            height={100}
            className="h-auto w-[100px] md:w-auto"
          />
        </div>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-[90%] md:w-[80%] mx-auto mt-24 text-center"
      >
        <fieldset className="pb-12 border border-white/40 px-6 md:px-12 py-10">
          <div className="w-full md:w-[60%] mx-auto">
            <legend className="text-white text-2xl md:text-3xl font-semibold mb-6">
              Register for Wine Tasting
            </legend>

            <hr className="w-[80px] border-t border-white/70 mx-auto mb-6" />

            <p className="text-sm mb-6 max-w-xl mx-auto leading-relaxed">
              Each registration includes access to the Wine Tasting, where
              approximately 18 various wines will be served.
            </p>

            <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
              <div className="w-full md:w-[48%] text-left">
                <label
                  htmlFor="name"
                  className="text-sm font-medium mb-1 block"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full bg-transparent border-b border-white/70 py-2 text-white/70 focus:outline-none"
                />
              </div>
              <div className="w-full md:w-[48%] text-left">
                <label
                  htmlFor="phone-number"
                  className="text-sm font-medium mb-1 block"
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  name="phone-number"
                  id="phone-number"
                  pattern="[0-9]{9}"
                  className="w-full bg-transparent border-b border-white/70 py-2 text-white/70 focus:outline-none"
                />
              </div>
            </div>

            <div className="text-left mb-6">
              <label htmlFor="email" className="text-sm font-medium mb-1 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full bg-transparent border-b border-white/70 py-2 text-white/70 focus:outline-none"
              />
            </div>

            <input
              type="submit"
              value="Register"
              className="w-full cursor-pointer uppercase mt-6 px-10 py-3 border border-white/70 bg-transparent text-white/70 hover:bg-[#Bfa46f] hover:text-white transition duration-300"
            />
          </div>
        </fieldset>
      </form>
    </section>
  );
}
