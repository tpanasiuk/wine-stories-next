import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchAllWines, Wine } from "@/app/lib/fetchWines";
import WineTable from "@/components/WineTable";
import Image from "next/image";
import ImageGallery from '@/components/ImageGallery';

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const imageGallery = [
  { src: `${base}/assets/wines/7.webp`, alt: 'Chianti bottle' },
  { src: `${base}/assets/wines/6.webp`, alt: 'Barolo bottle' },
  { src: `${base}/assets/wines/8.webp`, alt: 'Montepulciano bottle' },
];

export default async function WinesPage() {
  const wines: Wine[] = await fetchAllWines();

  return (
    <div className="bg-[#282828] text-white/70 min-h-screen font-sans">
      <Header
        background={`${base}/assets/wines/10.webp`}
        height="50vh"
        overlayOpacity="bg-black/50"
        className="bg-bottom"
      />

      <main className="w-[90%] md:w-[80%] mx-auto py-16">
        <h1 className="text-3xl md:text-4xl text-center text-white font-bold mb-6">
          Discover Wines
        </h1>
        <hr className="w-20 border-t border-white/70 mx-auto mb-12" />

        <ImageGallery images={imageGallery} />

        <WineTable wines={wines} />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
