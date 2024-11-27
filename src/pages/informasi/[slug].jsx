import informationApi from "@/api/modules/information.api";
import HeaderDetailPage from "@/components/layouts/globals/HeaderDetailPage";
import Loading from "@/components/layouts/globals/Loading";
import NotFound from "@/components/layouts/globals/NotFound";
import InformationItem from "@/components/layouts/InformationItem";
import SectionTitle from "@/components/layouts/SectionTitle";
import { formatDateWithTimeToIndo } from "@/helpers/dateHelper";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function InformationDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [information, setInformation] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorDataLoaded, setErrorDataLoaded] = useState(false);
  //
  const [anotherInformations, setAnotherInformations] = useState([]);

  const fetchInformationData = async () => {
    const { response, error } = await informationApi.blog.getBlogBySlug({
      slug,
    });
    if (response) {
      setInformation(response.data);
      setTimeout(() => {
        setIsDataLoaded(true);
      }, 1000);
    }
    if (error) {
      setErrorDataLoaded(true);
      toast.error("Gagal memuat berita");
    }
  };
  const fetchAnotherInformationsData = async () => {
    const { response, error } = await informationApi.blog.getPublishedBlogs();
    if (response) {
      const filteredData = response.data.filter(
        (data) => data.artiSlug !== slug
      );
      setAnotherInformations(filteredData);
      fetchInformationData();
    }
    if (error) {
      toast.error("Gagal memuat data");
      setErrorDataLoaded(true);
    }
  };
  //
  useEffect(() => {
    if (slug) fetchAnotherInformationsData();
  }, [slug]);

  return (
    <>
      {errorDataLoaded ? (
        <NotFound />
      ) : isDataLoaded ? (
        <div className="md:mt-10">
          <div className="-mt-6">
            <SectionTitle title="INFORMASI" />
          </div>

          {information.artiStatus === "publish" ? (
            <div className="md:flex md:items-start md:gap-3">
              <div className="w-full md:w-[75%]">
                <HeaderDetailPage
                  title={information.artiTitle}
                  description={`${formatDateWithTimeToIndo(
                    information.createdAt
                  )}. Terakhir Diperbaharui pada ${formatDateWithTimeToIndo(
                    information.updatedAt
                  )}. Ditulis oleh ${information.artiPenulis}`}
                />

                <div className="mt-2 bg-white py-2 px-3">
                  <Image
                    priority
                    src={information.artiImage}
                    alt={information.artiTitle}
                    width={500}
                    height={500}
                    className="w-full object-cover"
                  />
                </div>

                <div className="mt-2 bg-white rounded py-2 px-3">
                  <p className="text-[#A0A0A0] text-sm">
                    {information.artiImageDesc}
                  </p>
                </div>

                <div className="text-sm text-justify break-words whitespace-normal">
                  <div
                    className="mt-2 bg-white rounded py-2 px-3"
                    dangerouslySetInnerHTML={{
                      __html: information.artiContent,
                    }}
                  ></div>
                </div>

                {/* BERITA LAINNYA */}
                <div className="md:hidden">
                  <SectionTitle title="BERITA LAINNYA" />

                  <div className="mt-2 flex flex-col gap-2">
                    {anotherInformations.map((information, i) => (
                      <InformationItem key={i} information={information} />
                    ))}
                  </div>
                </div>
              </div>

              {/* BERITA LAINNYA */}
              <div className="hidden md:inline md:w-[25%] md:mt-2">
                <div className="bg-white rounded py-4">
                  <p className="font-semibold text-center text-3xl">
                    BERITA LAINNYA
                  </p>
                </div>

                <div className="mt-2 flex flex-col gap-2">
                  {anotherInformations.map((information, i) => (
                    <InformationItem key={i} information={information} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <NotFound message="Berita belum dipublikasikan" />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
