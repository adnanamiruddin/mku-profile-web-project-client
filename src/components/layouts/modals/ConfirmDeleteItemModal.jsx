import { Icon } from "@iconify/react";

export default function ConfirmDeleteItemModal({
  handleDelete,
  loading,
  content,
  customId,
}) {
  return (
    <dialog id={customId || "confirm_delete_item_modal"} className="modal">
      <div className="modal-box bg-white">
        <form method="dialog">
          <button
            disabled={loading}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 disabled:cursor-not-allowed"
          >
            ✕
          </button>
        </form>

        <Icon
          icon="line-md:alert"
          className="text-center w-full text-8xl text-red-600"
        />

        <h4 className="mt-4 text-center text-lg">
          Konfirmasi hapus {content} ini
        </h4>

        <div className="mt-4 flex justify-center items-center gap-5">
          <button
            onClick={handleDelete}
            disabled={loading}
            className={`w-1/3 py-2.5 text-white font-medium text-center bg-red-600 hover:bg-red-500 focus-within:bg-red-700 rounded-lg border border-red-400 disabled:cursor-not-allowed ${
              loading ? "brightness-75" : ""
            }`}
          >
            {!loading ? (
              "Hapus"
            ) : (
              <span className="loading loading-bars loading-md"></span>
            )}
          </button>
          {/*  */}
          <button
            onClick={() =>
              document
                .getElementById(customId || "confirm_delete_item_modal")
                .close()
            }
            disabled={loading}
            className="w-1/3 py-2.5 text-gray-900 font-medium text-center bg-gray-100 hover:bg-gray-50 focus:bg-gray-200 rounded-lg border border-gray-300 disabled:cursor-not-allowed"
          >
            {!loading ? (
              "Batal"
            ) : (
              <span className="loading loading-bars loading-md"></span>
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
}
