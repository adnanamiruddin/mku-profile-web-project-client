import authApi from "@/api/modules/auth.api";
import LoginButton from "@/components/layouts/functions/LoginButton";
import LoginInput from "@/components/layouts/functions/LoginInput";
import { setUser } from "@/redux/features/userSlice";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

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
      const token = await authApi.createToken({
        username: values.username,
        password: values.password,
      });
      if (token) {
        const { response, error } = await authApi.loginUser({
          username: values.username,
          password: values.password,
        });
        if (response) {
          const expireTime = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
          Cookies.set("actkn", token.accessToken, {
            expires: expireTime,
          });
          Cookies.set("rfrshtkn", token.refreshToken, {
            expires: expireTime,
          });
          Cookies.set("lggnnusr", JSON.stringify(response.user), {
            expires: expireTime,
          });

          dispatch(setUser(response.user));
          router.push("/dashboard");
          toast.success(
            `Selamat datang kembali ${
              response.user.account
                ? response.user.account
                : response.user.username
            }`
          );
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
              <LoginButton name="loginButton" loading={loading} />
            </form>

            <p className="mt-6">
              Penggunaan sistem ini tunduk pada peraturan dan ketentuan SIMKU.
              Lihat{" "}
              <a
                // href="/pdf/Manual Penggunaan SIMKU - Stikes Intan Martapura.pdf"
                download
                className="underline"
              >
                Panduan Administratif
              </a>{" "}
              SIMKU untuk informasi lebih lanjut.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      {/* ... */}
    </>
  );
}
