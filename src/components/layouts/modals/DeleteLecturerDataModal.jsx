import { useState } from "react";
import { toast } from "react-toastify";
import ModalCancelButton from "../functions/ModalCancelButton";
import ModalSubmitButton from "../functions/ModalSubmitButton";
import ConfirmDeleteItemModal from "./ConfirmDeleteItemModal";
import aboutApi from "@/api/modules/about.api";

export default function DeleteLecturerDataModal({
  lecturerId,
  setLecturerId,
  fetchLecturersData,
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const { response, error } = await aboutApi.lecturer.deleteLecturerData({
      lecturerId,
    });
    if (response) {
      document.getElementById("delete_lecturer_data_modal").close();
      document.getElementById("confirm_delete_item_modal").close();
      toast.success("Data dosen berhasil dihapus");
      //
      setLoading(false);
      setLecturerId(null);
      fetchLecturersData();
    }
    if (error) {
      document.getElementById("delete_lecturer_data_modal").close();
      document.getElementById("confirm_delete_item_modal").close();
      toast.error(
        "Gagal menghapus data dosen. Silakan coba lagi atau hubungi administrator"
      );
      //
      setLoading(false);
      setLecturerId(null);
    }
  };

  return (
    <dialog id="delete_lecturer_data_modal" className="modal">
      <div className="modal-box bg-white w-11/12 max-w-3xl rounded-lg">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg">
            ✕
          </button>
        </form>
        <h1 className="font-bold text-xl border-b border-gray-400 pb-4 -mt-2 -mx-6 px-6">
          Hapus Data dosen
        </h1>

        <div className="mt-4">
          <p className="text-lg">
            Apakah Anda yakin ingin menghapus data dosen ini?
          </p>

          <div className="mt-6 flex justify-end items-center gap-3">
            <ModalCancelButton
              onClick={() =>
                document.getElementById("delete_lecturer_data_modal").close()
              }
            >
              Batal
            </ModalCancelButton>
            {/*  */}
            <ModalSubmitButton
              onClick={() =>
                document.getElementById("confirm_delete_item_modal").showModal()
              }
            >
              Hapus
            </ModalSubmitButton>
          </div>
        </div>

        <ConfirmDeleteItemModal
          content="data dosen"
          handleDelete={handleDelete}
          loading={loading}
        />
      </div>
    </dialog>
  );
}
