import React from "react";
import Input from "../Chat-Input";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useState } from "react";
import { IoSend } from "react-icons/io5";

const ChatComponent = () => {
  const [chatText, setChatText] = useState("");
  return (
    <div className="flex-1 ">
      <div className="flex flex-col justify-center items-center p-10 w-full h-full">
        <Input
          icon={<MdDriveFileRenameOutline className="text-white" />}
          inputState={chatText}
          placeholder="Write your text here"
          inputStateFunc={setChatText}
          type={"text"}
          label={"Your Prompt"}
        />
        <div className="chat-container relative mt-4 flex-1">
          <div className="p-2 overflow-y-auto max-h-full text-white">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem eum
          </div>
          <button className="absolute text-white border hover:scale-110 transition-all border-white bottom-4 right-5 px-5 py-1 rounded-2xl backdrop-blur-2xl cursor-pointer">
            <IoSend className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
