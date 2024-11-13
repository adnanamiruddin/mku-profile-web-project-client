import Dropdown from "@/components/layouts/Dropdown";
import SectionTitle from "@/components/layouts/SectionTitle";
import HeaderDetailPage from "@/components/layouts/globals/HeaderDetailPage";
import { dummySubjectList } from "@/data/staticData";

export default function SubjectsPage() {
  return (
    <div className="md:mt-10">
      {/* MKWU */}
      <div className="-mt-6">
        <div className="md:hidden">
          <SectionTitle title="Mata Kuliah Wajib Umum" />
        </div>
        {/*  */}
        <div className="hidden md:inline">
          <SectionTitle title="Mata Kuliah Umum" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:gap-1">
        <div className="md:hidden">
          <HeaderDetailPage
            title="10 Mata Kuliah"
            description="Bulan Oktober 2024"
          />
        </div>

        <div className="md:w-1/2">
          {dummySubjectList.map((subject, i) => (
            <>
              {subject.type === "Mata Kuliah Wajib Umum" ? (
                <div
                  key={i}
                  className="mt-2 bg-white rounded py-4 px-6 flex flex-col gap-4 md:px-0 md:py-0 md:h-max md:pb-3"
                >
                  <div className="hidden md:inline uppercase text-white p-6 rounded-t bg-[#F6A93D]">
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
              ) : null}
            </>
          ))}
        </div>

        {/* Basic Sains */}
        <div className="md:hidden">
          <SectionTitle title="Basic Sains" />
        </div>

        <div className="md:hidden">
          <HeaderDetailPage
            title="5 Mata Kuliah"
            description="Bulan Oktober 2024"
          />
        </div>

        <div className="md:w-1/2">
          {dummySubjectList.map((subject, i) => (
            <>
              {subject.type === "Basic Sains" ? (
                <div
                  key={i}
                  className="mt-2 bg-white rounded py-4 px-6 flex flex-col gap-4 md:px-0 md:py-0 md:h-max md:pb-3"
                >
                  <div className="hidden md:inline uppercase text-white p-6 rounded-t bg-[#14AE5C]">
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
              ) : null}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
