import { selectUser, setUser } from "@/redux/features/userSlice";
import { Icon } from "@iconify/react";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SidebarProfile() {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();

  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(setUser(null));
    Cookies.remove("actkn");
    Cookies.remove("rfrshtkn");
    Cookies.remove("lggnnusr");
    router.push("/");
  };

  return (
    <div className="flex items-center gap-3">
      <Image
        src="/profile-lecturer.png"
        alt={user.account || user.name || user.username || "User"}
        width={200}
        height={200}
        className="w-9 h-9 object-cover rounded-full"
      />
      <h6 className="flex items-center">
        {user.account || user.name || user.username || "User"}
        <div>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="cursor-pointer flex items-center ms-2 focus:outline-none"
          >
            <Icon
              icon={
                isDropdownOpen
                  ? "grommet-icons:form-up"
                  : "grommet-icons:form-down"
              }
              className="text-2xl"
            />
          </button>
          {isDropdownOpen ? (
            <div className="absolute left-2 mt-4 w-[95%] bg-[#1E1E1E] text-white rounded pt-6 shadow-lg z-50">
              <div className="font-sans flex flex-col items-center">
                <Image
                  src="/profile-lecturer.png"
                  alt={user.account || user.name || user.username || "User"}
                  width={500}
                  height={500}
                  className="w-14 h-14 object-cover rounded-full"
                />
                <h6 className="mt-4 text-center mx-6">
                  {user.account || user.name || user.username || "User"}
                </h6>
              </div>
              {/*  */}
              <div className="mt-4 border-b border-gray-600"></div>
              <button
                onClick={handleLogout}
                className="font-sans flex items-center gap-3 px-6 py-1.5 mt-3 mb-4 w-full hover:bg-red-700"
              >
                <Icon icon="line-md:log-out" className="text-2xl" />
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </h6>
    </div>
  );
}
