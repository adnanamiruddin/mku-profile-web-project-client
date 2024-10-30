import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({
  isMobileNavMenuOpen,
  setIsMobileNavMenuOpen,
}) {
  return (
    <nav className="mt-1 bg-white rounded py-2 px-3 flex justify-between items-center">
      <Link
        href="/"
        onClick={() => setIsMobileNavMenuOpen(false)}
        className="flex items-center gap-3"
      >
        <Image
          src="/logo-unhas.png"
          alt="MKU Unhas"
          width={200}
          height={200}
          className="w-7"
        />
        <div>
          <h1 className="font-semibold text-sm">UPT Mata Kuliah Umum</h1>
          <h2 className="text-xs">Universitas Hasanuddin</h2>
        </div>
      </Link>

      <div className="flex items-center gap-1">
        <Icon
          icon="material-symbols:menu"
          onClick={() => {
            setIsMobileNavMenuOpen(!isMobileNavMenuOpen);
            // Scroll to top
            window.scrollTo(0, 0);
          }}
          className="text-3xl"
        />
      </div>
    </nav>
  );
}
