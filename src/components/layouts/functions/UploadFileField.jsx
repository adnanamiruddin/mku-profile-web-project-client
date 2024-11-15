import React from "react";

export default function UploadFileField({
  label,
  onChange,
  onlyPdf,
  clearAutoMargin,
}) {
  return (
    <div className={`w-full ${!clearAutoMargin ? "mt-4" : ""}`}>
      <h3 className="mb-3 font-semibold text-lg">{label}</h3>
      <input
        type="file"
        accept={onlyPdf ? "application/pdf" : "image/*"}
        onChange={onChange}
        className="file-input file-input-bordered w-full bg-gray-50"
      />
    </div>
  );
}