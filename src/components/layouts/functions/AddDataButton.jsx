import { Icon } from "@iconify/react";

export default function AddDataButton({ name, onClick, disabled, children }) {
  return (
    <button
      name={name}
      onClick={onClick}
      disabled={disabled}
      className="bg-white border-[1.5px] border-emerald-700 py-2 px-3 text-emerald-700 font-semibold rounded-md flex items-center hover:bg-emerald-500 hover:border-emerald-300 hover:text-white disabled:bg-gray-300 disabled:text-emerald-500 disabled:border-emerald-500 disabled:cursor-not-allowed"
    >
      <Icon icon="tdesign:add" className="text-2xl me-2" /> {children}
    </button>
  );
}
