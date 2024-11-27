import SaveButton from "@/components/layouts/functions/SaveButton";
import DashboardHeader from "@/components/layouts/globals/DashboardHeader";
import TextEditor from "@/components/layouts/TextEditor";
import { useState } from "react";

export default function DashboardLecturerPage() {
  const [content, setContent] = useState("");

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>PEGAWAI</DashboardHeader>

      <div className="px-10 pb-16 h-full">
        <div className="pt-4 flex justify-between items-center border-b border-gray-400 pb-4">
          <h2 className="font-bold text-2xl">Pegawai</h2>
          {/*  */}
          <SaveButton onClick={() => {}}>Simpan</SaveButton>
        </div>

        <div className="mt-6 overflow-x-auto">
          <div className="grid grid-cols-2 gap-4">
            <TextEditor
              label="Konten"
              content={content}
              setContent={setContent}
            />

            <div>
              <h3 className="mb-3 font-semibold text-lg">Preview</h3>

              <div className="border-t border-l border-gray-400 bg-gray-100 p-2">
                <div className="text-sm text-justify break-words whitespace-normal">
                  <div className="my-1 bg-white rounded py-2 px-3 min-h-24">
                    {content !== "" ? (
                      <div dangerouslySetInnerHTML={{ __html: content }}></div>
                    ) : (
                      "Pegawai..."
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
