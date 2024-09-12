import React, { useState, useEffect, useContext } from "react";

import "../styles/chatpage.css";

import { logout } from "../api";
import { useNavigate } from "react-router-dom";
// import Analysis from "./RepoComponents/Analysis";
// import ChatWithRepo from "./RepoComponents/ChatWithRepo";
import AuthContext from "../context/auth/AuthContext";
import ChatArea from "./MainChatArea/ChatArea";
import ChatComponent from "./MainChatArea/ChatComponent";
import SideBar from "./MainChatArea/SideBar";

const ChatPage = () => {
  const [repoAnalysis] = useState(false);
  const [isChatWithRepo, setIsChatWithRepo] = useState(true);

  const { user, setUser, isChatArea, setIsChatArea } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout()
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="background-chat relative hcontainer h-[100vh] w-[100vw] flex">
      {/* Sidebar for chat history */}
      <SideBar />

      {/* Main chat area */}

      {isChatArea ? <ChatArea /> : <ChatComponent />}

      <button
        onClick={handleLogout}
        className="border fixed text-white hover:scale-110 transition-all top-6 right-20 border-white px-3 py-1 rounded-2xl backdrop-blur-xl cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default ChatPage;
