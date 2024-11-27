import Input from "@/components/layouts/functions/Input";
import SaveButton from "@/components/layouts/functions/SaveButton";
import TextArea from "@/components/layouts/functions/TextArea";
import DashboardHeader from "@/components/layouts/globals/DashboardHeader";
import HeaderDetailPage from "@/components/layouts/globals/HeaderDetailPage";
import TextEditor from "@/components/layouts/TextEditor";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import UploadFileField from "@/components/layouts/functions/UploadFileField";
import { useRouter } from "next/router";
import InputWithSelect from "@/components/layouts/functions/InputWithSelect";
import informationApi from "@/api/modules/information.api";
import { toast } from "react-toastify";
import { formatDateToIndo } from "@/helpers/dateHelper";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function DashboardAddInformationPage() {
  const router = useRouter();
  const { editBlogId, editBlogSlug } = router.query;

  const [loading, setLoading] = useState(false);
  //
  const [imageUpload, setImageUpload] = useState(null);
  const [content, setContent] = useState("");

  const todayOnFormat = formatDateToIndo(new Date());

  const handleCreateBlog = async ({ values, content, imageUpload }) => {
    const { response, error } = await informationApi.blog.createBlog({
      title: values.title,
      slug: values.slug,
      status: parseInt(values.status),
      author: values.author,
      imageDesc: values.imageDesc,
      content,
    });
    if (response) {
      const uploadResult = await handleUploadBlogImage({
        slug: values.slug,
        image: imageUpload,
      });
      if (uploadResult.success) {
        toast.success("Berita berhasil dibuat");
        router.push("/dashboard/informasi/berita");
      } else {
        toast.error(uploadResult.errorMessage);
      }
    }
    if (error) {
      toast.error("Gagal membuat berita");
    }
  };
  //
  const handleUpdateBlog = async ({ values, content, imageUpload }) => {
    const { response, error } = await informationApi.updateBlog({
      blogId: editBlogId,
      title: values.title,
      slug: values.slug,
      status: parseInt(values.status),
      author: values.author,
      imageDesc: values.imageDesc,
      content,
    });
    if (response) {
      if (imageUpload && imageUpload instanceof File) {
        const uploadResult = await handleUploadBlogImage({
          slug: values.slug,
          image: imageUpload,
        });
        if (uploadResult.success) {
          toast.success("Berita berhasil diperbarui");
          router.push("/dashboard/informasi/berita");
        } else {
          toast.error(uploadResult.errorMessage);
        }
      } else {
        toast.success("Berita berhasil diperbarui");
        router.push("/dashboard/informasi/berita");
      }
    }
    if (error) {
      toast.error("Gagal memperbarui berita");
    }
  };
  //
  const handleUploadBlogImage = async ({ slug, image }) => {
    if (!image) return { success: true };
    const { response } = await informationApi.blog.uploadBlogImage({
      slug,
      image,
    });
    if (response) return { success: true };
    return { success: false, errorMessage: "Gagal mengunggah gambar" };
  };

  const addDataForm = useFormik({
    initialValues: {
      title: "",
      slug: "",
      status: 0,
      author: "",
      imageDesc: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Judul harus diisi")
        .min(2, "Judul minimal 2 karakter")
        .max(255, "Judul maksimal 255 karakter")
        .matches(/^(?!\s*$).+/, "Judul tidak boleh hanya berisi spasi")
        .matches(/^(?!\d+$).+/, "Judul tidak boleh hanya angka")
        .matches(/^(?!\W+$).+/, "Judul tidak boleh hanya karakter spesial")
        // Judul tidak boleh ada "&" karena akan merusak URL
        .test(
          "no-ampersand",
          "Judul tidak boleh mengandung karakter '&'",
          (value) => {
            return !value || !value.includes("&");
          }
        ),
      slug: Yup.string().required("Slug harus diisi"),
      status: Yup.number().required("Status harus diisi"),
      author: Yup.string().required("Penulis harus diisi"),
      imageDesc: Yup.string().required("Deskripsi harus diisi"),
    }),
    onSubmit: async (values) => {
      if (loading) return;
      setLoading(true);

      try {
        if (!editBlogId && !editBlogSlug) {
          // CREATE MODE
          await handleCreateBlog({ values, content, imageUpload });
        } else {
          // EDIT MODE
          await handleUpdateBlog({ values, content, imageUpload });
        }
      } finally {
        setLoading(false);
      }
    },
  });

  // SLUG GENERATOR
  useEffect(() => {
    const title = addDataForm.values.title;
    const titleToSlug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    addDataForm.setFieldValue("slug", titleToSlug);
  }, [addDataForm.values.title]);

  // EDIT MODE
  const fetchInformationData = async () => {
    const { response, error } = await informationApi.blog.getBlogBySlug({
      slug: editBlogSlug,
    });
    const existingBlog = response?.data;
    if (response) {
      addDataForm.setValues({
        title: existingBlog.artiTitle,
        slug: existingBlog.artiSlug,
        status: parseInt(
          existingBlog.artiStatus === "draft"
            ? 0
            : existingBlog.artiStatus === "publish"
            ? 1
            : 2
        ),
        author: existingBlog.artiPenulis,
        imageDesc: existingBlog.artiImageDesc,
      });
      setImageUpload(existingBlog.artiImage);
      setContent(existingBlog.artiContent);
    }
    if (error) {
      toast.error("Gagal memuat berita");
    }
  };
  //
  useEffect(() => {
    if (editBlogId && editBlogSlug) fetchInformationData();
  }, [editBlogId, editBlogSlug]);

  const [previewVisible, setPreviewVisible] = useState(true);
  //
  const togglePreview = () => {
    setPreviewVisible((prev) => !prev);
  };

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>BERITA</DashboardHeader>

      <div className="px-10 pb-16 h-full">
        <div className="pt-4 flex justify-between items-center border-b border-gray-400 pb-4">
          <h2 className="font-bold text-2xl">Form Berita</h2>
          {/*  */}
          <SaveButton
            name="saveBlogButton"
            onClick={addDataForm.handleSubmit}
            disabled={loading}
          >
            Simpan
          </SaveButton>
        </div>

        <div className="mt-6 overflow-x-auto">
          <div className="grid grid-cols-2 gap-4">
            <div
              className={`flex flex-col gap-6 ${
                previewVisible ? "col-span-1" : "col-span-2"
              } ${!previewVisible ? "md:col-span-2" : ""}`}
            >
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

              <InputWithSelect
                label="Status"
                placeholder="Pilih status berita"
                options={[
                  { name: "Publish", value: 1 },
                  { name: "Draft", value: 0 },
                  // { name: "Archive", value: 2 },
                ]}
                name="status"
                value={addDataForm.values.status}
                onChange={addDataForm.handleChange}
                error={
                  addDataForm.touched.status &&
                  addDataForm.errors.status !== undefined
                }
                helperText={
                  addDataForm.touched.status && addDataForm.errors.status
                }
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
                rows={3}
                label="Deskripsi Sampul"
                placeholder="Masukkan deskripsi sampul..."
                name="imageDesc"
                value={addDataForm.values.imageDesc}
                onChange={addDataForm.handleChange}
                error={
                  addDataForm.touched.imageDesc &&
                  addDataForm.errors.imageDesc !== undefined
                }
                helperText={
                  addDataForm.touched.imageDesc && addDataForm.errors.imageDesc
                }
              />

              <TextEditor
                label="Konten"
                content={content}
                setContent={setContent}
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
                    title={addDataForm.values.title || "Judul Berita"}
                    description={`${todayOnFormat}. Ditulis oleh ${
                      addDataForm.values.author || "Penulis"
                    }`}
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
                      alt="Sampul"
                      width={500}
                      height={500}
                      className="w-full object-cover"
                    />
                  </div>

                  <div className="mt-2 bg-white rounded py-2 px-3">
                    <p className="text-[#A0A0A0] text-sm">
                      {addDataForm.values.imageDesc || "Deskripsi Sampul"}
                    </p>
                  </div>

                  <div className="text-sm text-justify break-words whitespace-normal">
                    <div className="mt-2 bg-white rounded py-2 px-3">
                      {content !== "" ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: content }}
                        ></div>
                      ) : (
                        "Konten berita..."
                      )}
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
