import Image from "next/image";
import Link from "next/link";

export default function InformationItem({ information }) {
  return (
    <Link
      href={`/informasi/${information.slug}`}
      className="bg-white rounded p-3 md:min-w-[25%]"
    >
      <Image
        priority
        src={information.image}
        alt={information.title}
        width={500}
        height={500}
        className="w-full rounded-t-md"
      />
      {/*  */}
      <div className="py-4">
        <h6 className="font-semibold break-words">{information.title}</h6>
        <p className="mt-1.5 text-gray-400 text-sm flex items-center gap-1">
          {information.date}
        </p>
      </div>
    </Link>
  );
}
