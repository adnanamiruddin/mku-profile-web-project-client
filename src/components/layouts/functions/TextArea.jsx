export default function TextArea({
  label,
  rows,
  name,
  value,
  placeholder,
  onChange,
  error,
  helperText,
  disabled,
  clearAutoMargin,
}) {
  return (
    <div className={`w-full ${!clearAutoMargin ? "mt-4" : ""}`}>
      <h3 className="mb-3 font-semibold text-lg">{label}</h3>
      <textarea
        rows={rows || 3}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className="w-full bg-white py-3 px-4 rounded border border-gray-400 focus:ring-[0.5px] focus:ring-gray-500 focus:outline-none disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-500"
      ></textarea>
      {error ? (
        <div className="label">
          <span className="label-text-alt text-error -mb-1">{helperText}</span>
        </div>
      ) : null}
    </div>
  );
}
