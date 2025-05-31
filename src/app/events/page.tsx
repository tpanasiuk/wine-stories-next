"use client";
import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { motion } from "framer-motion";

const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

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

  return (
    <div className="bg-[#282828] text-white/70 min-h-screen font-sans">
      <Header
        background={`${base}/assets/grapes-field.webp`}
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
          className="grid gap-6 md:grid-cols-3"
        >
          {events.map((event, index) => (
            <motion.div
              key={event.date}
              initial={{ rotateX: -90, scale: 0.9, opacity: 0 }}
              whileInView={{ rotateX: 0, scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 12,
                delay: index * 0.2,
              }}
              viewport={{ once: true, amount: 0.4 }}
              className="transform-gpu h-full"
            >
              <div className="h-full flex">
                <EventCard {...event} />
              </div>
            </motion.div>
          ))}
        </section>

      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
