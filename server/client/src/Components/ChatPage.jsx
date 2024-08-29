import React, { useState } from "react";
import "../styles/chatpage.css";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Input from "./Chat-Input";

const ChatPage = () => {
  const [chatText, setChatText] = useState("");
  return (
    <div className="background-chat hcontainer h-[100vh] w-[100vw]">
      <div className="chat-page">
        <div className="flex gap-6 items-center text-white">
          <button className=" px-3 py-1 rounded-lg  bg-purple-600 cursor-pointer">
            Analysis
          </button>
          <button className="bg-purple-600 px-3 py-1 rounded-lg cursor-pointer">
            Prompt
          </button>
          <button className="bg-purple-600 px-3 py-1 rounded-lg cursor-pointer">
            Handle Error
          </button>
        </div>
        <Input
          // placeholder={"Password"}
          icon={<MdDriveFileRenameOutline className="text-white" />}
          inputState={chatText}
          placeholder="Write your text here"
          inputStateFunc={setChatText}
          type={"text"}
          label={"Your Prompt"}
        />
        <div className="chat-container">
          <div className="p-2 overflow-y-auto max-h-full text-white"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
