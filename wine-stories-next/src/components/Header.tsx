import Nav from "./Nav";

interface HeaderProps {
  background: string;
  height?: string;
  overlayOpacity?: string;
}

export default function Header({
  background,
  height = "40vh",
  overlayOpacity = "bg-black/50",
}: HeaderProps) {
  return (
    <header
      className={`relative bg-cover bg-center`}
      style={{ backgroundImage: `url(${background})`, height }}
    >
      <div className={`absolute inset-0 z-0 ${overlayOpacity}`} />
      <div className="relative z-100">
        <Nav />
      </div>
    </header>
  );
}
