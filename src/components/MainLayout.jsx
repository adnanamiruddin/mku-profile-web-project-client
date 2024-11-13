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
import authApi from "@/api/modules/auth.api";

import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./layouts/globals/dashboard-nav/Sidebar";

export default function MainLayout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const authUser = async () => {
      // const { response, error } = await authApi.getProfile();
      // if (response) dispatch(setUser(response.user));
      // if (error) dispatch(setUser(null));

      // MODE DEVELOPMENT
      const user = {
        name: "Admin MKU",
        username: "adminmku",
        email: "adminmku@gmail.com",
      };
      dispatch(setUser(user));
    };
    // if (localStorage.getItem("actkn")) authUser();
    // else dispatch(setUser(null));

    // MODE DEVELOPMENT
    authUser();
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

      <div className="bg-gray-100 text-black min-h-screen">
        {router.pathname !== "/login" &&
        !router.pathname.includes("/dashboard") ? (
          <div className="p-2">
            <div className="fixed top-0 left-0 w-full bg-gray-100 pb-1 z-50">
              <Navbar
                isMobileNavMenuOpen={isMobileNavMenuOpen}
                setIsMobileNavMenuOpen={setIsMobileNavMenuOpen}
              />
            </div>

            {isMobileNavMenuOpen ? (
              <MobileNavMenuPopup
                setIsMobileNavMenuOpen={setIsMobileNavMenuOpen}
              />
            ) : null}

            <div className="min-h-screen pt-16 pb-12">{children}</div>

            <Footer />
          </div>
        ) : (
          <ProtectedPage>
            {router.pathname === "/login" ? (
              { children }
            ) : (
              <div className="md:flex">
                <Sidebar />

                <div className="w-full bg-white pt-16 md:w-4/5 md:pt-0 font-sans">
                  {children}
                </div>
              </div>
            )}
          </ProtectedPage>
        )}
      </div>
    </>
  );
}
