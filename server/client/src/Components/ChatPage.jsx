import React, { useState } from "react";
import "../styles/chatpage.css";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Input from "./Chat-Input";
import { IoSend } from "react-icons/io5";
import { logout } from "../api";
import { useNavigate } from "react-router-dom";
import Analysis from "./RepoComponents/Analysis";
import ChatWithRepo from "./RepoComponents/ChatWithRepo";

const ChatPage = () => {
  const [chatText, setChatText] = useState("");
  const [repoAnalysis] = useState(false);
  const [isChatWithRepo, setIsChatWithRepo] = useState(true);
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
      <div className="sidebar w-1/6 backdrop-blur-2xl bg-opacity-70 text-white flex flex-col justify-between p-4">
        <div className="chat-history overflow-y-auto">
          <h2 className="text-xl mb-4">Chat History</h2>
          {/* Example chat history items */}
          <div className="chat-item mb-2 p-2 border-b border-gray-600">
            Chat 1
          </div>
          <div className="chat-item mb-2 p-2 border-b border-gray-600">
            Chat 2
          </div>
          <div className="chat-item mb-2 p-2 border-b border-gray-600">
            Chat 3
          </div>
          {/* Add more chat items as needed */}
        </div>
      </div>

      {/* Main chat area */}
      <div className="chat-page flex-1 p-4 flex flex-col">
        <div className="flex gap-6 items-center text-white">
          <button className=" border hover:scale-110 transition-all border-white   px-3 py-1 rounded-2xl  backdrop-blur-2xl cursor-pointer">
            Repo Analysis
          </button>
          <button className="border hover:scale-110 transition-all border-white   px-3 py-1 rounded-2xl  backdrop-blur-2xl cursor-pointer">
            Chat with Repo
          </button>
          <button className="border hover:scale-110 transition-all border-white   px-3 py-1 rounded-2xl  backdrop-blur-2xl cursor-pointer">
            Handle Error
          </button>
        </div>
        <Input
          icon={<MdDriveFileRenameOutline className="text-white" />}
          inputState={chatText}
          placeholder="Write your text here"
          inputStateFunc={setChatText}
          type={"text"}
          label={"Your Prompt"}
        />
        <div className="chat-container mt-4 flex-1">
          {repoAnalysis && <Analysis />}
          {isChatWithRepo && <ChatWithRepo />}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="border fixed text-white hover:scale-110 transition-all top-6 right-20 border-white px-3 py-1 rounded-2xl backdrop-blur-xl cursor-poi nter"
      >
        Logout
      </button>
    </div>
  );
};

export default ChatPage;
