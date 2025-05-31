'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <section aria-label="Image showcase" className="my-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, index) => {
          const [loaded, setLoaded] = useState(false);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={`object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 ${
                  loaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoadingComplete={() => setLoaded(true)}
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
