import subjectApi from "@/api/modules/subject.api";
import SectionTitle from "@/components/layouts/SectionTitle";
import SubjectItem from "@/components/layouts/SubjectItem";
import HeaderDetailPage from "@/components/layouts/globals/HeaderDetailPage";
import Loading from "@/components/layouts/globals/Loading";
import NotFound from "@/components/layouts/globals/NotFound";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SubjectsPage() {
  const [mkwuSubjects, setMkwuSubjects] = useState([]);
  const [basicScienceSubjects, setBasicScienceSubjects] = useState([]);
  //
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorDataLoaded, setErrorDataLoaded] = useState(false);

  const fetchSubjectsData = async () => {
    const { response, error } = await subjectApi.getAllSubjects();
    if (response) {
      setMkwuSubjects(response.mkwu);
      setBasicScienceSubjects(response.sains);
      setTimeout(() => {
        setIsDataLoaded(true);
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
    <div className="md:mt-10">
      {/* MKWU */}
      <div className="-mt-6">
        <div className="md:hidden">
          <SectionTitle title="Mata Kuliah Wajib Umum" />
        </div>
        {/*  */}
        <div className="hidden md:inline">
          <SectionTitle title="Mata Kuliah Umum" />
        </div>
      </div>

      {errorDataLoaded ? (
        <NotFound />
      ) : isDataLoaded ? (
        <div className="flex flex-col md:flex-row md:gap-1">
          <div className="md:hidden">
            <HeaderDetailPage
              title="10 Mata Kuliah"
              description="Bulan Oktober 2024"
            />
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
              title="5 Mata Kuliah"
              description="Bulan Oktober 2024"
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
      ) : (
        <Loading />
      )}
    </div>
  );
}
