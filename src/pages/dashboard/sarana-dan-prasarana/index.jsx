import facilitiesApi from "@/api/modules/facilities.api";
import SaveButton from "@/components/layouts/functions/SaveButton";
import DashboardHeader from "@/components/layouts/globals/DashboardHeader";
import TextEditor from "@/components/layouts/TextEditor";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DashboardFacilitiesPage() {
  const [loading, setLoading] = useState(false);
  //
  const [content, setContent] = useState("");

  const handleSaveFacilities = async () => {
    setLoading(true);
    const { response, error } = await facilitiesApi.saveFacilities({
      content,
    });
    if (response) {
      toast.success("Fasilitas berhasil diperbarui");
      setLoading(false);
    }
    if (error) {
      toast.error("Gagal memperbarui fasilitas");
      setLoading(false);
    }
  };

  const fetchFacilitiesData = async () => {
    const { response, error } = await facilitiesApi.getFacilities();
    if (response) {
      setContent(response.spContent);
    }
    if (error) {
      toast.error("Gagal memuat data fasilitas");
    }
  };
  //
  useEffect(() => {
    fetchFacilitiesData();
  }, []);

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>FASILITAS</DashboardHeader>

      <div className="px-10 pb-16 h-full">
        <div className="pt-4 flex justify-between items-center border-b border-gray-400 pb-4">
          <h2 className="font-bold text-2xl">Konten Fasilitas</h2>
          {/*  */}
          <SaveButton onClick={handleSaveFacilities} disabled={loading}>
            Simpan
          </SaveButton>
        </div>

        <div className="mt-4 overflow-x-auto">
          <TextEditor content={content} setContent={setContent} />
        </div>
      </div>
    </div>
  );
}
