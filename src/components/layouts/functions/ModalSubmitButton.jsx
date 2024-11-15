export default function ModalSubmitButton({ loading, onClick, children }) {
  return (
    <button
      type="button"
      onClick={loading ? null : onClick}
      className={`py-1.5 w-36 border border-emerald-700 bg-emerald-700 rounded text-white hover:bg-emerald-600 hover:border-emerald-500 focus:bg-emerald-800 focus:border-emerald-600 ${
        loading ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {loading ? (
        <span className="loading loading-bars loading-sm -mb-0.5"></span>
      ) : (
        children
      )}
    </button>
  );
}
