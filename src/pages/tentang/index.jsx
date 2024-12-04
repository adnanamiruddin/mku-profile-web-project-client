import aboutApi from "@/api/modules/about.api";
import SectionTitle from "@/components/layouts/SectionTitle";
import HeaderDetailPage from "@/components/layouts/globals/HeaderDetailPage";
import Loading from "@/components/layouts/globals/Loading";
import NotFound from "@/components/layouts/globals/NotFound";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AOS from "aos";
import Image from "next/image";
import Pagination from "@/components/layouts/functions/Pagination";
import { Icon } from "@iconify/react";
import LoadingPagination from "@/components/layouts/globals/LoadingPagination";
import { formatDateToIndo } from "@/helpers/dateHelper";
import SearchBar from "@/components/layouts/functions/SearchBar";
import SearchButton from "@/components/layouts/functions/SearchButton";

export default function AboutPage() {
  const [profileContent, setProfileContent] = useState("");
  const [lecturers, setLecturers] = useState([]);
  const [latestDate, setLatestDate] = useState("");
  //
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorDataLoaded, setErrorDataLoaded] = useState(false);

  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loadingPagination, setLoadingPagination] = useState(false);

  // Search Data State
  const [searchQuery, setSearchQuery] = useState(null);

  const fetchProfileData = async () => {
    const { response, error } = await aboutApi.profile.getProfile();
    if (response) {
      setProfileContent(response.profilContent);
      fetchLecturersData();
    }
    if (error) {
      toast.error("Gagal memuat data profil");
      setErrorDataLoaded(true);
    }
  };
  //
  const fetchLecturersData = async () => {
    setLoadingPagination(true);
    const { response, error } = searchQuery
      ? await aboutApi.lecturer.searchLecturer({
          keyword: searchQuery,
          page,
        })
      : await aboutApi.lecturer.getAllLecturers({
          page,
        });
    if (response) {
      setLecturers(response.data);
      setTotalPage(response.pagination.lastPage);
      //
      const latestData = response.data?.reduce((latest, current) => {
        return new Date(latest.updatedAt) > new Date(current.updatedAt)
          ? latest
          : current;
      }, response.data[0]);
      setLatestDate(latestData?.updatedAt);
      //
      setTimeout(() => {
        setIsDataLoaded(true);
        setLoadingPagination(false);
      }, 1000);
    }
    if (error) {
      setErrorDataLoaded(true);
      toast.error("Gagal memuat data");
    }
  };
  //
  useEffect(() => {
    fetchProfileData();
  }, []);
  //
  useEffect(() => {
    fetchLecturersData();
  }, [page]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setPage(1); // Reset to the first page for new search
    fetchLecturersData();
  };
  //
  const handleResetSearch = () => {
    setSearchQuery(null);
    setPage(1); // Reset to the first page for new data fetch
    fetchLecturersData();
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      {errorDataLoaded ? (
        <div className="md:mt-4 overflow-x-hidden">
          {/* PROFIL */}
          <div className="-mt-6">
            <SectionTitle id="profil" title="PROFIL" />
          </div>

          {/* PEGAWAI */}
          <div className="-mt-4">
            <SectionTitle id="pegawai" title="PEGAWAI" />
          </div>

          <NotFound />
        </div>
      ) : isDataLoaded ? (
        <div className="md:mt-10">
          {/* PROFIL */}
          <div className="-mt-6">
            <SectionTitle id="profil" title="PROFIL" />
          </div>

          <div className="mt-2 bg-white rounded py-2 px-3">
            <div dangerouslySetInnerHTML={{ __html: profileContent }}></div>
          </div>

          {/* PEGAWAI */}
          <SectionTitle id="pegawai" title="PEGAWAI" />

          <HeaderDetailPage
            title="Data Dosen & Tendik"
            description={
              latestDate
                ? formatDateToIndo(latestDate)
                : "(Data dosen tidak ditemukan)"
            }
          />

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
                  {lecturers?.length > 0 ? (
                    <>
                      {lecturers.map((information, i) => (
                        <div
                          key={i}
                          className="border-t border-l border-gray-400 bg-gray-100 p-2 pt-1 w-96"
                        >
                          <HeaderDetailPage
                            title={information.dsnNama || "Nama Dosen"}
                            description={information.dsnNip || "NIP Dosen"}
                          />

                          <div className="mt-2 bg-white py-2 px-3">
                            <Image
                              src={
                                information.dsnFoto
                                  ? information.dsnFoto
                                  : "/profile-lecturer.png"
                              }
                              alt="Foto Dosen"
                              width={500}
                              height={500}
                              className="w-full h-80 object-cover"
                            />
                          </div>

                          <div className="mt-2 bg-white rounded py-2 px-3">
                            <div className="flex items-center gap-2">
                              <Icon
                                icon="hugeicons:hierarchy"
                                className="text-lg"
                              />
                              <p className="text-sm">
                                {information.dsnJabatan || "(Jabatan Dosen)"}
                              </p>
                            </div>

                            <div className="mt-3 flex items-center gap-2">
                              <Icon icon="map:university" className="text-lg" />
                              <p className="text-sm">
                                {information.dsnProdi ||
                                  "(Program Studi Dosen)"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="w-full">
                      <NotFound message="Data dosen tidak ditemukan" />
                    </div>
                  )}
                </div>

                {lecturers?.length > 0 ? (
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
          {/* PROFIL */}
          <div className="-mt-6">
            <SectionTitle id="profil" title="PROFIL" />
          </div>

          {/* PEGAWAI */}
          <div className="-mt-4">
            <SectionTitle id="pegawai" title="PEGAWAI" />
          </div>

          <Loading />
        </div>
      )}
    </>
  );
}
