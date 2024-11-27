import subjectApi from "@/api/modules/subject.api";
import HeaderDetailPage from "@/components/layouts/globals/HeaderDetailPage";
import Loading from "@/components/layouts/globals/Loading";
import NotFound from "@/components/layouts/globals/NotFound";
import SectionTitle from "@/components/layouts/SectionTitle";
import TabItem from "@/components/layouts/TabItem";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SubjectTabLayout = ({ title, file }) => {
  return (
    <div>
      <h4 className="text-lg font-semibold">{title}</h4>
      {file ? (
        <>
          <embed
            className="w-full h-[70vh] border-none mt-2"
            src={file}
            type="application/pdf"
          />
          {/*  */}
          <p className="text-center p-4">
            Jika PDF tidak muncul,{" "}
            <a download href={file} className="text-blue-500 underline">
              klik di sini untuk mengunduh PDF
            </a>
            .
          </p>
        </>
      ) : (
        <NotFound message="File tidak ditemukan" />
      )}
    </div>
  );
};

export default function SubjectDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [tab, setTab] = useState("rps");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorDataLoaded, setErrorDataLoaded] = useState(false);
  //
  const [subject, setSubject] = useState("");

  const fetchSubjectData = async () => {
    const { response, error } = await subjectApi.getSubjectBySlug({ slug });

    if (response) {
      setSubject({
        title: response.mkNama,
        category:
          response.mkTipe === 1 ? "Basic Sains" : "Mata Kuliah Wajib Umum",
      });
      response.mkFiles.forEach((file) => {
        if (file.mkfTipe === "rps") {
          setSubject((subject) => ({ ...subject, rps: file.fileUrl }));
        }
        if (file.mkfTipe === "lecturer") {
          setSubject((subject) => ({
            ...subject,
            dosenPengampu: file.fileUrl,
          }));
        }
        if (file.mkfTipe === "schedule") {
          setSubject((subject) => ({
            ...subject,
            jadwalPerkuliahan: file.fileUrl,
          }));
        }
        if (file.mkfTipe === "monitoring") {
          setSubject((subject) => ({
            ...subject,
            monitoringPerkuliahan: file.fileUrl,
          }));
        }
        if (file.mkfTipe === "evaluation") {
          setSubject((subject) => ({
            ...subject,
            evaluasiPerkuliahan: file.fileUrl,
          }));
        }
      }),
        setTimeout(() => {
          setIsDataLoaded(true);
        }, 1000);
    }
    if (error) {
      toast.error("Gagal memuat data mata kuliah");
      setErrorDataLoaded(true);
    }
  };
  //
  useEffect(() => {
    if (slug) fetchSubjectData();
  }, [slug]);

  return (
    <>
      {errorDataLoaded ? (
        <NotFound />
      ) : isDataLoaded ? (
        <div className="md:mt-10">
          <div className="-mt-6">
            <SectionTitle title="MATA KULIAH" />
          </div>

          <HeaderDetailPage
            title={subject.title}
            description={subject.category}
          />

          <div className="mt-2 flex items-center gap-1 overflow-auto whitespace-nowrap">
            <TabItem initialTab="rps" tab={tab} setTab={setTab}>
              RPS
            </TabItem>
            {/*  */}
            <TabItem initialTab="dosen-pengampu" tab={tab} setTab={setTab}>
              Dosen Pengampu
            </TabItem>
            {/*  */}
            <TabItem initialTab="jadwal-perkuliahan" tab={tab} setTab={setTab}>
              Jadwal Perkuliahan
            </TabItem>
            {/*  */}
            <TabItem
              initialTab="monitoring-perkuliahan"
              tab={tab}
              setTab={setTab}
            >
              Monitoring Perkuliahan
            </TabItem>
            {/*  */}
            <TabItem
              initialTab="evaluasi-perkuliahan"
              tab={tab}
              setTab={setTab}
            >
              Evaluasi Perkuliahan
            </TabItem>
          </div>

          <div className="mt-2 bg-white py-2 px-3">
            {tab === "rps" ? (
              <SubjectTabLayout
                title="Rencana Pembelajaran Semester"
                file={subject.rps}
              />
            ) : tab === "dosen-pengampu" ? (
              <SubjectTabLayout
                title="Dosen Pengampu"
                file={subject.dosenPengampu}
              />
            ) : tab === "jadwal-perkuliahan" ? (
              <SubjectTabLayout
                title="Jadwal Perkuliahan"
                file={subject.jadwalPerkuliahan}
              />
            ) : tab === "monitoring-perkuliahan" ? (
              <SubjectTabLayout
                title="Monitoring Perkuliahan"
                file={subject.monitoringPerkuliahan}
              />
            ) : tab === "evaluasi-perkuliahan" ? (
              <SubjectTabLayout
                title="Evaluasi Perkuliahan"
                file={subject.evaluasiPerkuliahan}
              />
            ) : null}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
