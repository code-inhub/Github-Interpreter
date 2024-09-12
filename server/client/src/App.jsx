import React, { useContext, useEffect } from "react";
import LandingPage from "./Components/LandingPage";
import SignUp from "./Components/Auth/SignUp.jsx";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./Components/Auth/Login";
import ChatPage from "./Components/ChatPage.jsx";
import { getUser, getToken } from "./api.js";
import AuthContext from "./context/auth/AuthContext.jsx";

const App = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const getTok = async () => {
      let token = await getToken();

      if (
        !token &&
        location.pathname !== "/login" &&
        location.pathname !== "/signup"
      ) {
        navigate("/");
      }
    };

    getTok();
  }, [navigate, location.pathname]);

  useEffect(() => {
    getUser()
      .then((data) => {
        console.log(data);
        setUser(data?.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/test" element={<ChatPage />}></Route>
    </Routes>
  );
};

export default App;
