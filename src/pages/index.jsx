import Dropdown from "@/components/layouts/Dropdown";
import SectionTitle from "@/components/layouts/SectionTitle";
import { subjectList } from "@/data/staticData";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [informations, setInformations] = useState([]);

  const fetchInformationsData = async () => {
    setInformations([
      {
        date: "Sabtu, 11 Maret 2023",
        title: "[INFO SAINS SKPB UNHAS]",
        image: "/home-information-1.png",
      },
      {
        date: "Sabtu, 11 Maret 2023",
        title: "UPT MKU Unhas Miliki Manajemen Terpisah dari Fakultas",
        image: "/home-information-2.png",
      },
    ]);
  };
  //
  useEffect(() => {
    fetchInformationsData();
  }, []);

  return (
    <div className="-mt-4">
      <div className="mt-2 bg-white rounded py-4 px-1.5">
        <Image
          priority
          src="/home-image1.png"
          alt="Kampus STIKES"
          width={1920}
          height={1080}
        />

        <h1 className="text-4xl text-[#3F3F3F] font-semibold leading-tight tracking-wide p-3">
          Sub Direktorat Mata Kuliah Umum Universitas Hasanuddin
        </h1>
      </div>

      {/* INFORMASI */}
      <SectionTitle title="INFORMASI" />

      <div className="mt-2 flex flex-col gap-2">
        {informations.map((article, i) => (
          <Link key={i} href={`/`} className="bg-white rounded p-3">
            <Image
              priority
              src={article.image}
              alt={article.title}
              width={500}
              height={500}
              className="w-full rounded-t-md"
            />
            {/*  */}
            <div className="py-4">
              <h6 className="font-semibold break-words">{article.title}</h6>
              <p className="mt-1.5 text-gray-400 text-sm flex items-center gap-1">
                {article.date}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-2 bg-[#942828] text-white font-semibold text-lg rounded-full py-2 flex justify-center items-center">
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

      {subjectList.map((subject, i) => (
        <div
          key={i}
          className="mt-2 bg-white rounded py-4 px-6 flex flex-col gap-4"
        >
          <h3 className="font-semibold text-lg">{subject.type}</h3>
          {subject.subjects.map((subject, i) => (
            <Dropdown
              key={i}
              title={subject.title}
              showBorderTop={i === 0 ? false : true}
            >
              <p className="text-center p-4">
                Jika PDF tidak muncul, <br />
                <a
                  download
                  href={subject.file}
                  className="text-blue-500 underline"
                >
                  klik di sini untuk mengunduh PDF
                </a>
                .
              </p>
              {/*  */}
              <embed
                className="w-full h-[70vh] border-none"
                src={subject.file}
                type="application/pdf"
              />
            </Dropdown>
          ))}
        </div>
      ))}
    </div>
  );
}
