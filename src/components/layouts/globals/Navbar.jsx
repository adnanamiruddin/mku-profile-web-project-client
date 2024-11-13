import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar({
  isMobileNavMenuOpen,
  setIsMobileNavMenuOpen,
}) {
  const router = useRouter();

  const navItems = [
    {
      name: "Beranda",
      type: "hyperlink",
      href: "/",
    },
    {
      name: "Informasi",
      type: "dropdown",
      href: "/informasi",
      dropdownContent: [
        {
          name: "Peta MKU",
          href: "/informasi#petaMku",
        },
        {
          name: "Berita",
          href: "/informasi#berita",
        },
      ],
    },
    {
      name: "Tentang",
      type: "dropdown",
      href: "/tentang",
      dropdownContent: [
        {
          name: "Profil",
          href: "/tentang#profil",
        },
        {
          name: "Pegawai",
          href: "/tentang#pegawai",
        },
      ],
    },
    {
      name: "Mata Kuliah",
      type: "hyperlink",
      href: "/mata-kuliah",
    },
    {
      name: "Program Kerja",
      type: "hyperlink",
      href: "/program-kerja",
    },
  ];

  return (
    <nav className="mt-1 bg-white rounded py-2 px-3 flex justify-between items-center md:px-4">
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
          className="w-7 md:w-10"
        />
        <div>
          <h1 className="font-semibold text-sm md:text-lg">
            UPT Mata Kuliah Umum
          </h1>
          <h2 className="text-xs md:text-base">Universitas Hasanuddin</h2>
        </div>
      </Link>

      <div className="md:hidden flex items-center gap-1">
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

      <div className="hidden md:flex justify-center items-center gap-6">
        {navItems.map((item, i) => (
          <div key={i} className="flex items-center">
            {item.type === "dropdown" ? (
              <div className="dropdown dropdown-end dropdown-hover">
                <div
                  tabIndex={0}
                  role="button"
                  className={`flex items-center gap-2 ${
                    router.pathname === item.href ? "font-bold" : ""
                  }`}
                >
                  {item.name}
                  <Icon icon="mingcute:down-line" className="text-lg mt-0.5" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-[#333333] text-white rounded-lg z-[1] w-80 p-2 shadow"
                >
                  {item.dropdownContent.map((dropdownItem, j) => (
                    <li key={j} className="hover:bg-[#942828] rounded">
                      <Link
                        href={dropdownItem.href}
                        onClick={() => setIsMobileNavMenuOpen(false)}
                        className="text-white"
                      >
                        {dropdownItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link
                href={item.href}
                onClick={() => setIsMobileNavMenuOpen(false)}
                className={`${
                  router.pathname === item.href ? "font-bold" : ""
                }`}
              >
                {item.name}
              </Link>
            )}
            {i !== navItems.length - 1 ? <p className="ms-4">/</p> : null}
          </div>
        ))}
      </div>
    </nav>
  );
}
