import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ImageShowcaseSection from "@/components/ImageShowcaseSection";
import AboutSection from "@/components/AboutSection";
import BestsellersSection from "@/components/BestsellersSection";
import TastingForm from "@/components/TastingForm";
import Footer from "@/components/Footer";

const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Home() {
  return (
    <>
      <header className="relative bg-dark">
        <Nav />
        <Hero background={`${base}/assets/field.webp`} />
      </header>

      <main className="bg-dark">
        <AboutSection />
        <ImageShowcaseSection />
        <BestsellersSection />
        <TastingForm />
        <Footer />
      </main>
    </>
  );
}
