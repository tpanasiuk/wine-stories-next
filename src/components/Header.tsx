'use client';

import { useEffect, useState } from 'react';
import Nav from './Nav';

interface HeaderProps {
  background: string;
  height?: string;
  overlayOpacity?: string;
}

export default function Header({
  background,
  height = '40vh',
  overlayOpacity = 'bg-black/50',
}: HeaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = background;
    img.onload = () => setIsLoaded(true);
  }, [background]);

  return (
    <header
      className={`relative bg-cover bg-center transition-opacity duration-700 ease-in-out ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundImage: `url(${background})`,
        height,
      }}
    >
      <div className={`absolute inset-0 z-0 ${overlayOpacity}`} />
      <div className="relative z-100">
        <Nav />
      </div>
    </header>
  );
}
