import Input from "@/components/layouts/functions/Input";
import SaveButton from "@/components/layouts/functions/SaveButton";
import DashboardHeader from "@/components/layouts/globals/DashboardHeader";
import HeaderDetailPage from "@/components/layouts/globals/HeaderDetailPage";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import UploadFileField from "@/components/layouts/functions/UploadFileField";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import aboutApi from "@/api/modules/about.api";

export default function DashboardAddLecturerPage() {
  const router = useRouter();
  const { editLecturerId, editLecturerNip } = router.query;

  const [loading, setLoading] = useState(false);
  //
  const [imageUpload, setImageUpload] = useState(null);

  const handleCreateLecturerData = async ({ values, imageUpload }) => {
    const { response, error } = await aboutApi.lecturer.createLecturerData({
      name: values.name,
      nip: values.nip,
      position: values.position,
      studyProgram: values.studyProgram,
    });
    if (response) {
      const uploadResult = await handleUploadBlogImage({
        nip: values.nip,
        image: imageUpload,
      });
      if (uploadResult.success) {
        toast.success("Data dosen berhasil dibuat");
        router.push("/dashboard/tentang/pegawai");
      } else {
        toast.error(uploadResult.errorMessage);
      }
    }
    if (error) {
      toast.error(error.message || "Gagal membuat data dosen");
    }
  };
  //
  const handleUpdateBlog = async ({ values, imageUpload }) => {
    const { response, error } = await aboutApi.lecturer.updateLecturerData({
      lecturerId: editLecturerId,
      name: values.name,
      nip: values.nip,
      position: values.position,
      studyProgram: values.studyProgram,
    });
    if (response) {
      if (imageUpload && imageUpload instanceof File) {
        const uploadResult = await handleUploadBlogImage({
          nip: values.nip,
          image: imageUpload,
        });
        if (uploadResult.success) {
          toast.success("Data dosen berhasil diperbarui");
          router.push("/dashboard/tentang/pegawai");
        } else {
          toast.error(uploadResult.errorMessage);
        }
      } else {
        toast.success("Data dosen berhasil diperbarui");
        router.push("/dashboard/tentang/pegawai");
      }
    }
    if (error) {
      toast.error(error.message || "Gagal memperbarui data dosen");
    }
  };
  //
  const handleUploadBlogImage = async ({ nip, image }) => {
    if (!image) return { success: true };
    const { response } = await aboutApi.lecturer.uploadLecturerPhoto({
      nip,
      image,
    });
    if (response) return { success: true };
    return { success: false, errorMessage: "Gagal mengunggah gambar" };
  };

  const addDataForm = useFormik({
    initialValues: {
      name: "",
      nip: "",
      position: "",
      studyProgram: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nama dosen wajib diisi"),
      nip: Yup.string().required("NIP dosen wajib diisi"),
      position: Yup.string().required("Jabatan dosen wajib diisi"),
      studyProgram: Yup.string().required("Kontak dosen wajib diisi"),
    }),
    onSubmit: async (values) => {
      if (loading) return;
      setLoading(true);

      try {
        if (!editLecturerId && !editLecturerNip) {
          // CREATE MODE
          await handleCreateLecturerData({ values, imageUpload });
        } else {
          // EDIT MODE
          await handleUpdateBlog({ values, imageUpload });
        }
      } finally {
        setLoading(false);
      }
    },
  });

  // EDIT MODE
  const fetchLecturerData = async () => {
    const { response, error } = await aboutApi.lecturer.getLecturerByNip({
      nip: editLecturerNip,
    });
    const existingLecturerData = response?.data;
    if (response) {
      addDataForm.setValues({
        name: existingLecturerData.dsnNama,
        nip: existingLecturerData.dsnNip,
        position: existingLecturerData.dsnJabatan,
        studyProgram: existingLecturerData.dsnProdi,
      });
      setImageUpload(existingLecturerData.dsnFoto);
    }
    if (error) {
      toast.error("Gagal memuat data dosen");
    }
  };
  //
  useEffect(() => {
    if (editLecturerId && editLecturerNip) fetchLecturerData();
  }, [editLecturerId, editLecturerNip]);

  const [previewVisible, setPreviewVisible] = useState(true);
  //
  const togglePreview = () => {
    setPreviewVisible((prev) => !prev);
  };

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>PEGAWAI</DashboardHeader>

      <div className="px-10 pb-16 h-full">
        <div className="pt-4 flex justify-between items-center border-b border-gray-400 pb-4">
          <h2 className="font-bold text-2xl">Form Data Pegawai</h2>
          {/*  */}
          <SaveButton
            name="saveLecturerDataButton"
            onClick={addDataForm.handleSubmit}
            disabled={loading}
          >
            Simpan
          </SaveButton>
        </div>

        <div className="mt-6 overflow-x-auto">
          <div className="grid grid-cols-3 gap-4">
            <div
              className={`flex flex-col gap-6 ${
                !previewVisible ? "col-span-3" : "col-span-2"
              }`}
            >
              <Input
                clearAutoMargin
                label="Nama Dosen"
                placeholder="Masukkan nama dosen..."
                name="name"
                value={addDataForm.values.name}
                onChange={addDataForm.handleChange}
                error={
                  addDataForm.touched.name &&
                  addDataForm.errors.name !== undefined
                }
                helperText={addDataForm.touched.name && addDataForm.errors.name}
              />

              <Input
                clearAutoMargin
                label="NIP Dosen"
                placeholder="Masukkan nip dosen..."
                name="nip"
                value={addDataForm.values.nip}
                onChange={addDataForm.handleChange}
                error={
                  addDataForm.touched.nip &&
                  addDataForm.errors.nip !== undefined
                }
                helperText={addDataForm.touched.nip && addDataForm.errors.nip}
              />

              <Input
                clearAutoMargin
                label="Jabatan Dosen"
                placeholder="Masukkan jabatan dosen..."
                name="position"
                value={addDataForm.values.position}
                onChange={addDataForm.handleChange}
                error={
                  addDataForm.touched.position &&
                  addDataForm.errors.position !== undefined
                }
                helperText={
                  addDataForm.touched.position && addDataForm.errors.position
                }
              />

              <Input
                clearAutoMargin
                label="Program Studi Dosen"
                placeholder="Masukkan program studi dosen..."
                name="studyProgram"
                value={addDataForm.values.studyProgram}
                onChange={addDataForm.handleChange}
                error={
                  addDataForm.touched.studyProgram &&
                  addDataForm.errors.studyProgram !== undefined
                }
                helperText={
                  addDataForm.touched.studyProgram &&
                  addDataForm.errors.studyProgram
                }
              />

              <UploadFileField
                name="imageUpload"
                clearAutoMargin
                label="Foto Dosen"
                onChange={(e) => {
                  setImageUpload(e.target.files[0]);
                }}
              />
            </div>

            <div>
              <div
                className={`flex items-center gap-2
                ${previewVisible ? "" : "mt-4 pt-4 border-t-2 border-gray-400"}
                `}
              >
                <h3 className="mb-3 font-semibold text-lg">Preview</h3>
                <Icon
                  icon={
                    previewVisible
                      ? "akar-icons:chevron-down"
                      : "akar-icons:chevron-right"
                  }
                  className="mb-2 cursor-pointer"
                  onClick={togglePreview}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={
                  previewVisible
                    ? { opacity: 1, height: "auto" }
                    : { opacity: 0, height: 0 }
                }
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="border-t border-l border-gray-400 bg-gray-100 p-2 pt-1">
                  <HeaderDetailPage
                    title={addDataForm.values.name || "Nama Dosen"}
                    description={addDataForm.values.nip || "NIP Dosen"}
                  />

                  <div className="mt-2 bg-white py-2 px-3">
                    <Image
                      src={
                        imageUpload && imageUpload instanceof File
                          ? URL.createObjectURL(imageUpload)
                          : imageUpload
                          ? imageUpload
                          : "/informasi/information-placeholder.png"
                      }
                      alt="Foto Dosen"
                      width={500}
                      height={500}
                      className="w-full h-80 object-cover"
                    />
                  </div>

                  <div className="mt-2 bg-white rounded py-2 px-3">
                    <div className="flex items-center gap-2">
                      <Icon icon="hugeicons:hierarchy" className="text-lg" />
                      <p className="text-sm">
                        {addDataForm.values.position || "Jabatan Dosen"}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <Icon icon="map:university" className="text-lg" />
                      <p className="text-sm">
                        {addDataForm.values.studyProgram ||
                          "Program Studi Dosen"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
