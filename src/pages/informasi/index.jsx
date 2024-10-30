import LoadingBar from "@/components/layouts/globals/LoadingBar";
import SectionTitle from "@/components/layouts/SectionTitle";
import TabItem from "@/components/layouts/TabItem";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function InformationPage() {
  const [tab, setTab] = useState("semua");
  //
  const [informations, setInformations] = useState([]);
  const [loadingInformations, setLoadingInformations] = useState(false);

  const fetchInformationsData = async () => {
    setLoadingInformations(true);
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
    setTimeout(() => {
      setLoadingInformations(false);
    }, 1000);
  };
  //
  useEffect(() => {
    fetchInformationsData();
  }, [tab]);

  return (
    <div>
      {/* PETA MKU */}
      <div className="-mt-6">
        <SectionTitle title="PETA MKU" />
      </div>

      <Image
        priority
        src="/home-map.png"
        alt="Peta MKU"
        width={500}
        height={500}
        className="mt-2 w-full"
      />

      {/* INFORMASI */}
      <SectionTitle title="INFORMASI" />

      <div className="mt-2 flex justify-center items-center gap-1 overflow-auto whitespace-nowrap">
        <TabItem initialTab="semua" tab={tab} setTab={setTab}>
          Semua
        </TabItem>
        {/*  */}
        <TabItem initialTab="terbaru" tab={tab} setTab={setTab}>
          Terbaru
        </TabItem>
        {/*  */}
        <TabItem initialTab="banyak-dikunjungi" tab={tab} setTab={setTab}>
          Banyak Dikunjungi
        </TabItem>
      </div>

      {loadingInformations ? (
        <LoadingBar />
      ) : (
        <div className="mt-1 flex flex-col gap-2">
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
      )}
    </div>
  );
}
