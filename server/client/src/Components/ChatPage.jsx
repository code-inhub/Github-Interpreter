import React, { useState, useEffect, useContext } from "react";
import ChatRepo from "./MainChatArea/ChatRepo";

import "../styles/chatpage.css";

import { useNavigate } from "react-router-dom";
// import Analysis from "./RepoComponents/Analysis";
// import ChatWithRepo from "./RepoComponents/ChatWithRepo";
import AuthContext from "../context/auth/AuthContext";
import ChatArea from "./MainChatArea/ChatArea";
import ChatComponent from "./MainChatArea/ChatComponent";
import SideBar from "./MainChatArea/SideBar";
import { getUser } from "../api";
import { toast } from "react-hot-toast";
import ChatError from "./MainChatArea/ChatError";

const ChatPage = () => {
  const [repoAnalysis] = useState(false);

  const {
    user,
    setUser,
    isChatAnalysis,
    setIsChatAnalysis,
    isChatWithRepo,
    setIsChatWithRepo,
    setUserChatList,
    userChatList,
    isChatComing,
    isError,
    setIsError,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUser()
      .then((data) => {
        console.log(data.user.chats);
        setUserChatList(data?.user?.chats);
      })
      .catch((error) => {
        toast.error("Failed to get user data");
        console.log(error);
      });

    console.log("user");

    console.log("navigate");
  }, [isChatComing]);

  return (
    <div className="relative background-chat container max-w-full fade-in-bg-chat h-[100vh] w-[100vw] flex gap-2">
      {/* Sidebar for chat history */}
      <SideBar />

      {/* Main chat area */}

      {isChatAnalysis ? (
        <ChatComponent />
      ) : isChatWithRepo ? (
        <ChatRepo />
      ) : isError ? (
        <ChatError />
      ) : (
        <ChatArea />
      )}
    </div>
  );
};

export default ChatPage;
