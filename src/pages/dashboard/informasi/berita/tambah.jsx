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

export default function DashboardAddInformationPage() {
  const [imageUpload, setImageUpload] = useState(null);
  const [content, setContent] = useState("");

  const todayOnFormat = format(new Date(), "eeee, d MMMM yyyy", {
    locale: id,
  });

  const addDataForm = useFormik({
    initialValues: {
      title: "",
      slug: "",
      author: "",
      description: "",
      content: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Judul harus diisi"),
      slug: Yup.string().required("Slug harus diisi"),
      author: Yup.string().required("Penulis harus diisi"),
      description: Yup.string().required("Deskripsi harus diisi"),
      content: Yup.string().required("Konten harus diisi"),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    const title = addDataForm.values.title;
    const titleToSlug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    addDataForm.setFieldValue("slug", titleToSlug);
  }, [addDataForm.values.title]);

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>BERITA</DashboardHeader>

      <div className="px-10 pb-16 h-full">
        <div className="pt-4 flex justify-between items-center border-b border-gray-400 pb-4">
          <h2 className="font-bold text-2xl">Buat Berita</h2>
          {/*  */}
          <SaveButton onClick={() => {}}>Simpan</SaveButton>
        </div>

        <div className="mt-6 overflow-x-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-6">
              <Input
                clearAutoMargin
                label="Judul"
                placeholder="Masukkan judul berita..."
                name="title"
                value={addDataForm.values.title}
                onChange={addDataForm.handleChange}
                error={
                  addDataForm.touched.title &&
                  addDataForm.errors.title !== undefined
                }
                helperText={
                  addDataForm.touched.title && addDataForm.errors.title
                }
              />

              <Input
                clearAutoMargin
                disabled
                label="Slug (URL Berita)"
                placeholder="Masukkan judul berita di atas..."
                name="slug"
                value={addDataForm.values.slug}
                onChange={addDataForm.handleChange}
                error={
                  addDataForm.touched.slug &&
                  addDataForm.errors.slug !== undefined
                }
                helperText={addDataForm.touched.slug && addDataForm.errors.slug}
              />

              <Input
                clearAutoMargin
                label="Penulis"
                placeholder="Masukkan penulis..."
                name="author"
                value={addDataForm.values.author}
                onChange={addDataForm.handleChange}
                error={
                  addDataForm.touched.author &&
                  addDataForm.errors.author !== undefined
                }
                helperText={
                  addDataForm.touched.author && addDataForm.errors.author
                }
              />

              <UploadFileField
                clearAutoMargin
                label="Sampul Berita"
                onChange={(e) => {
                  setImageUpload(e.target.files[0]);
                }}
              />

              <TextArea
                clearAutoMargin
                rows={4}
                label="Deskripsi Sampul"
                placeholder="Masukkan deskripsi sampul..."
                name="description"
                value={addDataForm.values.description}
                onChange={addDataForm.handleChange}
                error={
                  addDataForm.touched.description &&
                  addDataForm.errors.description !== undefined
                }
                helperText={
                  addDataForm.touched.description &&
                  addDataForm.errors.description
                }
              />

              <TextEditor
                label="Konten"
                content={content}
                setContent={setContent}
              />
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-lg">Preview</h3>

              <div className="border-t border-l border-gray-400 bg-gray-100 p-2 pt-1">
                <HeaderDetailPage
                  title={addDataForm.values.title || "Judul Berita"}
                  description={`${todayOnFormat}. Ditulis oleh ${
                    addDataForm.values.author || "Penulis"
                  }`}
                />

                <div className="mt-2 bg-white py-2 px-3">
                  <Image
                    src={
                      imageUpload
                        ? URL.createObjectURL(imageUpload)
                        : "/informasi/information-placeholder.png"
                    }
                    alt="Sampul"
                    width={500}
                    height={500}
                    className="w-full object-cover"
                  />
                </div>

                <div className="mt-2 bg-white rounded py-2 px-3">
                  <p className="text-[#A0A0A0] text-sm">
                    {addDataForm.values.description || "Deskripsi Sampul"}
                  </p>
                </div>

                <div className="text-sm text-justify break-words whitespace-normal">
                  <div className="mt-2 bg-white rounded py-2 px-3">
                    {content !== "" ? (
                      <div dangerouslySetInnerHTML={{ __html: content }}></div>
                    ) : (
                      "Konten berita..."
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
