import { formatDateToIndo } from "@/helpers/dateHelper";
import Image from "next/image";
import Link from "next/link";

export default function InformationItem({ information }) {
  return (
    <Link
      href={`/informasi/${information.artiSlug}`}
      className="bg-white rounded p-3 md:min-w-[25%]"
    >
      <Image
        priority
        src={information.artiImage ? information.artiImage : "/home-image.png"}
        alt={information.artiTitle}
        width={500}
        height={500}
        className="w-96 h-56 object-cover rounded-t-md"
      />
      {/*  */}
      <div className="py-4">
        <h6 className="font-semibold break-words">{information.artiTitle}</h6>
        <p className="mt-1.5 text-gray-400 text-sm flex items-center gap-1">
          {formatDateToIndo(information.createdAt)}
        </p>
      </div>
    </Link>
  );
}
