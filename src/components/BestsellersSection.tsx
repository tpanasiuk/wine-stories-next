"use client";
import Image from "next/image";

export default function BestsellersSection() {
  return (
    <section
      id="bestsellers"
      className="bg-[#f5f4eb] text-[#282828] py-section"
    >
      <hr className="border-b border-primary mb-12 w-[calc(100%_-_10%)] mx-auto" />

      <div className="w-[80%] mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Left Side: Info */}
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-left">
            Top 3 Bestsellers
          </h2>

          <ul className="space-y-6">
            <li>
              <div className="flex gap-4 items-center">
                <span className="text-primary font-bold">2020</span>
                <div>
                  <h3 className="text-lg font-semibold">Sartori Fira Bianco</h3>
                  <p className="text-sm">A special wine with wonderful taste.</p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex gap-4 items-center">
                <span className="text-primary font-bold">2019</span>
                <div>
                  <h3 className="text-lg font-semibold">
                    Brunelli Bianco di Custoza
                  </h3>
                  <p className="text-sm">A special wine with wonderful taste.</p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex gap-4 items-center">
                <span className="text-primary font-bold">2020</span>
                <div>
                  <h3 className="text-lg font-semibold">
                    Domini Veneti Raudii Garganega
                  </h3>
                  <p className="text-sm">A special wine with wonderful taste.</p>
                </div>
              </div>
            </li>
          </ul>

          <p className="mt-8 text-sm leading-relaxed">
            Meet the makers behind our bestsellers. Through our online community, you&apos;ll connect with passionate Italian winemakers, learn their stories, and explore the regions they call home.
          </p>
        </div>

        {/* Right Side: Images */}
        <div className="space-y-6">
          <div className="overflow-hidden rounded shadow-lg">
            <Image
              src="/assets/Rectangle%2011.png"
              alt="Glass of wine"
              width={800}
              height={400}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded shadow-lg">
              <Image
                src="/assets/Rectangle%2012.png"
                alt="Wine bottles on shelf"
                width={400}
                height={200}
                className="w-full h-40 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="overflow-hidden rounded shadow-lg">
              <Image
                src="/assets/Rectangle%2013.png"
                alt="Wine bottles"
                width={400}
                height={200}
                className="w-full h-40 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="border-b border-primary mt-12 w-[calc(100%_-_10%)] mx-auto" />
    </section>
  );
}
