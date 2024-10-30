import { Icon } from "@iconify/react";
import Link from "next/link";

export default function HeaderPage({ children }) {
  return (
    <div className="mt-2 bg-white rounded py-4 px-2 flex items-center gap-4">
      <Link href="/">
        <Icon icon="ep:back" className="text-2xl" />
      </Link>
      <h2 className="font-semibold flex items-center gap-4 break-words">
        <span className="bg-[#942828] p-1.5 rounded-full"></span>
        {children}
      </h2>
    </div>
  );
}
