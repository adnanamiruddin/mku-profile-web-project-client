import workProgramApi from "@/api/modules/workProgram.api";
import SaveButton from "@/components/layouts/functions/SaveButton";
import DashboardHeader from "@/components/layouts/globals/DashboardHeader";
import TextEditor from "@/components/layouts/TextEditor";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DashboardWorkProgramPage() {
  const [loading, setLoading] = useState(false);
  //
  const [content, setContent] = useState("");

  const handleSaveWorkProgram = async () => {
    setLoading(true);
    const { response, error } = await workProgramApi.saveWorkProgram({
      content,
    });
    if (response) {
      toast.success("Program kerja berhasil diperbarui");
      setLoading(false);
    }
    if (error) {
      toast.error("Gagal memperbarui program kerja");
      setLoading(false);
    }
  };

  const fetchWorkProgramData = async () => {
    const { response, error } = await workProgramApi.getWorkProgram();
    if (response) {
      setContent(response.pkContent);
    }
    if (error) {
      toast.error("Gagal memuat data program kerja");
    }
  };
  //
  useEffect(() => {
    fetchWorkProgramData();
  }, []);

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>PROGRAM KERJA</DashboardHeader>

      <div className="px-10 pb-16 h-full">
        <div className="pt-4 flex justify-between items-center border-b border-gray-400 pb-4">
          <h2 className="font-bold text-2xl">Konten Program Kerja</h2>
          {/*  */}
          <SaveButton
            name="saveWorkProgramButton"
            onClick={handleSaveWorkProgram}
            disabled={loading}
          >
            Simpan
          </SaveButton>
        </div>

        <div className="mt-4 overflow-x-auto">
          <TextEditor
            id="workProgramTextEditor"
            content={content}
            setContent={setContent}
          />
        </div>
      </div>
    </div>
  );
}
