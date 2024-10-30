import { Icon } from "@iconify/react";

export default function NotFound() {
  return (
    <div className="mt-2 bg-white flex flex-col justify-center items-center gap-4 h-[50vh]">
      <Icon icon="twemoji:empty-nest" className="text-8xl" />
      <h4 className="text-gray-400 text-lg">Belum ada data</h4>
    </div>
  );
}
