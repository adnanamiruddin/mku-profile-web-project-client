export default function LoginButton({ name, loading }) {
  return (
    <button
      name={name}
      type="submit"
      className={`mt-3 bg-[#005C54] w-full border-0 text-white text-xl py-3 rounded-lg shadow-lg hover:bg-emerald-700 focus:bg-emerald-900 ${
        loading ? "brightness-75" : ""
      }`}
    >
      {loading ? (
        <span className="loading loading-bars loading-sm"></span>
      ) : (
        "Masuk"
      )}
    </button>
  );
}
