import { Icon } from "@iconify/react";

export default function NotFound({ message }) {
  return (
    <div className="mt-2 bg-white flex flex-col justify-center items-center gap-4 h-[50vh]">
      <Icon icon="twemoji:empty-nest" className="text-8xl" />
      <p className="mt-5 text-center text-xl font-semibold break-words">
        {message || "Terjadi kesalahan. Silahkan muat ulang halaman"}
      </p>
    </div>
  );
}
