import AddDataButton from "@/components/layouts/functions/AddDataButton";
import DeleteButton from "@/components/layouts/functions/DeleteButton";
import EditButton from "@/components/layouts/functions/EditButton";
import DashboardHeader from "@/components/layouts/globals/DashboardHeader";
import DeleteInformationModal from "@/components/layouts/modals/DeleteInformationModal";
import NotFound from "@/components/layouts/globals/NotFound";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "@/components/layouts/globals/Loading";
import informationApi from "@/api/modules/information.api";
import { toast } from "react-toastify";
import Pagination from "@/components/layouts/functions/Pagination";
import LoadingPagination from "@/components/layouts/globals/LoadingPagination";
import { formatDateWithTimeToIndo } from "@/helpers/dateHelper";
import aboutApi from "@/api/modules/about.api";
import DeleteLecturerDataModal from "@/components/layouts/modals/DeleteLecturerDataModal";

export default function DashboardLecturerPage() {
  const router = useRouter();

  const [lecturers, setLecturers] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorDataLoaded, setErrorDataLoaded] = useState(false);
  //
  const [selectedLecturerIdToDelete, setSelectedLecturerIdToDelete] =
    useState(null);

  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loadingPagination, setLoadingPagination] = useState(false);

  const fetchLecturersData = async () => {
    setLoadingPagination(true);
    const { response, error } = await aboutApi.lecturer.getAllLecturers({
      page,
    });
    if (response) {
      setLecturers(response.data);
      setTotalPage(response.pagination.lastPage);
      setTimeout(() => {
        setIsDataLoaded(true);
        setLoadingPagination(false);
      }, 1000);
    }
    if (error) {
      setErrorDataLoaded(true);
      toast.error("Gagal memuat data");
    }
  };
  //
  useEffect(() => {
    fetchLecturersData();
  }, [page]);

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>PEGAWAI</DashboardHeader>

      {errorDataLoaded ? (
        <NotFound />
      ) : isDataLoaded ? (
        <div className="px-10 pb-16 h-full">
          <div className="pt-4 flex justify-between items-center">
            <h2 className="font-bold text-2xl">Daftar Pegawai</h2>
            {/*  */}
            <AddDataButton
              name="createLecturerDataButton"
              onClick={() => router.push("/dashboard/tentang/pegawai/tambah")}
            >
              Buat
            </AddDataButton>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="w-full text-black flex items-center gap-2 py-3 px-1 border-b-2 border-gray-300 text-lg">
                  <th className="w-[5%] text-start">No</th>
                  <th className="w-[20%] text-start">NIP</th>
                  <th className="w-[30%] text-start">Nama</th>
                  <th className="w-[25%] text-start">Dibuat Pada</th>
                  <th className="w-[20%] text-start">Aksi</th>
                </tr>
              </thead>
              {loadingPagination ? (
                <LoadingPagination />
              ) : (
                <>
                  {lecturers.length > 0 ? (
                    <tbody>
                      {lecturers.map((lecturer, i) => (
                        <tr
                          key={i}
                          className="text-black flex items-center gap-2 py-5 px-1 border-b-2 border-gray-300"
                        >
                          <td className="w-[5%] text-start ps-2">{i + 1}</td>
                          <td className="w-[20%] text-start">
                            {lecturer.dsnNip}
                          </td>
                          <td className="w-[30%] text-start">
                            {lecturer.dsnNama}
                          </td>
                          <td className="w-[25%] text-start">
                            {formatDateWithTimeToIndo(lecturer.createdAt)}
                          </td>
                          <td className="w-[20%] text-start flex items-center gap-2">
                            <EditButton
                              name={`editLecturerDataButton${lecturer.id}`}
                              onClick={() =>
                                router.push(
                                  `/dashboard/tentang/pegawai/tambah?editLecturerId=${lecturer.id}&editLecturerNip=${lecturer.dsnNip}`
                                )
                              }
                            >
                              Edit
                            </EditButton>
                            {/*  */}
                            <DeleteButton
                              name={`deleteLecturerDataButton${lecturer.id}`}
                              onClick={() => {
                                setSelectedLecturerIdToDelete(lecturer.id);
                                document
                                  .getElementById("delete_lecturer_data_modal")
                                  .showModal();
                              }}
                            >
                              Hapus
                            </DeleteButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <NotFound message="Tidak ada data berita" />
                  )}

                  <Pagination
                    page={page}
                    totalPage={totalPage}
                    setPage={setPage}
                  />
                </>
              )}
            </table>
          </div>
        </div>
      ) : (
        <Loading />
      )}

      <DeleteLecturerDataModal
        lecturerId={selectedLecturerIdToDelete}
        setLecturerId={setSelectedLecturerIdToDelete}
        fetchLecturersData={fetchLecturersData}
      />
    </div>
  );
}
