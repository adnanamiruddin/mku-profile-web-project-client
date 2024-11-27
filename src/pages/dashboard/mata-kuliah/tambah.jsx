import SaveButton from "@/components/layouts/functions/SaveButton";
import DashboardHeader from "@/components/layouts/globals/DashboardHeader";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import UploadFileField from "@/components/layouts/functions/UploadFileField";
import { useRouter } from "next/router";
import InputWithSelect from "@/components/layouts/functions/InputWithSelect";
import subjectApi from "@/api/modules/subject.api";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

const PreviewDocument = ({ document }) => {
  return (
    <>
      {document ? (
        <div className="collapse -ms-4">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            <div className="flex items-center gap-2">
              <p>Preview</p>
              <Icon icon="akar-icons:chevron-down" className="cursor-pointer" />
            </div>
          </div>
          <div className="collapse-content">
            <div>
              <embed
                className="w-full h-[70vh] border-none mt-2"
                src={
                  document && document instanceof File
                    ? URL.createObjectURL(document)
                    : document
                }
                type="application/pdf"
              />
              {/*  */}
              <p className="text-center p-4">
                Jika PDF tidak muncul,{" "}
                <a
                  download
                  href={
                    document && document instanceof File
                      ? URL.createObjectURL(document)
                      : document
                  }
                  className="text-blue-500 underline"
                >
                  klik di sini untuk mengunduh PDF
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default function DashboardAddSubjectPage() {
  const router = useRouter();
  const { editSubjectId, editSubjectSlug } = router.query;

  const [loading, setLoading] = useState(false);
  //
  const [rpsDocument, setRpsDocument] = useState(null);
  const [lecturerDocument, setLecturerDocument] = useState(null);
  const [scheduleDocument, setScheduleDocument] = useState(null);
  const [monitoringDocument, setMonitoringDocument] = useState(null);
  const [evaluationDocument, setEvaluationDocument] = useState(null);

  const addDataForm = useFormik({
    initialValues: {
      name: "",
      slug: "",
      category: 1,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Nama mata kuliah harus diisi")
        .min(2, "Nama mata kuliah minimal 2 karakter")
        .max(255, "Nama mata kuliah maksimal 255 karakter")
        .matches(
          /^(?!\s*$).+/,
          "Nama mata kuliah tidak boleh hanya mata kuliah spasi"
        )
        .matches(/^(?!\d+$).+/, "Nama mata kuliah tidak boleh hanya angka")
        .matches(
          /^(?!\W+$).+/,
          "Nama mata kuliah tidak boleh hanya karakter spesial"
        )
        // Nama mata kuliah tidak boleh ada "&" karena akan merusak URL
        .test(
          "no-ampersand",
          "Nama mata kuliah tidak boleh mengandung karakter '&'",
          (value) => {
            return !value || !value.includes("&");
          }
        ),
      slug: Yup.string().required("Slug mata kuliah harus"),
      category: Yup.string().required("Kategori mata kuliah harus diisi"),
    }),
    onSubmit: async (values) => {
      if (!rpsDocument) {
        toast.error("RPS mata kuliah harus diunggah");
        return;
      }

      if (loading) return;
      setLoading(true);

      let isSuccessfulSubmit = false;

      const { response, error } =
        !editSubjectId && !editSubjectSlug
          ? // CREATE MODE
            await subjectApi.createSubject({
              name: values.name,
              slug: values.slug,
              category: parseInt(values.category),
              description: "",
            })
          : // EDIT MODE
            await subjectApi.updateSubject({
              subjectId: editSubjectId,
              name: values.name,
              slug: values.slug,
              category: parseInt(values.category),
              description: "",
            });
      if (response) {
        isSuccessfulSubmit = true;

        if (rpsDocument && rpsDocument instanceof File) {
          const { response: uploadRpsResponse, error: uploadRpsError } =
            await subjectApi.uploadSubjectRps({
              slug: values.slug,
              rpsDocument,
            });
          if (uploadRpsResponse) isSuccessfulSubmit = true;
          if (uploadRpsError) isSuccessfulSubmit = false;
        }

        if (lecturerDocument && lecturerDocument instanceof File) {
          const {
            response: uploadLecturerResponse,
            error: uploadLecturerError,
          } = await subjectApi.uploadSubjectLecturer({
            slug: values.slug,
            lecturerDocument,
          });
          if (uploadLecturerResponse) isSuccessfulSubmit = true;
          if (uploadLecturerError) isSuccessfulSubmit = false;
        }

        if (scheduleDocument && scheduleDocument instanceof File) {
          const {
            response: uploadScheduleResponse,
            error: uploadScheduleError,
          } = await subjectApi.uploadSubjectSchedule({
            slug: values.slug,
            scheduleDocument,
          });
          if (uploadScheduleResponse) isSuccessfulSubmit = true;
          if (uploadScheduleError) isSuccessfulSubmit = false;
        }

        if (monitoringDocument && monitoringDocument instanceof File) {
          const {
            response: uploadMonitoringResponse,
            error: uploadMonitoringError,
          } = await subjectApi.uploadSubjectMonitoring({
            slug: values.slug,
            monitoringDocument,
          });
          if (uploadMonitoringResponse) isSuccessfulSubmit = true;
          if (uploadMonitoringError) isSuccessfulSubmit = false;
        }

        if (evaluationDocument && evaluationDocument instanceof File) {
          const {
            response: uploadEvaluationResponse,
            error: uploadEvaluationError,
          } = await subjectApi.uploadSubjectEvaluation({
            slug: values.slug,
            evaluationDocument,
          });
          if (uploadEvaluationResponse) isSuccessfulSubmit = true;
          if (uploadEvaluationError) isSuccessfulSubmit = false;
        }

        if (isSuccessfulSubmit) {
          toast.success(
            `Mata kuliah berhasil ${
              !editSubjectId ? "ditambahkan" : "diperbarui"
            }`
          );
          router.push("/dashboard/mata-kuliah");
          setLoading(false);
        } else {
          toast.error(
            `Gagal ${
              !editSubjectId ? "menambahkan" : "memperbarui"
            } mata kuliah`
          );
          setLoading(false);
        }
      }
      if (error) {
        toast.error(
          `Gagal ${!editSubjectId ? "menambahkan" : "memperbarui"} mata kuliah`
        );
        setLoading(false);
      }
    },
  });

  // SLUG GENERATOR
  useEffect(() => {
    const title = addDataForm.values.name;
    const titleToSlug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    addDataForm.setFieldValue("slug", titleToSlug);
  }, [addDataForm.values.name]);

  // EDIT MODE
  const fetchSubjectData = async () => {
    const { response, error } = await subjectApi.getSubjectBySlug({
      slug: editSubjectSlug,
    });
    if (response) {
      addDataForm.setValues({
        name: response.mkNama,
        slug: response.mkSlug,
        category: response.mkTipe,
      });
      const files = response.mkFiles;
      setRpsDocument(files.find((file) => file.mkfTipe === "rps")?.fileUrl);
      setLecturerDocument(
        files.find((file) => file.mkfTipe === "lecturer")?.fileUrl
      );
      setScheduleDocument(
        files.find((file) => file.mkfTipe === "schedule")?.fileUrl
      );
      setMonitoringDocument(
        files.find((file) => file.mkfTipe === "monitoring")?.fileUrl
      );
      setEvaluationDocument(
        files.find((file) => file.mkfTipe === "evaluation")?.fileUrl
      );
    }
    if (error) {
      toast.error("Gagal memuat mata kuliah");
    }
  };
  //
  useEffect(() => {
    if (editSubjectId && editSubjectSlug) fetchSubjectData();
  }, [editSubjectId, editSubjectSlug]);

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>MATA KULIAH</DashboardHeader>

      <div className="px-10 pb-16">
        <div className="pt-4 flex justify-between items-center border-b border-gray-400 pb-4">
          <h2 className="font-bold text-2xl">Tambah Mata Kuliah</h2>
          {/*  */}
          <SaveButton onClick={addDataForm.handleSubmit} disabled={loading}>
            Simpan
          </SaveButton>
        </div>

        <div className="mt-6 overflow-x-auto bg-gray-100 h-full p-3">
          <div className="bg-white rounded p-6 flex flex-col justify-center items-center gap-3">
            <div>
              <input
                type="text"
                name="name"
                value={addDataForm.values.name}
                onChange={addDataForm.handleChange}
                placeholder="Masukkan Nama Mata Kuliah"
                className="text-2xl font-semibold text-center bg-transparent border-none outline-none w-full"
              />

              <input
                type="text"
                name="slug"
                value={addDataForm.values.slug}
                onChange={addDataForm.handleChange}
                placeholder="Masukkan Kategori Mata Kuliah"
                className="text-base text-center mt-4 bg-transparent border-none outline-none w-full"
              />

              <div className="mt-4">
                <InputWithSelect
                  placeholder="Pilih kategori"
                  options={[
                    { name: "Basic Sains", value: 1 },
                    { name: "Mata Kuliah Wajib Umum", value: 2 },
                  ]}
                  name="category"
                  value={addDataForm.values.category}
                  onChange={addDataForm.handleChange}
                  error={
                    addDataForm.touched.category &&
                    addDataForm.errors.category !== undefined
                  }
                  helperText={
                    addDataForm.touched.category && addDataForm.errors.category
                  }
                />
              </div>
            </div>

            <div className="w-full">
              <UploadFileField
                onlyPdf
                label="RPS"
                onChange={(e) => setRpsDocument(e.target.files[0])}
              />
              {/*  */}
              <PreviewDocument document={rpsDocument} />
            </div>

            <div className="w-full">
              <UploadFileField
                onlyPdf
                label="Dosen Pengampu"
                onChange={(e) => setLecturerDocument(e.target.files[0])}
              />
              {/*  */}
              <PreviewDocument document={lecturerDocument} />
            </div>

            <div className="w-full">
              <UploadFileField
                onlyPdf
                label="Jadwal Perkuliahan"
                onChange={(e) => setScheduleDocument(e.target.files[0])}
              />
              {/*  */}
              <PreviewDocument document={scheduleDocument} />
            </div>

            <div className="w-full">
              <UploadFileField
                onlyPdf
                label="Monitoring Perkuliahan"
                onChange={(e) => setMonitoringDocument(e.target.files[0])}
              />
              {/*  */}
              <PreviewDocument document={monitoringDocument} />
            </div>

            <div className="w-full">
              <UploadFileField
                onlyPdf
                label="Evaluasi Perkuliahan"
                onChange={(e) => setEvaluationDocument(e.target.files[0])}
              />
              {/*  */}
              <PreviewDocument document={evaluationDocument} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
