import { selectUser } from "@/redux/features/userSlice";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function DashboardHomePage() {
  const { user } = useSelector(selectUser);

  return (
    <div className="overflow-hidden">
      <div>
        <Image
          priority
          src="/home-image.png"
          alt="Homepage Image"
          width={1920}
          height={1080}
          className="w-full h-80 object-cover"
        />

        <div className="ms-24 -mt-24 w-max relative">
          <Image
            src="/profile-lecturer.png"
            alt={user.name || user.username}
            width={500}
            height={500}
            className="w-40 h-40 object-cover rounded-full"
            // Disabled right click
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </div>

      <div className="ps-20 pe-12 pt-8 flex justify-between gap-16">
        <div className="w-1/2">
          <h1 className="font-bold text-4xl">{user.name || user.username}</h1>
          <p className="mt-4 text-xl">{user.username}</p>
        </div>

        <div className="w-1/2 flex justify-between items-center gap-3">
          <div className="text-lg w-full">
            <div className="flex">
              <h3 className="font-bold w-[20%]">Email</h3>
              <p className="break-words pe-4">{user.email || "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
