import SectionTitle from "@/components/layouts/SectionTitle";
import HeaderDetailPage from "@/components/layouts/globals/HeaderDetailPage";

export default function AboutPage() {
  return (
    <div className="md:mt-10">
      {/* PROFIL */}
      <div className="-mt-6">
        <SectionTitle id="profil" title="PROFIL" />
      </div>

      <div className="mt-2 bg-white rounded py-2 px-3">
        <p className="text-sm text-justify break-words">
          Bentuk dari kemajuan teknologi salah satunya adalah internet. Internet
          bisa menjadi sangat berpengaruh bagi dunia pendidikan suatu negara.
          Penggunaan komputer atau internet dalam bidang pendidikan bukanlah
          sesuatu yang baru, malah telah lama digunakan di negara-negara maju
          seperti Amerika dan Eropa sejak tahun 60-an. Teknologi internet hadir
          sebagai media yang multifungsi. Komunikasi melalui internet dapat
          dilakukan secara interpersonal (misalnyae-mail dan chatting) atau
          secara masal, yang dikenal one to many communication (misalnya mailing
          list). Berdasarkan hal tersebut, maka internet sebagai media
          pendidikan mampu menghadapkan karakteristik yang khas, yaitu sebagai
          media interpersonal dan massal, bersifat interaktif, memungkinkan
          komunikasi secara sinkron maupun asinkron.
        </p>
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
  );
}
