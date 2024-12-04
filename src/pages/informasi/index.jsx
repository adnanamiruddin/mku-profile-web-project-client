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
import AOS from "aos";
import SearchBar from "@/components/layouts/functions/SearchBar";
import SearchButton from "@/components/layouts/functions/SearchButton";

export default function InformationPage() {
  const [mkuMapImage, setMkuMapImage] = useState(
    "/informasi/information-placeholder.png"
  );
  const [informations, setInformations] = useState([]);
  //
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorDataLoaded, setErrorDataLoaded] = useState(false);

  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loadingPagination, setLoadingPagination] = useState(false);

  // Search Data State
  const [searchQuery, setSearchQuery] = useState(null);

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
    const { response, error } = searchQuery
      ? await informationApi.blog.searchBlogByTitle({
          title: searchQuery,
          page,
        })
      : await informationApi.blog.getAllBlogs({
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

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setPage(1); // Reset to the first page for new search
    fetchInformationsData();
  };
  //
  const handleResetSearch = () => {
    setSearchQuery(null);
    setPage(1); // Reset to the first page for new data fetch
    fetchInformationsData();
  };

  useEffect(() => {
    AOS.init();
  }, []);

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
        <div className="md:mt-4 overflow-x-hidden">
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
            data-aos="zoom-out-down"
            data-aos-delay="300"
          />

          {/* INFORMASI */}
          <SectionTitle id="berita" title="INFORMASI BERITA" />

          <div className="mt-2 w-1/2 mx-auto flex gap-2 items-center">
            <SearchBar
              placeholder="Cari berita"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSubmit={handleSearchSubmit}
              onReset={handleResetSearch}
            />
            <SearchButton
              name="searchBlogButton"
              onClick={handleSearchSubmit}
              disabled={!searchQuery}
            >
              Cari
            </SearchButton>
          </div>

          <div className="mt-2">
            {loadingPagination ? (
              <LoadingPagination />
            ) : (
              <>
                <div
                  className="flex flex-col gap-1 flex-wrap md:flex-row md:justify-center"
                  data-aos="fade-right"
                >
                  {informations?.length > 0 ? (
                    <>
                      {informations.map((information, i) => (
                        <Link
                          key={i}
                          href={`/informasi/${information.artiSlug}`}
                          className="bg-white rounded p-3 md:min-w-[33%]"
                        >
                          <Image
                            priority
                            src={
                              information.artiImage
                                ? information.artiImage
                                : "/home-image.png"
                            }
                            alt={information.artiTitle}
                            width={500}
                            height={500}
                            className="w-full h-56 rounded-t-md object-cover"
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
                    </>
                  ) : (
                    <div className="w-full">
                      <NotFound message="Berita tidak ditemukan" />
                    </div>
                  )}
                </div>

                {informations?.length > 0 ? (
                  <div className="ms-auto pe-2">
                    <Pagination
                      page={page}
                      totalPage={totalPage}
                      setPage={setPage}
                    />
                  </div>
                ) : null}
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
