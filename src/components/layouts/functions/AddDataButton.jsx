import { Icon } from "@iconify/react";

export default function AddDataButton({ onClick, disabled, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-white border-[1.5px] border-blue-700 py-2 px-3 text-blue-700 font-semibold rounded-md flex items-center hover:bg-blue-500 hover:border-blue-300 hover:text-white disabled:bg-gray-300 disabled:text-blue-500 disabled:border-blue-500 disabled:cursor-not-allowed"
    >
      <Icon icon="tdesign:add" className="text-2xl me-2" /> {children}
    </button>
  );
}
