"use client";
import { useState, useEffect } from "react";

const links = [
  { label: "About Us", href: "/" },
  { label: "Wine catalogue", href: "/catalogue" },
  { label: "Events", href: "/events" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed Nav Bar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 ${
          scrolled || menuOpen
            ? "bg-black/80 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        {/* Header content with vertical padding */}
        <div className="flex justify-between items-center md:hidden py-4">
          <span className="text-white text-xl">Wine Stories</span>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-white text-2xl"
            aria-label="Toggle menu"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>

        {/* Desktop navigation */}
        <ul className="hidden md:flex w-4/5 mx-auto list-none border-t border-b border-white/70 mt-4">
          {links.map((link, i) => (
            <li
              key={link.href}
              className={`w-full text-center ${i !== links.length - 1 ? "border-r border-white/70" : ""}`}
            >
              <a
                href={link.href}
                className="h-full flex items-center justify-center py-4 px-6 text-white/70 tracking-wider hover:bg-white/70 hover:text-[#000] transition"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile dropdown with adjusted spacing */}
        <div
          className={`absolute left-0 w-full bg-black/80 md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col border-t border-white/70">
            {links.map((link) => (
              <li
                key={link.href}
                className="border-b border-white/40 last:border-b-0"
              >
                <a
                  href={link.href}
                  className="block py-4 px-4 text-white/70 hover:bg-white/70 hover:text-[#000] transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
