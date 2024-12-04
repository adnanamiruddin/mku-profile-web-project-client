import { Icon } from "@iconify/react";
import { useState } from "react";

export default function SearchBar({
  placeholder,
  searchQuery,
  setSearchQuery,
  onSubmit,
  onReset,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <form className="form relative w-full" onSubmit={onSubmit}>
      <button
        type="submit"
        className={`absolute left-2 -translate-y-1/2 top-1/2 p-1 ${
          isFocused ? "text-gray-700" : "text-gray-400"
        }`}
      >
        <Icon icon="uil:search" className="text-xl" />
      </button>
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="rounded-md py-2 px-10 border border-gray-300 focus:border-2 focus:outline-none bg-stone-50 focus:border-gray-500 placeholder-gray-400 transition-all duration-300 shadow-lg w-full"
      />
      <button
        type="reset"
        className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
        onClick={onReset}
      >
        <Icon icon="uil:times" className="text-gray-500 text-xl" />
      </button>
    </form>
  );
}
