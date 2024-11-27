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
import Sidebar from "./layouts/globals/dashboard-nav/Sidebar";
import Cookies from "js-cookie";

import "react-toastify/dist/ReactToastify.css";

export default function MainLayout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const authUser = async () => {
      const userOnCookie = Cookies.get("lggnnusr");
      if (userOnCookie) {
        const user = JSON.parse(userOnCookie);
        dispatch(setUser(user));
        return;
      }
      dispatch(setUser(null));
    };
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
          <>
            {router.pathname === "/login" ? (
              <>{children}</>
            ) : (
              <ProtectedPage>
                <div className="md:flex">
                  <Sidebar />

                  <div className="w-full bg-white pt-16 md:w-4/5 md:pt-0 font-sans">
                    {children}
                  </div>
                </div>
              </ProtectedPage>
            )}
          </>
        )}
      </div>
    </>
  );
}
