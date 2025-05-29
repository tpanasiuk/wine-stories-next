"use client";
import { useRef, useEffect, useState } from "react";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";

function useInView(ref: React.RefObject<HTMLElement>, rootMargin = "0px") {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin]);

  return isVisible;
}

export default function EventsPage() {
  const events = [
    {
      date: "15 JUN 2025",
      title: "Summer Tasting: Veneto & Tuscany",
      desc: "Join us for an exquisite evening featuring red and white wines from Veneto and Tuscany regions. Enjoy light appetizers and meet fellow wine enthusiasts.",
    },
    {
      date: "10 JUL 2025",
      title: "Rosé by the Beach",
      desc: "Taste a curated selection of premium rosés perfect for summer, paired with Mediterranean snacks in a relaxed setting.",
    },
    {
      date: "25 AUG 2025",
      title: "Harvest Preview: Autumn Collection",
      desc: "Experience early releases from this year's harvest. Discover unique flavors before they reach the shelves.",
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useInView(sectionRef, "-50px");

  return (
    <div className="bg-[#282828] text-white/70 min-h-screen font-sans">
      <Header
        background="/assets/grapes-field.jpg"
        height="40vh"
        overlayOpacity="bg-black/50"
      />

      <main className="w-[90%] md:w-[80%] mx-auto py-16">
        <h1 className="text-3xl md:text-4xl text-center text-white font-bold mb-6">
          Upcoming Wine Tastings
        </h1>

        <hr className="w-20 border-t border-white/70 mx-auto mb-12" />

        <section
          ref={sectionRef}
          className={`grid gap-6 md:grid-cols-3 transition-all duration-1000 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {events.map((event) => (
            <EventCard key={event.date} {...event} />
          ))}
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
