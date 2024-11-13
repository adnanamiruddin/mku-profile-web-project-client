import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/userSlice";
import { useRouter } from "next/router";

export default function ProtectedPage({ children }) {
  const router = useRouter();
  const { user } = useSelector(selectUser);

  // MODE DEVELOPMENT (Di-comment dulu)
  // useEffect(() => {
  //   if (!user) router.push("/");
  // }, [user, router]);

  return user ? children : null;
}
