import workProgramApi from "@/api/modules/workProgram.api";
import Loading from "@/components/layouts/globals/Loading";
import NotFound from "@/components/layouts/globals/NotFound";
import SectionTitle from "@/components/layouts/SectionTitle";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function WorkProgramPage() {
  const [content, setContent] = useState("");
  //
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorDataLoaded, setErrorDataLoaded] = useState(false);

  const fetchWorkProgramData = async () => {
    const { response, error } = await workProgramApi.getWorkProgram();
    if (response) {
      setContent(response.pkContent);
      setTimeout(() => {
        setIsDataLoaded(true);
      }, 500);
    }
    if (error) {
      toast.error("Gagal memuat data program kerja");
      setErrorDataLoaded(true);
    }
  };
  //
  useEffect(() => {
    fetchWorkProgramData();
  }, []);

  return (
    <div className="md:mt-10">
      <div className="-mt-6">
        <SectionTitle title="PROGRAM KERJA" />
      </div>

      {errorDataLoaded ? (
        <NotFound />
      ) : isDataLoaded ? (
        <div className="mt-2 bg-white rounded py-2 px-3">
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
