import authApi from "@/api/modules/auth.api";
import LoginButton from "@/components/layouts/functions/LoginButton";
import LoginInput from "@/components/layouts/functions/LoginInput";
import { selectUser, setUser } from "@/redux/features/userSlice";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function LoginPage() {
  const router = useRouter();

  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (user) router.push("/dashboard");
  // }, [user, router]);

  const signInForm = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username harus diisi"),
      password: Yup.string()
        .min(8, "Setidaknya 8 karakter untuk password")
        .required("Password harus diisi"),
    }),
    onSubmit: async (values) => {
      if (loading) return;

      setLoading(true);
      const token = await authApi.createToken();
      if (token) {
        const { response, error } = await authApi.loginUser({
          username: values.username,
          password: values.password,
        });
        if (response) {
          localStorage.setItem("lggnnusrd", response.user.id);
          const { response: profileResponse, error: profileError } =
            await authApi.getProfile();
          if (profileResponse) {
            signInForm.resetForm();
            dispatch(setUser(profileResponse.user));
            router.push("/dashboard");
            toast.success(
              `Selamat datang kembali ${
                profileResponse.user.name || profileResponse.user.username
              }`
            );
          }
          if (profileError) toast.error(profileError);
        }
        if (error) toast.error(error.message);
      }

      setLoading(false);
    },
  });

  return (
    <>
      {/* Tab - Desktop View */}
      <div className="hidden md:inline">
        <div className="flex items-center gap-6 py-4 px-28 border-b-2 border-gray-300">
          <Image
            src="/logo-unhas.png"
            alt="Universitas Hasanuddin"
            width={500}
            height={500}
            className="w-14 h-14 object-contain"
          />
          {/*  */}
          <h2 className="text-3xl font-semibold text-blue-950">
            Sub Direktorat Mata Kuliah Umum Universitas Hasanuddin
          </h2>
        </div>

        <div className="flex justify-center">
          <Image
            priority
            src="/login-image.png"
            alt="MKU Universitas Hasanuddin"
            width={500}
            height={500}
            className="w-[50%] h-[87.6vh] object-fill"
          />

          <div className="w-[60%] font-sans flex flex-col justify-center px-16">
            <h4 className="text-4xl">Masuk</h4>
            {/*  */}
            <form
              onSubmit={signInForm.handleSubmit}
              className="mt-6 bg-gray-200 pt-4 pb-6 px-6 rounded-md flex flex-col gap-5"
            >
              <LoginInput
                placeholder="Masukkan username"
                label="Username"
                type="text"
                name="username"
                value={signInForm.values.username}
                onChange={signInForm.handleChange}
                error={
                  signInForm.touched.username &&
                  signInForm.errors.username !== undefined
                }
                helperText={
                  signInForm.touched.username && signInForm.errors.username
                }
              />
              <LoginInput
                placeholder="Masukkan sandi"
                label="Kata Sandi"
                type="password"
                name="password"
                value={signInForm.values.password}
                onChange={signInForm.handleChange}
                error={
                  signInForm.touched.password &&
                  signInForm.errors.password !== undefined
                }
                helperText={
                  signInForm.touched.password && signInForm.errors.password
                }
              />
              <LoginButton loading={loading} />
            </form>

            <p className="mt-6">
              Penggunaan sistem ini tunduk pada peraturan dan ketentuan SILASA.
              Lihat{" "}
              <a
                // href="/pdf/Manual Penggunaan SILASA - Stikes Intan Martapura.pdf"
                download
                className="underline"
              >
                Panduan Administratif
              </a>{" "}
              SILASA untuk informasi lebih lanjut.
            </p>
          </div>
        </div>

        {/* <LoginFooter /> */}
      </div>

      {/* Mobile View */}
      <div className="md:hidden bg-blue-50 p-6">
        <div className="bg-white rounded-xl">
          <div className="px-4 py-6 flex flex-col justify-center items-center">
            <Image
              src="/logo-unhas.png"
              alt="Universitas Hasanuddin"
              width={500}
              height={500}
              className="w-14 h-14"
            />
            <h1 className="mt-4 text-4xl font-black">SILASA</h1>

            <h2 className="mt-3 text-center text-xl text-blue-950">
              Sistem Informasi Laporan <br /> Aktifitas Mahasiswa
            </h2>
          </div>

          <div className="font-sans flex flex-col justify-center px-3">
            {/*  */}
            <form
              onSubmit={signInForm.handleSubmit}
              className="bg-gray-200 pt-2 pb-5 px-3.5 rounded-md flex flex-col gap-5"
            >
              <LoginInput
                placeholder="Masukkan username"
                label="Username"
                type="text"
                name="username"
                value={signInForm.values.username}
                onChange={signInForm.handleChange}
                error={
                  signInForm.touched.username &&
                  signInForm.errors.username !== undefined
                }
                helperText={
                  signInForm.touched.username && signInForm.errors.username
                }
              />
              <LoginInput
                placeholder="Masukkan sandi"
                label="Kata Sandi"
                type="password"
                name="password"
                value={signInForm.values.password}
                onChange={signInForm.handleChange}
                error={
                  signInForm.touched.password &&
                  signInForm.errors.password !== undefined
                }
                helperText={
                  signInForm.touched.password && signInForm.errors.password
                }
              />
              <LoginButton loading={loading} />
            </form>
            {/*  */}
            <p className="mt-6 text-sm">
              Penggunaan sistem ini tunduk pada peraturan dan ketentuan SILASA.
              Lihat{" "}
              <a
                // href="/pdf/Manual Penggunaan SILASA - Stikes Intan Martapura.pdf"
                download
                className="underline"
              >
                Panduan Administratif
              </a>{" "}
              SILASA untuk informasi lebih lanjut.
            </p>

            <div className="py-8 flex flex-col justify-between items-center">
              <button className="w-full py-3 border-2 border-gray-600 rounded-md font-medium font-sans flex justify-center items-center hover:shadow-xl">
                Bantuan Masuk
                <Icon
                  icon="material-symbols:arrow-forward"
                  className="ms-2 text-2xl"
                />
              </button>
              {/*  */}
              <p className="mt-6 text-sm">
                <span className="font-semibold">
                  Informasi Keamanan Penting
                </span>
                : Dengan masuk, Anda dapat mengakses situs web SILASA lain yang
                dilindungi dengan browser ini, bukan hanya situs web yang Anda
                minta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
