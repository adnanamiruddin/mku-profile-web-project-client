import SubjectDropdown from "./SubjectDropdown";

export default function SubjectItem({ subject, color }) {
  return (
    <div className="mt-2 bg-white rounded py-4 px-6 flex flex-col gap-4 md:px-0 md:py-0 md:h-max md:pb-3">
      <div
        className={`hidden md:inline uppercase text-white p-6 rounded-t bg-[#${
          color === "orange" ? "F6A93D" : "14AE5C"
        }]`}
      >
        <h3 className="font-semibold text-xl text-center">{subject.type}</h3>
      </div>
      {subject.subjects.map((subject, i) => (
        <SubjectDropdown
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
            <a download href={subject.file} className="text-blue-500 underline">
              klik di sini untuk mengunduh PDF
            </a>
            .
          </p>
        </SubjectDropdown>
      ))}
    </div>
  );
}
