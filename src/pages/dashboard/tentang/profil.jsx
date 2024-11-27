import aboutApi from "@/api/modules/about.api";
import SaveButton from "@/components/layouts/functions/SaveButton";
import DashboardHeader from "@/components/layouts/globals/DashboardHeader";
import TextEditor from "@/components/layouts/TextEditor";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DashboardProfilePage() {
  const [loading, setLoading] = useState(false);
  //
  const [content, setContent] = useState("");

  const handleSaveProfile = async () => {
    setLoading(true);
    const { response, error } = await aboutApi.profile.saveProfile({
      content,
    });
    if (response) {
      toast.success("Profil berhasil diperbarui");
      setLoading(false);
    }
    if (error) {
      toast.error("Gagal memperbarui profil");
      setLoading(false);
    }
  };

  const fetchProfileData = async () => {
    const { response, error } = await aboutApi.profile.getProfile();
    if (response) {
      setContent(response.profilContent);
    }
    if (error) {
      toast.error("Gagal memuat data profil");
    }
  };
  //
  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>PROFIL</DashboardHeader>

      <div className="px-10 pb-16 h-full">
        <div className="pt-4 flex justify-between items-center border-b border-gray-400 pb-4">
          <h2 className="font-bold text-2xl">Konten Profil</h2>
          {/*  */}
          <SaveButton onClick={handleSaveProfile} disabled={loading}>
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
