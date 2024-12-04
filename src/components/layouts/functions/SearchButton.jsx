import { Icon } from "@iconify/react";

export default function SearchButton({ name, onClick, disabled, children }) {
  return (
    <button
      name={name}
      onClick={onClick}
      disabled={disabled}
      className="bg-white border border-gray-500 py-2 px-3 text-gray-700 font-semibold rounded-md flex items-center hover:bg-gray-100 hover:border-gray-500 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed"
    >
      <Icon icon="ic:outline-search" className="text-2xl me-2" /> {children}
    </button>
  );
}
