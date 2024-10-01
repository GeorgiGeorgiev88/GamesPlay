import { useContext, useEffect } from "react";
import { logout } from "../../services/login";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Path from "../../Path";

export default function Logout() {
  const { logoutHandler } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    logout()
      .then(() => logoutHandler())
      .catch(() => logoutHandler(), navigate(Path.Home));
  }, []);

  return null;
}
