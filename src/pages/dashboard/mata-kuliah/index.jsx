import AddDataButton from "@/components/layouts/functions/AddDataButton";
import DeleteButton from "@/components/layouts/functions/DeleteButton";
import EditButton from "@/components/layouts/functions/EditButton";
import DashboardHeader from "@/components/layouts/globals/DashboardHeader";
import DeleteSubjectModal from "@/components/layouts/modals/DeleteSubjectModal";
import NotFound from "@/components/layouts/NotFound";
import { dummySubjectList } from "@/data/staticData";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DashboardSubjectsPage() {
  const router = useRouter();

  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  //
  const [selectedSubjectIdToDelete, setSelectedSubjectIdToDelete] =
    useState(null);

  const fetchSubjectsData = async () => {
    setLoadingSubjects(true);
    setSubjects(dummySubjectList);
    setTimeout(() => {
      setLoadingSubjects(false);
    }, 1000);
  };
  //
  useEffect(() => {
    fetchSubjectsData();
  }, []);

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>MATA KULIAH</DashboardHeader>

      <div className="px-10 pb-16 h-full">
        <div className="pt-4 flex justify-between items-center border-b border-gray-400 pb-6">
          <h2 className="font-bold text-2xl">Daftar Mata Kuliah</h2>
          {/*  */}
          <AddDataButton
            onClick={() => router.push("/dashboard/mata-kuliah/tambah")}
          >
            Buat
          </AddDataButton>
        </div>

        <div className="mt-4 overflow-x-auto flex flex-col gap-8">
          {subjects.map((subject, i) => (
            <div key={i}>
              <h5 className="text-lg font-semibold">{subject.type}</h5>
              <table className="mt-4 w-full">
                <thead>
                  <tr className="w-full text-black flex items-center py-3 px-1 border-b-2 border-gray-300 text-lg">
                    <th className="w-[10%] text-start">No</th>
                    <th className="w-[50%] text-start">Nama Mata Kuliah</th>
                    <th className="w-[20%] text-start">Dibuat Pada</th>
                    <th className="w-[20%] text-start">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {subject.subjects.length > 0 ? (
                    <>
                      {subject.subjects.map((subject, i) => (
                        <tr
                          key={i}
                          className="text-black flex items-center py-2 px-1 border-b-2 border-gray-300"
                        >
                          <td className="w-[10%] text-start ps-2">{i + 1}</td>
                          <td className="w-[50%] text-start underline hover:text-blue-500 break-words">
                            <Link
                              href={`/mata-kuliah/${subject.title}`}
                              target="_blank"
                            >
                              {subject.title}
                            </Link>
                          </td>
                          <td className="w-[20%] text-start">
                            {subject.createdAt}
                          </td>
                          <td className="w-[20%] text-start flex items-center gap-2">
                            <EditButton
                              onClick={() =>
                                router.push(
                                  `/dashboard/mata-kuliah/tambah?edit=${subject.title}`
                                )
                              }
                            >
                              Edit
                            </EditButton>
                            {/*  */}
                            <DeleteButton
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
                    </>
                  ) : (
                    <NotFound message="Tidak ada data berita" />
                  )}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>

      <DeleteSubjectModal
        subjectId={selectedSubjectIdToDelete}
        setSubjectId={setSelectedSubjectIdToDelete}
        fetchSubjectsData={fetchSubjectsData}
      />
    </div>
  );
}
