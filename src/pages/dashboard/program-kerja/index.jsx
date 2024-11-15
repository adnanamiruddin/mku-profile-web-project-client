import EditButton from "@/components/layouts/functions/EditButton";
import DashboardHeader from "@/components/layouts/globals/DashboardHeader";
import EditWorkProgramModal from "@/components/layouts/modals/EditWorkProgramModal";
import Image from "next/image";
import { useState } from "react";

export default function DashboardWorkProgramPage() {
  const [workProgramPdf, setWorkProgramPdf] = useState("/pdf/sample-rps.pdf");

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>PROGRAM KERJA</DashboardHeader>

      <div className="px-10 pb-16 h-full">
        <div className="pt-4 flex justify-between items-center border-b border-gray-400 pb-4">
          <h2 className="font-bold text-2xl">Tampilan Program Kerja</h2>
          {/*  */}
          <EditButton
            onClick={() =>
              document.getElementById("edit_work_program_modal").showModal()
            }
          >
            Ubah
          </EditButton>
        </div>

        <div className="mt-6 overflow-x-auto">
          <embed
            className="w-full h-[70vh] border-none"
            src={workProgramPdf}
            type="application/pdf"
          />
        </div>
      </div>

      <EditWorkProgramModal workProgramPdf={workProgramPdf} />
    </div>
  );
}
