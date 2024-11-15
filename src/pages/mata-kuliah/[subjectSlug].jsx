import HeaderDetailPage from "@/components/layouts/globals/HeaderDetailPage";
import SectionTitle from "@/components/layouts/SectionTitle";
import TabItem from "@/components/layouts/TabItem";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SubjectTabLayout = ({ title, file }) => {
  return (
    <div>
      <h4 className="text-lg font-semibold">{title}</h4>
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
    </div>
  );
};

export default function SubjectDetailPage() {
  const router = useRouter();
  const { subjectSlug } = router.query;

  const [tab, setTab] = useState("rps");
  //
  const [subject, setSubject] = useState("");

  const fetchSubjectData = async () => {
    setSubject({
      title: "Bahasa Indonesia",
      category: "Mata Kuliah Wajib Umum",
      rps: "/pdf/sample-rps.pdf",
      dosenPengampu: "/pdf/sample-rps.pdf",
      jadwalPerkuliahan: "/pdf/sample-rps.pdf",
      monitoringPerkuliahan: "/pdf/sample-rps.pdf",
      evaluasiPerkuliahan: "/pdf/sample-rps.pdf",
    });
  };
  //
  useEffect(() => {
    fetchSubjectData();
  }, [subjectSlug]);

  return (
    <div className="md:mt-10">
      <div className="-mt-6">
        <SectionTitle title="MATA KULIAH" />
      </div>

      <HeaderDetailPage title={subject.title} description={subject.category} />

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
        <TabItem initialTab="monitoring-perkuliahan" tab={tab} setTab={setTab}>
          Monitoring Perkuliahan
        </TabItem>
        {/*  */}
        <TabItem initialTab="evaluasi-perkuliahan" tab={tab} setTab={setTab}>
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
  );
}
