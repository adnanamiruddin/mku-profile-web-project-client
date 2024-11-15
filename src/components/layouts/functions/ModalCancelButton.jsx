export default function ModalCancelButton({ loading, onClick, children }) {
  return (
    <button
      onClick={loading ? null : onClick}
      className={`py-1.5 w-36 border border-gray-900 rounded font-medium hover:bg-gray-50 hover:border-gray-400 focus:bg-gray-200 focus:border-gray-600 ${
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
