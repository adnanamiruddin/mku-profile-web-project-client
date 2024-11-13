import { Icon } from "@iconify/react";

export default function DeleteButton({ onClick, disabled, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-red-600 border border-red-600 text-white py-2 px-3 rounded-md flex items-center transition-all duration-300 hover:bg-red-500 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 focus:bg-red-700 disabled:bg-red-600 disabled:brightness-75 disabled:cursor-not-allowed disabled:text-gray-100"
    >
      <Icon icon="ph:trash" className="text-xl me-2" />
      {children || "Hapus"}
    </button>
  );
}
