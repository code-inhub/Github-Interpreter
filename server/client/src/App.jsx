import React, { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./Components/LandingPage";
import SignUp from "./Components/Auth/SignUp.jsx";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./Components/Auth/Login";
import ChatPage from "./Components/ChatPage.jsx";
import { getUser, getToken } from "./api.js";
import AuthContext from "./context/auth/AuthContext.jsx";

const App = () => {
  const {
    user,
    setUser,
    setUserChatList,
    userChatList,
    isChatPage,
    setIsChatPage,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getTok = async () => {
      try {
        let token = await getToken();
        console.log(token);

        if (
          !token &&
          location.pathname !== "/login" &&
          location.pathname !== "/signup"
        ) {
          navigate("/");
        }

        if (!token) setIsChatPage(false);
        else if (token) {
          setIsChatPage(true);
        }
      } catch (error) {
        toast.error("Failed to get token");
        console.error(error);
      }
    };

    getTok();
    console.log("pathname", location.pathname);
  }, [navigate, location.pathname]);

  useEffect(() => {
    if (!user) {
      getUser()
        .then((data) => {
          setUser(data?.user);
          console.log(data.user.chats);
          //setUserChatList(data?.user?.chats);
        })
        .catch((error) => {
          // toast.error("Failed to get user data");
          console.error(error);
        });

      console.log("user");
    }

    console.log("navigate");
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/chatpage" element={<ChatPage />}></Route>
      </Routes>
      <ToastContainer
        position="top-center"
        style={{
          backdropFilter: "blur(10px)",
          borderRadius: "8px",
          // backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      />
    </>
  );
};

export default App;
