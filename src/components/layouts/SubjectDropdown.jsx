import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SubjectDropdown({ title, showBorderTop, children }) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`${showBorderTop ? "border-t-[1.5px] border-gray-300" : ""}`}
    >
      <div
        className={`${
          showBorderTop ? "pt-3 md:pt-5" : ""
        } flex justify-between items-center gap-6 md:px-4 md:pb-2`}
      >
        <h3
          className={`w-[90%] text-base text-start md:text-lg ${
            isOpen ? "font-semibold" : "font-normal"
          }`}
        >
          {title}
        </h3>

        <div className="flex gap-2">
          {isOpen ? (
            <Icon
              icon="iconamoon:eye"
              onClick={() => router.push(`/mata-kuliah/${title}`)}
              className="text-2xl cursor-pointer"
            />
          ) : null}
          <Icon
            icon={isOpen ? "icon-park:up" : "icon-park:down"}
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl cursor-pointer"
          />
        </div>
      </div>

      {isOpen ? (
        <div className="mt-4 flex flex-col gap-3">{children}</div>
      ) : null}
    </div>
  );
}
