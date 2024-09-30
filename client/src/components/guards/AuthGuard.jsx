import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
  const {email} = useContext(AuthContext);

  if (!email) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
