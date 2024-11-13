import Link from "next/link";

export default function InnerDropdown({ navItems, handleNavLinkItemClicked }) {
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
}
