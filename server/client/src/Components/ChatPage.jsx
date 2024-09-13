import React, { useState, useEffect, useContext } from "react";
import ChatRepo from "./MainChatArea/ChatRepo";

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

  const {
    user,
    setUser,
    isChatAnalysis,
    setIsChatAnalysis,
    isChatWithRepo,
    setIsChatWithRepo,
  } = useContext(AuthContext);
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
    <div className="relative background-chat container max-w-full h-[100vh] w-[100vw] flex gap-2">
      {/* Sidebar for chat history */}
      <SideBar />

      {/* Main chat area */}

      {isChatAnalysis ? (
        <ChatComponent />
      ) : isChatWithRepo ? (
        <ChatRepo />
      ) : (
        <ChatArea />
      )}

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
