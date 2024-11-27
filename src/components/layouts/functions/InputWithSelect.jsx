import { useState } from "react";

export default function InputWithSelect({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  options,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.selectedOptions[0].text);
    onChange(e);
  };

  return (
    <div className="w-full">
      <h3 className="mb-3 font-semibold text-lg">{label}</h3>
      <div className="w-full border border-gray-400 rounded">
        <input
          type="text"
          disabled
          placeholder={placeholder}
          value={selectedOption}
          className="w-[65%] bg-white py-3 px-4 rounded rounded-e-none border-r border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
        />
        <select
          name={name}
          value={value}
          onChange={handleSelectChange}
          className="w-[35%] select bg-white outline-none border-l border-gray-300 font-semibold text-base rounded rounded-s-none"
        >
          <option disabled selected>
            Pilih
          </option>
          {options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      {error ? (
        <div className="label">
          <span className="label-text-alt text-error -mb-2">{helperText}</span>
        </div>
      ) : null}
    </div>
  );
}
