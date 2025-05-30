"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#Bfa46f] text-white/70 text-sm py-8">
      <div className="w-[90%] md:w-[80%] mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Contact Info */}
        <div id="contacts" className="flex gap-4">
          <div className="flex flex-col items-start space-y-4">
            <span>📍</span>
            <span>📞</span>
            <span>✉️</span>
            <span>⏰</span>
          </div>
          <div className="flex flex-col justify-start space-y-4">
            <span>Via Pisacane 2, 60019 Senigallia Italy</span>
            <span>
              Telephone:&nbsp;
              <a href="tel:+3907163811" className="hover:text-black">
                +39 071 63811
              </a>
            </span>
            <span>
              E-mail:&nbsp;
              <a
                href="mailto:info@gallienoteca.it"
                className="hover:text-black"
              >
                info@gallienoteca.it
              </a>
            </span>
            <span>Opening time: Monday to Saturday, from 9 a.m. to 8 p.m.</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="block w-full md:w-auto">
          <nav>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/" className="hover:text-black">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="hover:text-black">
                  Wine Catalogue
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-black">
                  Upcoming Tastings
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Social Links */}
        <div className="flex flex-col space-y-3 mb-4">
          <a
            href="https://www.threads.net/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 hover:text-black"
          >
            <i className="fa-brands fa-threads w-5 text-lg"></i>
            <span>Threads</span>
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 hover:text-black"
          >
            <i className="fa-brands fa-facebook w-5 text-lg"></i>
            <span>Facebook</span>
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 hover:text-black"
          >
            <i className="fa-brands fa-instagram w-5 text-lg"></i>
            <span>Instagram</span>
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 hover:text-black"
          >
            <i className="fa-brands fa-youtube w-5 text-lg"></i>
            <span>YouTube</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
