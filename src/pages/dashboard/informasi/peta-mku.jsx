import EditButton from "@/components/layouts/functions/EditButton";
import DashboardHeader from "@/components/layouts/globals/DashboardHeader";
import EditMkuMapModal from "@/components/layouts/modals/EditMkuMapModal";
import Image from "next/image";
import { useState } from "react";

export default function DashboardMkuMapPage() {
  const [mkuMapImage, setMkuMapImage] = useState("/home-map.png");

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>PETA MKU</DashboardHeader>

      <div className="px-10 pb-16 h-full">
        <div className="pt-4 flex justify-between items-center border-b border-gray-400 pb-4">
          <h2 className="font-bold text-2xl">Tampilan Peta MKU</h2>
          {/*  */}
          <EditButton
            onClick={() =>
              document.getElementById("edit_mku_map_modal").showModal()
            }
          >
            Ubah
          </EditButton>
        </div>

        <div className="mt-6 overflow-x-auto">
          <Image
            priority
            src={mkuMapImage}
            alt="Peta MKU"
            width={500}
            height={500}
            className="mt-2 w-full h-[75vh] object-contain"
          />
        </div>
      </div>

      <EditMkuMapModal mkuMapImage={mkuMapImage} />
    </div>
  );
}
