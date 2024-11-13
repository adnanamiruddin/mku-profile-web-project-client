import Dropdown from "@/components/layouts/Dropdown";
import InformationItem from "@/components/layouts/InformationItem";
import SectionTitle from "@/components/layouts/SectionTitle";
import { informationList, dummySubjectList } from "@/data/staticData";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [informations, setInformations] = useState([]);

  const fetchInformationsData = async () => {
    setInformations(informationList);
  };
  //
  useEffect(() => {
    fetchInformationsData();
  }, []);

  return (
    <div className="-mt-4">
      <div className="mt-2 bg-white rounded py-4 px-1.5 md:flex">
        <Image
          priority
          src="/home-image1.png"
          alt="Kampus STIKES"
          width={1920}
          height={1080}
          className="w-full md:w-[70%]"
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
        src="/home-map.png"
        alt="Peta MKU"
        width={500}
        height={500}
        className="mt-2 w-full"
      />

      {/* MATA KULIAH */}
      <SectionTitle title="MATA KULIAH" />

      <div className="flex flex-col md:flex-row md:gap-1">
        {dummySubjectList.map((subject, i) => (
          <div
            key={i}
            className="mt-2 bg-white rounded py-4 px-6 flex flex-col gap-4 md:mt-0 md:w-1/2 md:px-0 md:py-0 md:h-max md:pb-3"
          >
            <h3 className="md:hidden font-semibold text-lg">{subject.type}</h3>
            <div
              className={`hidden md:inline uppercase text-white p-6 rounded-t ${
                subject.type === "Mata Kuliah Wajib Umum"
                  ? "bg-[#F6A93D]"
                  : "bg-[#14AE5C]"
              }`}
            >
              <h3 className="font-semibold text-xl text-center">
                {subject.type}
              </h3>
            </div>
            {subject.subjects.map((subject, i) => (
              <Dropdown
                key={i}
                title={subject.title}
                showBorderTop={i === 0 ? false : true}
              >
                <embed
                  className="w-full h-[70vh] border-none"
                  src={subject.file}
                  type="application/pdf"
                />
                {/*  */}
                <p className="text-center p-4">
                  Jika PDF tidak muncul,{" "}
                  <a
                    download
                    href={subject.file}
                    className="text-blue-500 underline"
                  >
                    klik di sini untuk mengunduh PDF
                  </a>
                  .
                </p>
              </Dropdown>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
