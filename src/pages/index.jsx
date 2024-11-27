import SubjectDropdown from "@/components/layouts/SubjectDropdown";
import InformationItem from "@/components/layouts/InformationItem";
import SectionTitle from "@/components/layouts/SectionTitle";
import { dummyInformationList, dummySubjectList } from "@/data/staticData";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import informationApi from "@/api/modules/information.api";
import { toast } from "react-toastify";
import subjectApi from "@/api/modules/subject.api";
import HeaderDetailPage from "@/components/layouts/globals/HeaderDetailPage";
import SubjectItem from "@/components/layouts/SubjectItem";
import NotFound from "@/components/layouts/globals/NotFound";
import Loading from "@/components/layouts/globals/Loading";

export default function HomePage() {
  const [informations, setInformations] = useState([]);
  const [mkuMapImage, setMkuMapImage] = useState("/home-map.png");
  const [mkwuSubjects, setMkwuSubjects] = useState([]);
  const [basicScienceSubjects, setBasicScienceSubjects] = useState([]);
  //
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [errorDataLoaded, setErrorDataLoaded] = useState(false);

  const fetchInformationsData = async () => {
    const { response, error } = await informationApi.blog.getAllBlogs({
      page: 1,
    });
    if (response) {
      const filteredData = response.data.filter(
        (data) => data.artiStatus === "publish"
      );
      setInformations(filteredData);
      fetchMkuMapData();
    }
    if (error) {
      toast.error("Gagal memuat data. Silahkan muat ulang halaman");
      setErrorDataLoaded(true);
    }
  };
  //
  const fetchMkuMapData = async () => {
    const { response, error } = await informationApi.map.getMap();
    if (response) {
      setMkuMapImage(response.fileUrl);
      fetchSubjectsData();
    }
    if (error) {
      toast.error("Gagal memuat data. Silahkan muat ulang halaman");
      setErrorDataLoaded(true);
    }
  };
  //
  const fetchSubjectsData = async () => {
    const { response, error } = await subjectApi.getAllSubjects();
    if (response) {
      setMkwuSubjects(response.mkwu);
      setBasicScienceSubjects(response.sains);
      setTimeout(() => {
        setIsDataLoaded(true);
      }, 500);
    }
    if (error) {
      setErrorDataLoaded(true);
      toast.error("Gagal memuat data");
    }
  };
  //
  useEffect(() => {
    fetchInformationsData();
  }, []);

  return (
    <div className="-mt-4">
      {errorDataLoaded ? (
        <div className="md:mt-10">
          {/* INFORMASI */}
          <div className="-mt-6">
            <SectionTitle title="INFORMASI" />
          </div>

          {/* PETA MKU */}
          <div className="-mt-4">
            <SectionTitle title="PETA MKU" />
          </div>

          {/* MATA KULIAH */}
          <div className="-mt-4">
            <SectionTitle title="MATA KULIAH" />
          </div>

          <NotFound />
        </div>
      ) : isDataLoaded ? (
        <>
          <div className="mt-2 bg-white rounded py-4 px-1.5 md:flex">
            <Image
              priority
              src="/home-image.png"
              alt="MKU Universitas Hasanuddin"
              width={1920}
              height={1080}
              className="w-full md:w-[45%] object-contain"
            />

            <h1 className="text-4xl text-[#3F3F3F] font-semibold leading-tight tracking-wide p-3 md:my-auto md:text-6xl md:ms-8">
              Sub Direktorat Mata Kuliah Umum Universitas Hasanuddin
            </h1>
          </div>

          {/* INFORMASI */}
          <SectionTitle title="INFORMASI" />

          <div className="mt-2 flex flex-col gap-2 md:flex-row md:overflow-auto">
            {informations.map((information, i) => (
              <InformationItem key={i} information={information} />
            ))}
          </div>

          <div className="mt-2 bg-[#942828] text-white font-semibold text-lg rounded-full py-2 flex justify-center items-center md:hidden">
            Lihat Semua Artikel
            <Icon
              icon="material-symbols:arrow-right-alt"
              className="text-2xl ml-2"
            />
          </div>

          {/* PETA MKU */}
          <SectionTitle title="PETA MKU" />

          <Image
            priority
            src={mkuMapImage}
            alt="Peta MKU"
            width={500}
            height={500}
            className="mt-2 w-full md:h-[75vh] object-contain"
          />

          {/* MATA KULIAH */}
          <div className="md:hidden">
            <SectionTitle title="Mata Kuliah Wajib Umum" />
          </div>
          {/*  */}
          <div className="hidden md:inline">
            <SectionTitle title="MATA KULIAH" />
          </div>

          <div className="flex flex-col md:flex-row md:gap-1">
            <div className="md:hidden">
              <HeaderDetailPage title={`${mkwuSubjects.length} Mata Kuliah`} />
            </div>

            <div className="md:w-1/2">
              <SubjectItem
                title="Mata Kuliah Wajib Umum"
                subjects={mkwuSubjects}
                color="orange"
              />
            </div>

            {/* Basic Sains */}
            <div className="md:hidden">
              <SectionTitle title="Basic Sains" />
            </div>

            <div className="md:hidden">
              <HeaderDetailPage
                title={`${basicScienceSubjects.length} Mata Kuliah`}
              />
            </div>

            <div className="md:w-1/2">
              <SubjectItem
                title="Basic Sains"
                subjects={basicScienceSubjects}
                color="green"
              />
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
