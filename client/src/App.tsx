import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { login, register } from "./services/login.js";
import Path from "./Path.js";

import Header from "./components/header/Header.jsx";
import Home from "./components/home/Home.jsx";
import GameList from "./components/game-list/GameList.jsx";
import Login from "./components/login/Login.jsx";
import Create from "./components/create/Create.jsx";
import Logout from "./components/logout/Logout.jsx";
import Register from "./components/register/Register.jsx";
import GameDetail from "./components/gameDetail/GameDetail.jsx";
import AuthContext from "./context/authContext.ts";

interface AuthData {
  email: string;
  password: string;
  confirmPassword?: string;
}

function App() {
  const [auth, setAuth] = useState(() => {
    localStorage.removeItem("accessToken");
    return {};
  });

  const navigate = useNavigate();

  const loginSubmitHandler = async (userData: AuthData) => {
    const result = await login(userData);
    setAuth(result);
    localStorage.setItem("accessToken", result.accessToken);
    navigate(Path.Home);
  };

  const registerSubmitHandler = async (userData: AuthData) => {
    if (userData.password !== userData.confirmPassword) {
      return alert("Password and Confirm Password must be the same!");
    }
    const result = await register(userData);
    setAuth(result);
    localStorage.setItem("accessToken", result.accessToken);
    navigate(Path.Home);
  };

  const logoutHandler = () => {
    setAuth({});
    localStorage.removeItem("accessToken");
    navigate(Path.Home);
  };

  return (
    <AuthContext.Provider
      value={{
        loginSubmitHandler,
        ...auth,
        registerSubmitHandler,
        logoutHandler,
      }}
    >
      <div id="box">
        <Header />

        <Routes>
          <Route path={Path.Home} element={<Home />} />
          <Route path="/games" element={<GameList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/register" element={<Register />} />
          <Route path="/games/:gameId" element={<GameDetail />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
