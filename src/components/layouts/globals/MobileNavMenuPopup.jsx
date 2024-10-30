import { Icon } from "@iconify/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const InnerDropdown = ({ navItems, handleNavLinkItemClicked }) => {
  return (
    <div className="bg-[#333333] border-[1.5px] border-[#A0A0A0] rounded-lg p-4">
      <div className="flex flex-col gap-3">
        {navItems.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            onClick={() => handleNavLinkItemClicked(item.href)}
            className="text-white"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

const MenuItem = ({ item, handleNavLinkItemClicked }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-white text-xl">
      {item.type === "dropdown" ? (
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <p>{item.name}</p>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="border border-white px-1.5"
            >
              <Icon
                icon={isOpen ? "mingcute:up-line" : "mingcute:down-line"}
                className="text-lg"
              />
            </button>
          </div>
          {isOpen ? (
            <div className="mt-6 text-base">{item.dropdownContent}</div>
          ) : null}
        </div>
      ) : (
        <>
          {item.newTab ? (
            <Link
              href={item.href}
              onClick={() => handleNavLinkItemClicked("")}
              target="_blank"
            >
              {item.name}
            </Link>
          ) : (
            <button onClick={() => handleNavLinkItemClicked(item.href)}>
              {item.name}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default function MobileNavMenuPopup({ setIsMobileNavMenuOpen }) {
  const router = useRouter();

  const handleNavLinkItemClicked = (href) => {
    router.push(href);
    setIsMobileNavMenuOpen(false);
  };

  const navItems = [
    {
      name: "Informasi",
      type: "dropdown",
      dropdownContent: (
        <InnerDropdown
          navItems={[
            {
              name: "Peta MKU",
              href: "/informasi",
            },
            {
              name: "Berita",
              href: "/informasi",
            },
          ]}
          handleNavLinkItemClicked={handleNavLinkItemClicked}
        />
      ),
    },
    {
      name: "Tentang",
      type: "dropdown",
      dropdownContent: (
        <InnerDropdown
          navItems={[
            {
              name: "Profil",
              href: "/tentang",
            },
            {
              name: "Pegawai",
              href: "/tentang",
            },
          ]}
          handleNavLinkItemClicked={handleNavLinkItemClicked}
        />
      ),
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
    <div className="mt-16 bg-[#272727] absolute left-2 w-[96%] rounded-md z-10">
      <div className="flex flex-col gap-6 pt-5 pb-6 px-4">
        {navItems.map((item, i) => (
          <MenuItem
            key={i}
            item={item}
            setIsMobileNavMenuOpen={setIsMobileNavMenuOpen}
            handleNavLinkItemClicked={handleNavLinkItemClicked}
          />
        ))}
      </div>
    </div>
  );
}
