import { Icon } from "@iconify/react";

export default function EditButton({ onClick, disabled, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-green-600 border border-green-600 text-white py-2 px-3 rounded-md flex items-center transition-all duration-300 hover:bg-green-500 hover:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 focus:bg-green-700 disabled:bg-green-600 disabled:brightness-75 disabled:cursor-not-allowed disabled:text-gray-100"
    >
      <Icon
        icon="material-symbols-light:save-outline"
        className="text-xl me-2"
      />
      {children || "Ubah"}
    </button>
  );
}
