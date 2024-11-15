import { useState } from "react";
import ModalCancelButton from "../functions/ModalCancelButton";
import ModalSubmitButton from "../functions/ModalSubmitButton";
import UploadFileField from "../functions/UploadFileField";
import Image from "next/image";

export default function EditMkuMapModal({ mkuMapImage }) {
  const [imageUpload, setImageUpload] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdateData = async () => {
    //
  };

  return (
    <dialog id="edit_mku_map_modal" className="modal">
      <div className="modal-box bg-white w-11/12 max-w-3xl rounded-lg">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg">
            ✕
          </button>
        </form>
        <h1 className="font-bold text-xl border-b border-gray-400 pb-4 -mt-2 -mx-6 px-6">
          Upload Foto
        </h1>

        <UploadFileField
          label="Upload Foto"
          onChange={(e) => {
            setImageUpload(e.target.files[0]);
          }}
        />

        <div className="mt-6 overflow-x-auto">
          <h3 className="mb-3 font-semibold text-lg">Preview</h3>
          <Image
            priority
            src={imageUpload ? URL.createObjectURL(imageUpload) : mkuMapImage}
            alt="Peta MKU"
            width={500}
            height={500}
            className="w-full max-h-[75vh] object-contain"
          />
        </div>

        <div className="mt-6 flex justify-end items-center gap-3">
          <ModalCancelButton
            loading={loading}
            onClick={() =>
              document.getElementById("edit_mku_map_modal").close()
            }
          >
            Batal
          </ModalCancelButton>
          {/*  */}
          <ModalSubmitButton loading={loading} onClick={() => handleUpdateData}>
            Simpan
          </ModalSubmitButton>
        </div>
      </div>
    </dialog>
  );
}
