import Dropdown from "@/components/layouts/Dropdown";
import SectionTitle from "@/components/layouts/SectionTitle";
import HeaderDetailPage from "@/components/layouts/globals/HeaderDetailPage";
import { subjectList } from "@/data/staticData";

export default function SubjectsPage() {
  return (
    <div>
      {/* MKWU */}
      <div className="-mt-6">
        <SectionTitle title="Mata Kuliah Wajib Umum" />
      </div>

      <HeaderDetailPage
        title="10 Mata Kuliah"
        description="Bulan Oktober 2024"
      />

      {subjectList.map((subject, i) => (
        <>
          {subject.type === "Mata Kuliah Wajib Umum" ? (
            <div
              key={i}
              className="mt-2 bg-white rounded py-4 px-6 flex flex-col gap-4"
            >
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
          ) : null}
        </>
      ))}

      {/* Basic Sains */}
      <SectionTitle title="Basic Sains" />

      <HeaderDetailPage
        title="5 Mata Kuliah"
        description="Bulan Oktober 2024"
      />

      {subjectList.map((subject, i) => (
        <>
          {subject.type === "Basic Sains" ? (
            <div
              key={i}
              className="mt-2 bg-white rounded py-4 px-6 flex flex-col gap-4"
            >
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
          ) : null}
        </>
      ))}
    </div>
  );
}
