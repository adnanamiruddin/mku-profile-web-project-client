import { Icon } from "@iconify/react";

export default function EditButton({ onClick, disabled, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-emerald-600 border border-emerald-600 text-white py-2 px-3 rounded-md flex items-center transition-all duration-300 hover:bg-emerald-500 hover:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 focus:bg-emerald-700 disabled:bg-emerald-600 disabled:brightness-75 disabled:cursor-not-allowed disabled:text-gray-100"
    >
      <Icon icon="basil:edit-outline" className="text-xl me-2" />
      {children || "Ubah"}
    </button>
  );
}
