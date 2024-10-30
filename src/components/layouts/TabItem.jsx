export default function TabItem({ initialTab, tab, setTab, children }) {
  return (
    <button
      onClick={() => setTab(initialTab)}
      className={`w-full flex justify-center items-center px-4 py-2.5 font-medium rounded-md ${
        tab === initialTab
          ? "bg-[#942828] text-white"
          : "bg-white text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}
