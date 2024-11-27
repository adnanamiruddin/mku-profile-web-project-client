import { useState } from "react";
import { toast } from "react-toastify";
import ModalCancelButton from "../functions/ModalCancelButton";
import ModalSubmitButton from "../functions/ModalSubmitButton";
import ConfirmDeleteItemModal from "./ConfirmDeleteItemModal";
import subjectApi from "@/api/modules/subject.api";

export default function DeleteSubjectModal({
  subjectId,
  setSubjectId,
  fetchSubjectsData,
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const { response, error } = await subjectApi.deleteSubject({
      subjectId,
    });
    if (response) {
      document.getElementById("delete_subject_modal").close();
      document.getElementById("confirm_delete_item_modal").close();
      toast.success("Data mata kuliah berhasil dihapus");
      //
      setLoading(false);
      setSubjectId(null);
      fetchSubjectsData();
    }
    if (error) {
      document.getElementById("delete_subject_modal").close();
      document.getElementById("confirm_delete_item_modal").close();
      toast.error(
        "Gagal menghapus data mata kuliah. Silakan coba lagi atau hubungi administrator"
      );
      //
      setLoading(false);
      setSubjectId(null);
    }
  };

  return (
    <dialog id="delete_subject_modal" className="modal">
      <div className="modal-box bg-white w-11/12 max-w-3xl rounded-lg">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg">
            ✕
          </button>
        </form>
        <h1 className="font-bold text-xl border-b border-gray-400 pb-4 -mt-2 -mx-6 px-6">
          Hapus Mata kuliah
        </h1>

        <div className="mt-4">
          <p className="text-lg">
            Apakah Anda yakin ingin menghapus mata kuliah ini?
          </p>

          <div className="mt-6 flex justify-end items-center gap-3">
            <ModalCancelButton
              onClick={() =>
                document.getElementById("delete_subject_modal").close()
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
          content="mata kuliah"
          handleDelete={handleDelete}
          loading={loading}
        />
      </div>
    </dialog>
  );
}
