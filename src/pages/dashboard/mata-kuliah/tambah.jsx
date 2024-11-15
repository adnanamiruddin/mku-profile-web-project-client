import Input from "@/components/layouts/functions/Input";
import SaveButton from "@/components/layouts/functions/SaveButton";
import TextArea from "@/components/layouts/functions/TextArea";
import DashboardHeader from "@/components/layouts/globals/DashboardHeader";
import HeaderDetailPage from "@/components/layouts/globals/HeaderDetailPage";
import TextEditor from "@/components/layouts/TextEditor";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";
import UploadFileField from "@/components/layouts/functions/UploadFileField";
import { useRouter } from "next/router";

export default function DashboardAddSubjectPage() {
  const router = useRouter();
  const { edit } = router.query;

  const [rpsDocument, setRpsDocument] = useState(null);
  const [lecturerDocument, setLecturerDocument] = useState(null);
  const [scheduleDocument, setScheduleDocument] = useState(null);
  const [monitoringDocument, setMonitoringDocument] = useState(null);
  const [evaluationDocument, setEvaluationDocument] = useState(null);

  const todayOnFormat = format(new Date(), "eeee, d MMMM yyyy", {
    locale: id,
  });

  const addDataForm = useFormik({
    initialValues: {
      subjectName: "",
      subjectCategory: "",
    },
    validationSchema: Yup.object({
      subjectName: Yup.string().required("Nama Mata Kuliah harus diisi"),
      subjectCategory: Yup.string().required(
        "Kategori Mata Kuliah harus diisi"
      ),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  // EDIT MODE
  useEffect(() => {
    if (edit) {
      addDataForm.setValues({
        subjectName: "Nama Mata Kuliah Edit",
        subjectCategory: "Kategori Mata Kuliah Edit",
      });
    }
  }, [edit]);

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>MATA KULIAH</DashboardHeader>

      <div className="px-10 pb-16">
        <div className="pt-4 flex justify-between items-center border-b border-gray-400 pb-4">
          <h2 className="font-bold text-2xl">Tambah Mata Kuliah</h2>
          {/*  */}
          <SaveButton onClick={() => {}}>Simpan</SaveButton>
        </div>

        <div className="mt-6 overflow-x-auto bg-gray-100 h-full p-3">
          <div className="bg-white rounded p-6 flex flex-col justify-center items-center gap-3">
            <div>
              <input
                type="text"
                name="subjectName"
                value={addDataForm.values.subjectName}
                onChange={addDataForm.handleChange}
                placeholder="Masukkan Nama Mata Kuliah"
                className="text-2xl font-semibold text-center bg-transparent border-none outline-none w-full"
              />

              <input
                type="text"
                name="subjectCategory"
                value={addDataForm.values.subjectCategory}
                onChange={addDataForm.handleChange}
                placeholder="Masukkan Kategori Mata Kuliah"
                className="text-base text-center mt-4 bg-transparent border-none outline-none w-full"
              />
            </div>

            <UploadFileField
              onlyPdf
              label="RPS"
              onChange={(e) => setRpsDocument(e.target.files[0])}
            />

            <UploadFileField
              onlyPdf
              label="Dosen Pengampu"
              onChange={(e) => setLecturerDocument(e.target.files[0])}
            />

            <UploadFileField
              onlyPdf
              label="Jadwal Perkuliahan"
              onChange={(e) => setScheduleDocument(e.target.files[0])}
            />

            <UploadFileField
              onlyPdf
              label="Monitoring Perkuliahan"
              onChange={(e) => setMonitoringDocument(e.target.files[0])}
            />

            <UploadFileField
              onlyPdf
              label="Evaluasi Perkuliahan"
              onChange={(e) => setEvaluationDocument(e.target.files[0])}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
