export default function ModalSubmitButton({ loading, onClick, children }) {
  return (
    <button
      type="button"
      onClick={loading ? null : onClick}
      className={`py-1.5 w-36 border border-blue-700 bg-blue-700 rounded text-white hover:bg-blue-600 hover:border-blue-500 focus:bg-blue-800 focus:border-blue-600 ${
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
