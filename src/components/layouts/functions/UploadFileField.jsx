import React from "react";

export default function UploadFileField({
  name,
  label,
  onChange,
  onlyPdf,
  clearAutoMargin,
}) {
  return (
    <div className={`w-full ${!clearAutoMargin ? "mt-4" : ""}`}>
      <h3 className="mb-3 font-semibold text-lg">{label}</h3>
      <input
        name={name}
        type="file"
        accept={onlyPdf ? "application/pdf" : "image/*"}
        onChange={onChange}
        className="file-input file-input-bordered file-input-success w-full bg-gray-50"
      />
    </div>
  );
}
