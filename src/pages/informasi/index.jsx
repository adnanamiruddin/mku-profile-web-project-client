import LoadingBar from "@/components/layouts/globals/LoadingBar";
import SectionTitle from "@/components/layouts/SectionTitle";
import TabItem from "@/components/layouts/TabItem";
import { dummyInformationList } from "@/data/staticData";
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
    setInformations(dummyInformationList);
    setTimeout(() => {
      setLoadingInformations(false);
    }, 1000);
  };
  //
  useEffect(() => {
    fetchInformationsData();
  }, [tab]);

  return (
    <div className="md:mt-10">
      {/* PETA MKU */}
      <div className="-mt-6">
        <SectionTitle id="petaMku" title="PETA MKU" />
      </div>

      <Image
        priority
        src="/home-map.png"
        alt="Peta MKU"
        width={500}
        height={500}
        className="mt-2 w-full h-[75vh] object-contain"
      />

      {/* INFORMASI */}
      <SectionTitle id="berita" title="INFORMASI" />

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
        <div className="mt-1 flex flex-col gap-1 flex-wrap md:flex-row md:justify-center">
          {informations.map((information, i) => (
            <Link
              key={i}
              href={`/informasi/${information.slug}`}
              className="bg-white rounded p-3 md:min-w-[33%]"
            >
              <Image
                priority
                src={information.image}
                alt={information.title}
                width={500}
                height={500}
                className="w-full rounded-t-md md:h-80 object-cover"
              />
              {/*  */}
              <div className="py-4">
                <h6 className="font-semibold break-words">
                  {information.title}
                </h6>
                <p className="mt-1.5 text-gray-400 text-sm flex items-center gap-1">
                  {information.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
