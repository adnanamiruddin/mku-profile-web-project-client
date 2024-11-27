import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/userSlice";

export default function ProtectedPage({ children }) {
  const { user } = useSelector(selectUser);

  return user ? children : null;
}
