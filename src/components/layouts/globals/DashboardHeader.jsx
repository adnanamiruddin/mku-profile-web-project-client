import DashboardLogo from "./DashboardLogo";

export default function DashboardHeader({ children }) {
  return (
    <>
      {/* Tab - Desktop View */}
      <div className="py-6 ps-12 pe-8 hidden md:flex justify-between items-center border-b-2 border-gray-300">
        <h1 className="text-xl font-bold">{children}</h1>
        <DashboardLogo />
      </div>

      {/* Mobile View */}
      {/* <div className="py-6 px-4 md:hidden border-b-2 border-gray-300">
        <h1 className="text-xl font-bold text-center">{children}</h1>
        <h2 className=" text-sm font-semibold text-center mt-2 uppercase">
          Semester {activeSemester}
        </h2>
      </div> */}
    </>
  );
}
