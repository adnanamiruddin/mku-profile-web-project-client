import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import ProtectedPage from "./utils/ProtectedPage";
import { setUser } from "@/redux/features/userSlice";
import Head from "next/head";
import Navbar from "./layouts/globals/Navbar";
import Footer from "./layouts/globals/Footer";
import MobileNavMenuPopup from "./layouts/globals/MobileNavMenuPopup";

import "react-toastify/dist/ReactToastify.css";

export default function MainLayout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // const authUser = async () => {
    //   const { response, error } = await authApi.getProfile();
    //   if (response) dispatch(setUser(response.user));
    //   if (error) dispatch(setUser(null));
    // };
    // if (localStorage.getItem("actkn")) authUser();
    // else dispatch(setUser(null));
  }, [dispatch]);

  const [isMobileNavMenuOpen, setIsMobileNavMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>MKU Unhas</title>
      </Head>

      {/* Config React Toastify START */}
      <ToastContainer
        position="top-center"
        autoClose={4000}
        theme="light"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        limit={1}
      />
      {/* Config React Toastify END */}

      <div className="bg-gray-100 text-black p-2 min-h-screen">
        <div className="fixed top-0 left-0 w-full bg-gray-100 pb-1 z-50">
          <Navbar
            isMobileNavMenuOpen={isMobileNavMenuOpen}
            setIsMobileNavMenuOpen={setIsMobileNavMenuOpen}
          />
        </div>

        {isMobileNavMenuOpen ? (
          <MobileNavMenuPopup setIsMobileNavMenuOpen={setIsMobileNavMenuOpen} />
        ) : null}

        <div className="min-h-screen pt-16 pb-12">{children}</div>

        <Footer />
      </div>
    </>
  );
}
