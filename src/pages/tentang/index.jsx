import aboutApi from "@/api/modules/about.api";
import SectionTitle from "@/components/layouts/SectionTitle";
import HeaderDetailPage from "@/components/layouts/globals/HeaderDetailPage";
import Loading from "@/components/layouts/globals/Loading";
import NotFound from "@/components/layouts/globals/NotFound";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AboutPage() {
  const [profileContent, setProfileContent] = useState("");
  const [lecturerData, setLecturerData] = useState([]);
  //
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorDataLoaded, setErrorDataLoaded] = useState(false);

  const fetchProfileData = async () => {
    const { response, error } = await aboutApi.profile.getProfile();
    if (response) {
      setProfileContent(response.profilContent);
      setTimeout(() => {
        setIsDataLoaded(true);
      }, 500);
    }
    if (error) {
      toast.error("Gagal memuat data profil");
      setErrorDataLoaded(true);
    }
  };
  //
  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <>
      {errorDataLoaded ? (
        <div className="md:mt-10">
          {/* PROFIL */}
          <div className="-mt-6">
            <SectionTitle id="profil" title="PROFIL" />
          </div>

          {/* PEGAWAI */}
          <div className="-mt-4">
            <SectionTitle id="pegawai" title="PEGAWAI" />
          </div>

          <NotFound />
        </div>
      ) : isDataLoaded ? (
        <div className="md:mt-10">
          {/* PROFIL */}
          <div className="-mt-6">
            <SectionTitle id="profil" title="PROFIL" />
          </div>

          <div className="mt-2 bg-white rounded py-2 px-3">
            <div dangerouslySetInnerHTML={{ __html: profileContent }}></div>
          </div>

          {/* PEGAWAI */}
          <SectionTitle id="pegawai" title="PEGAWAI" />

          <HeaderDetailPage
            title="Data Dosen & Tendik"
            description="Bulan Mei 2024"
          />

          <embed
            className="w-full h-[70vh] border-none"
            src="/pdf/Data-Dosen-dan-Tendik.pdf"
            type="application/pdf"
          />
          {/*  */}
          <p className="text-sm text-center p-4">
            Jika PDF tidak muncul,{" "}
            <a
              download
              href="/pdf/Data-Dosen-dan-Tendik.pdf"
              className="text-blue-500 underline"
            >
              klik di sini untuk mengunduh PDF
            </a>
            .
          </p>
        </div>
      ) : (
        <div className="md:mt-10">
          {/* PROFIL */}
          <div className="-mt-6">
            <SectionTitle id="profil" title="PROFIL" />
          </div>

          {/* PEGAWAI */}
          <div className="-mt-4">
            <SectionTitle id="pegawai" title="PEGAWAI" />
          </div>

          <Loading />
        </div>
      )}
    </>
  );
}
