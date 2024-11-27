import { useState } from "react";
import { toast } from "react-toastify";
import ModalCancelButton from "../functions/ModalCancelButton";
import ModalSubmitButton from "../functions/ModalSubmitButton";
import ConfirmDeleteItemModal from "./ConfirmDeleteItemModal";
import informationApi from "@/api/modules/information.api";

export default function DeleteInformationModal({
  informationId,
  setInformationId,
  fetchInformationsData,
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const { response, error } = await informationApi.blog.deleteBlog({
      blogId: informationId,
    });
    if (response) {
      document.getElementById("delete_information_modal").close();
      document.getElementById("confirm_delete_item_modal").close();
      toast.success("Berita berhasil dihapus");
      //
      setLoading(false);
      setInformationId(null);
      fetchInformationsData();
    }
    if (error) {
      document.getElementById("delete_information_modal").close();
      document.getElementById("confirm_delete_item_modal").close();
      toast.error(
        "Gagal menghapus berita. Silakan coba lagi atau hubungi administrator"
      );
      //
      setLoading(false);
      setInformationId(null);
    }
  };

  return (
    <dialog id="delete_information_modal" className="modal">
      <div className="modal-box bg-white w-11/12 max-w-3xl rounded-lg">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg">
            ✕
          </button>
        </form>
        <h1 className="font-bold text-xl border-b border-gray-400 pb-4 -mt-2 -mx-6 px-6">
          Hapus Berita
        </h1>

        <div className="mt-4">
          <p className="text-lg">
            Apakah Anda yakin ingin menghapus berita ini?
          </p>

          <div className="mt-6 flex justify-end items-center gap-3">
            <ModalCancelButton
              onClick={() =>
                document.getElementById("delete_information_modal").close()
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
          content="berita"
          handleDelete={handleDelete}
          loading={loading}
        />
      </div>
    </dialog>
  );
}
