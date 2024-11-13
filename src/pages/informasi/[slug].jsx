import HeaderDetailPage from "@/components/layouts/globals/HeaderDetailPage";
import InformationItem from "@/components/layouts/InformationItem";
import SectionTitle from "@/components/layouts/SectionTitle";
import { dummyInformationList } from "@/data/staticData";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function InformationDetailPage() {
  const [informations, setInformations] = useState([]);

  const fetchInformationsData = async () => {
    setInformations(dummyInformationList);
  };
  //
  useEffect(() => {
    fetchInformationsData();
  }, []);

  return (
    <div className="md:mt-10 md:flex md:items-start md:gap-3">
      <div className="w-full md:w-[75%]">
        {/* PETA MKU */}
        <div className="-mt-6">
          <SectionTitle title="INFORMASI" />
        </div>

        <HeaderDetailPage
          title="UNIT MKU UNIVERSITAS HASANUDDIN"
          description="Jumat, 19 April 2024 10:33. Terakhir Diperbaharui pada Kamis, 11 Juli 2024 09:56. Ditulis oleh Administrator"
        />

        <div className="mt-2 bg-white py-2 px-3">
          <Image
            priority
            src="/informasi/informasi-header-1.png"
            alt="Peta MKU"
            width={500}
            height={500}
            className="w-full object-cover"
          />
        </div>

        <div className="mt-2 bg-white rounded py-2 px-3">
          <p className="text-[#A0A0A0] text-sm">
            Bapak Drs. H. Djamhuri saat menandatangani SK Kepengurusan KSR-PMI
            Unit Akper Intan Martapura
          </p>
        </div>

        <div className="text-sm text-justify break-words whitespace-normal">
          <div className="mt-2 bg-white rounded py-2 px-3">
            <p>
              Kepungurusan Korps Sukarela Palang Merah Indonesia (KSR-PMI) Unit
              Akper Intan Martapura periode 2014-2015 resmi dilantik oleh Ketua
              PMI Kabupaten Banjar yang diwakili oleh Bapak Drs. H. Djamhuri
              bertempat di Aula Stikes Intan Martapura (Jumat, 27 Juni 2014).
              Acara yang dihadiri oleh Civitas Akademik dan para Pembina PMI
              Kabupaten Banjar berlangsung sangat hikmat yang diawali
              penyampaian visi dan misi serta program kerja oleh Ahmad Zulkipli
              sebagai komandan terpilih. Adapun program kerja yang dipaparkan
              diantaranya : Donor Darah, Penyuluhan Kesehatan, dan Sunatan
              Massal yang tentunya bekerjasama dengan Ikatan Keluarga Mahasiswa
              (IKM) Stikes Intan Martapura sebagai organisasi yang tidak
              terpisahkan.
            </p>
          </div>

          <div className="mt-2 bg-white rounded py-2 px-3">
            <p>
              Dalam sambutannya, Bapak Drs. H. Djamhuri berkeyakianan KSR-PMI
              Unit Stikes Intan Martapura akan berkembang, mandiri dan aktif
              dalam penanggulangan bencana di Kabupaten Banjar Khususnya,
              Kalimantan Selatan dan Indonesia pada umumnya. Beliau juga
              berpesan kepada seluruh relawan agar selalu meningkatkan skill
              dengan sering berlatih dalam upaya penanggulangan bencana yang
              berpegang pada 7 prinip dasar gerakan palang merah internasional
              dan bulan sabit merah internasional meliputi Kemanusiaan
              (humanity), Kesamaan (impartiality), Kenetralan (neutrality),
              Kemandirian (independence), Kesukarelaan (voluntary service),
              Kesatuan (unity), dan Kesemestaan (universality).
            </p>
          </div>
        </div>

        {/* BERITA LAINNYA */}
        <div className="md:hidden">
          <SectionTitle title="BERITA LAINNYA" />

          <div className="mt-2 flex flex-col gap-2">
            {informations.map((information, i) => (
              <InformationItem key={i} information={information} />
            ))}
          </div>
        </div>
      </div>

      {/* BERITA LAINNYA */}
      <div className="hidden md:inline md:w-[25%]">
        <div className="bg-white rounded py-4">
          <p className="font-semibold text-center text-3xl">BERITA LAINNYA</p>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          {informations.map((information, i) => (
            <InformationItem key={i} information={information} />
          ))}
        </div>
      </div>
    </div>
  );
}
