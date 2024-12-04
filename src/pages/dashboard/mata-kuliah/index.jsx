import AddDataButton from "@/components/layouts/functions/AddDataButton";
import DeleteButton from "@/components/layouts/functions/DeleteButton";
import EditButton from "@/components/layouts/functions/EditButton";
import DashboardHeader from "@/components/layouts/globals/DashboardHeader";
import DeleteSubjectModal from "@/components/layouts/modals/DeleteSubjectModal";
import NotFound from "@/components/layouts/globals/NotFound";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import subjectApi from "@/api/modules/subject.api";
import Loading from "@/components/layouts/globals/Loading";
import { toast } from "react-toastify";
import LoadingPagination from "@/components/layouts/globals/LoadingPagination";
import { formatDateWithTimeToIndo } from "@/helpers/dateHelper";

const SubjectTable = ({
  title,
  subjects,
  localLoading,
  setSelectedSubjectIdToDelete,
}) => {
  const router = useRouter();

  return (
    <div>
      <h5 className="text-lg font-semibold">{title}</h5>
      <table className="mt-4 w-full">
        <thead>
          <tr className="w-full text-black flex items-center gap-2 py-3 px-1 border-b-2 border-gray-300 text-lg">
            <th className="w-[10%] text-start">No</th>
            <th className="w-[50%] text-start">Nama Mata Kuliah</th>
            <th className="w-[20%] text-start">Dibuat Pada</th>
            <th className="w-[20%] text-start">Aksi</th>
          </tr>
        </thead>
        {localLoading ? (
          <LoadingPagination />
        ) : (
          <>
            {subjects.length > 0 ? (
              <tbody>
                {subjects.map((subject, i) => (
                  <tr
                    key={i}
                    className="text-black flex items-center gap-2 py-2 px-1 border-b-2 border-gray-300"
                  >
                    <td className="w-[10%] text-start ps-2">{i + 1}</td>
                    <td className="w-[50%] text-start underline hover:text-blue-500 break-words">
                      <Link
                        href={`/mata-kuliah/${subject.mkSlug}`}
                        target="_blank"
                      >
                        {subject.mkNama}
                      </Link>
                    </td>
                    <td className="w-[20%] text-start">
                      {formatDateWithTimeToIndo(subject.createdAt)}
                    </td>
                    <td className="w-[20%] text-start flex items-center gap-2">
                      <EditButton
                        name={`editSubjectButton${subject.id}`}
                        onClick={() =>
                          router.push(
                            `/dashboard/mata-kuliah/tambah?editSubjectId=${subject.id}&editSubjectSlug=${subject.mkSlug}`
                          )
                        }
                      >
                        Edit
                      </EditButton>
                      {/*  */}
                      <DeleteButton
                        name={`deleteSubjectButton${subject.id}`}
                        onClick={() => {
                          setSelectedSubjectIdToDelete(subject.id);
                          document
                            .getElementById("delete_subject_modal")
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
              <NotFound message="Tidak ada data mata kuliah" />
            )}
          </>
        )}
      </table>
    </div>
  );
};

export default function DashboardSubjectsPage() {
  const router = useRouter();

  const [mkwuSubjects, setMkwuSubjects] = useState([]);
  const [basicScienceSubjects, setBasicScienceSubjects] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorDataLoaded, setErrorDataLoaded] = useState(false);
  //
  const [selectedSubjectIdToDelete, setSelectedSubjectIdToDelete] =
    useState(null);

  const [localLoading, setLocalLoading] = useState(false);

  const fetchSubjectsData = async () => {
    setLocalLoading(true);
    const { response, error } = await subjectApi.getAllSubjects();
    if (response) {
      setMkwuSubjects(response.mkwu);
      setBasicScienceSubjects(response.sains);
      setTimeout(() => {
        setIsDataLoaded(true);
        setLocalLoading(false);
      }, 1000);
    }
    if (error) {
      setErrorDataLoaded(true);
      toast.error("Gagal memuat data");
    }
  };
  //
  useEffect(() => {
    fetchSubjectsData();
  }, []);

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>MATA KULIAH</DashboardHeader>

      {errorDataLoaded ? (
        <NotFound />
      ) : isDataLoaded ? (
        <div className="px-10 pb-16 h-full">
          <div className="pt-4 flex justify-between items-center border-b border-gray-400 pb-6">
            <h2 className="font-bold text-2xl">Daftar Mata Kuliah</h2>
            {/*  */}
            <AddDataButton
              name="createSubjectButton"
              onClick={() => router.push("/dashboard/mata-kuliah/tambah")}
            >
              Buat
            </AddDataButton>
          </div>

          <div className="mt-4 overflow-x-auto flex flex-col gap-8">
            <SubjectTable
              title="Mata Kuliah Wajib Umum"
              subjects={mkwuSubjects}
              localLoading={localLoading}
              setSelectedSubjectIdToDelete={setSelectedSubjectIdToDelete}
            />

            <SubjectTable
              title="Basic Sains"
              subjects={basicScienceSubjects}
              localLoading={localLoading}
              setSelectedSubjectIdToDelete={setSelectedSubjectIdToDelete}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}

      <DeleteSubjectModal
        subjectId={selectedSubjectIdToDelete}
        setSubjectId={setSelectedSubjectIdToDelete}
        fetchSubjectsData={fetchSubjectsData}
      />
    </div>
  );
}
