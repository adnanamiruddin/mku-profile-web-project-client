import informationApi from "@/api/modules/information.api";
import Pagination from "@/components/layouts/functions/Pagination";
import Loading from "@/components/layouts/globals/Loading";
import LoadingPagination from "@/components/layouts/globals/LoadingPagination";
import NotFound from "@/components/layouts/globals/NotFound";
import SectionTitle from "@/components/layouts/SectionTitle";
import { formatDateToIndo } from "@/helpers/dateHelper";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function InformationPage() {
  const [mkuMapImage, setMkuMapImage] = useState("/home-map.png");
  const [informations, setInformations] = useState([]);
  //
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorDataLoaded, setErrorDataLoaded] = useState(false);

  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loadingPagination, setLoadingPagination] = useState(false);

  const fetchMkuMapData = async () => {
    const { response, error } = await informationApi.map.getMap();
    if (response) {
      setMkuMapImage(response.fileUrl);
      fetchInformationsData();
    }
    if (error) {
      toast.error("Gagal memuat data. Silahkan muat ulang halaman");
      setErrorDataLoaded(true);
    }
  };
  //
  const fetchInformationsData = async () => {
    setLoadingPagination(true);
    const { response, error } = await informationApi.blog.getAllBlogs({
      page,
    });
    if (response) {
      const filteredData = response.data.filter(
        (data) => data.artiStatus === "publish"
      );
      setInformations(filteredData);
      setTotalPage(response.pagination.lastPage);
      setTimeout(() => {
        setIsDataLoaded(true);
        setLoadingPagination(false);
      }, 500);
    }
    if (error) {
      toast.error("Gagal memuat data. Silahkan muat ulang halaman");
      setErrorDataLoaded(true);
    }
  };
  //
  useEffect(() => {
    fetchMkuMapData();
  }, []);
  //
  useEffect(() => {
    fetchInformationsData();
  }, [page]);

  return (
    <>
      {errorDataLoaded ? (
        <div className="md:mt-10">
          {/* PETA MKU */}
          <div className="-mt-6">
            <SectionTitle id="petaMku" title="PETA MKU" />
          </div>

          {/* INFORMASI */}
          <div className="-mt-4">
            <SectionTitle id="berita" title="INFORMASI BERITA" />
          </div>

          <NotFound />
        </div>
      ) : isDataLoaded ? (
        <div className="md:mt-10">
          {/* PETA MKU */}
          <div className="-mt-6">
            <SectionTitle id="petaMku" title="PETA MKU" />
          </div>

          <Image
            priority
            src={mkuMapImage}
            alt="Peta MKU"
            width={500}
            height={500}
            className="mt-2 w-full md:h-[75vh] object-contain"
          />

          {/* INFORMASI */}
          <SectionTitle id="berita" title="INFORMASI BERITA" />

          <div className="mt-2">
            {loadingPagination ? (
              <LoadingPagination />
            ) : (
              <>
                <div className="flex flex-col gap-1 flex-wrap md:flex-row md:justify-center">
                  {informations.map((information, i) => (
                    <Link
                      key={i}
                      href={`/informasi/${information.artiSlug}`}
                      className="bg-white rounded p-3 md:min-w-[33%]"
                    >
                      <Image
                        priority
                        src={information.artiImage}
                        alt={information.artiTitle}
                        width={500}
                        height={500}
                        className="w-full rounded-t-md md:h-80 object-cover"
                      />
                      {/*  */}
                      <div className="py-4">
                        <h6 className="font-semibold break-words">
                          {information.artiTitle}
                        </h6>
                        <p className="mt-1.5 text-gray-400 text-sm flex items-center gap-1">
                          {formatDateToIndo(information.createdAt)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="ms-auto pe-2">
                  <Pagination
                    page={page}
                    totalPage={totalPage}
                    setPage={setPage}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="md:mt-10">
          {/* PETA MKU */}
          <div className="-mt-6">
            <SectionTitle id="petaMku" title="PETA MKU" />
          </div>

          {/* INFORMASI */}
          <div className="-mt-4">
            <SectionTitle id="berita" title="INFORMASI BERITA" />
          </div>

          <Loading />
        </div>
      )}
    </>
  );
}
