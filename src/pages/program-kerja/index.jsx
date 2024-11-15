import HeaderDetailPage from "@/components/layouts/globals/HeaderDetailPage";
import SectionTitle from "@/components/layouts/SectionTitle";

export default function WorkProgramPage() {
  return (
    <div className="md:mt-10">
      {/* PROFIL */}
      <div className="-mt-6">
        <SectionTitle title="PROGRAM KERJA" />
      </div>

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
  );
}
