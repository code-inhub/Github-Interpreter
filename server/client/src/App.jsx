import React, { useContext, useEffect } from "react";
import LandingPage from "./Components/LandingPage";
import SignUp from "./Components/Auth/SignUp.jsx";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./Components/Auth/Login";
import ChatPage from "./Components/ChatPage.jsx";
import { getUser, getToken } from "./api.js";
import AuthContext from "./context/auth/AuthContext.jsx";

const App = () => {
  const { user, setUser, setUserChatList } = useContext(AuthContext);
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
    if (!user) {
      getUser()
        .then((data) => {
          setUser(data?.user);
          console.log(data.user.chats);
          setUserChatList(data?.user?.chats);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    console.log("navigate");
  }, [navigate]);

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
