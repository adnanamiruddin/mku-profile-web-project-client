import SubjectDropdown from "./SubjectDropdown";

export default function SubjectItem({ title, subjects, color }) {
  return (
    <div className="mt-2 bg-white rounded py-4 px-6 flex flex-col gap-4 md:px-0 md:py-0 md:h-max md:pb-3">
      <div
        className={`hidden md:inline uppercase text-white p-6 rounded-t bg-[#${
          color === "orange" ? "F6A93D" : "14AE5C"
        }]`}
      >
        <h3 className="font-semibold text-xl text-center">{title}</h3>
      </div>
      {subjects.map((subject, i) => {
        const rpsFile = subject.mkFiles?.find((file) => file.mkfTipe === "rps");

        return (
          <SubjectDropdown
            key={i}
            title={subject.mkNama}
            slug={subject.mkSlug}
            showBorderTop={i === 0 ? false : true}
          >
            <embed
              className="w-full h-[70vh] border-none"
              src={rpsFile?.fileUrl}
              type="application/pdf"
            />
            {/*  */}
            <p className="text-center p-4">
              Jika PDF tidak muncul,{" "}
              <a
                download
                href={rpsFile?.fileUrl}
                className="text-blue-500 underline"
              >
                klik di sini untuk mengunduh PDF
              </a>
              .
            </p>
          </SubjectDropdown>
        );
      })}
    </div>
  );
}
