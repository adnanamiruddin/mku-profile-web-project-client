import AddDataButton from "@/components/layouts/functions/AddDataButton";
import DeleteButton from "@/components/layouts/functions/DeleteButton";
import EditButton from "@/components/layouts/functions/EditButton";
import DashboardHeader from "@/components/layouts/globals/DashboardHeader";
import NotFound from "@/components/layouts/NotFound";
import { dummyInformationList } from "@/data/staticData";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DashboardInformationPage() {
  const router = useRouter();

  const [informations, setInformations] = useState([]);
  const [loadingInformations, setLoadingInformations] = useState(false);

  const fetchInformationsData = async () => {
    setLoadingInformations(true);
    setInformations(dummyInformationList);
    setTimeout(() => {
      setLoadingInformations(false);
    }, 1000);
  };
  //
  useEffect(() => {
    fetchInformationsData();
  }, []);

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>BERITA</DashboardHeader>

      <div className="px-12 pb-16 h-full">
        <div className="pt-8 flex justify-between items-center">
          <h2 className="font-bold text-2xl">Daftar Berita</h2>
          {/*  */}
          <AddDataButton
            onClick={() => router.push("/dashboard/informasi/berita/buat")}
          >
            Buat
          </AddDataButton>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="w-full text-black flex items-center py-3 px-1 border-b-2 border-gray-300 text-lg">
                <th className="w-[10%] text-start">No</th>
                <th className="w-[50%] text-start">Judul</th>
                <th className="w-[20%] text-start">Dibuat Pada</th>
                <th className="w-[20%] text-start">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {informations.length > 0 ? (
                <>
                  {informations.map((information, i) => (
                    <tr
                      key={i}
                      className="text-black flex items-center py-5 px-1 border-b-2 border-gray-300"
                    >
                      <td className="w-[10%] text-start ps-2">{i + 1}</td>
                      <td className="w-[50%] text-start underline hover:text-blue-500 break-words">
                        <Link
                          href={`/informasi/${information.slug}`}
                          target="_blank"
                        >
                          {information.title}
                        </Link>
                      </td>
                      <td className="w-[20%] text-start">{information.date}</td>
                      <td className="w-[20%] text-start flex items-center gap-2">
                        <EditButton
                          onClick={() =>
                            router.push(
                              `/dashboard/informasi/berita/${information.slug}/edit`
                            )
                          }
                        >
                          Edit
                        </EditButton>
                        {/*  */}
                        <DeleteButton onClick={() => {}}>Hapus</DeleteButton>
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
      </div>
    </div>
  );
}