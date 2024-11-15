import Dropdown from "@/components/layouts/SubjectDropdown";
import SectionTitle from "@/components/layouts/SectionTitle";
import SubjectItem from "@/components/layouts/SubjectItem";
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
                <SubjectItem key={i} subject={subject} color="orange" />
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
                <SubjectItem key={i} subject={subject} color="green" />
              ) : null}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
