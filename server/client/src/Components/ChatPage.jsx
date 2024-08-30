import React, { useState } from "react";
import "../styles/chatpage.css";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Input from "./Chat-Input";
import { IoSend } from "react-icons/io5";

const ChatPage = () => {
  const [chatText, setChatText] = useState("");
  return (
    <div className="background-chat relative hcontainer h-[100vh] w-[100vw]">
      <div className="chat-page">
        <div className="flex gap-6 items-center text-white">
          <button className=" border hover:scale-110 transition-all border-white   px-3 py-1 rounded-2xl  backdrop-blur-2xl cursor-pointer">
            Analysis
          </button>
          <button className="border hover:scale-110 transition-all border-white   px-3 py-1 rounded-2xl  backdrop-blur-2xl cursor-pointer">
            Prompt
          </button>
          <button className="border hover:scale-110 transition-all border-white   px-3 py-1 rounded-2xl  backdrop-blur-2xl cursor-pointer">
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
        <div className="chat-container relative">
          <div className="p-2 overflow-y-auto max-h-full text-white">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem eum repellendus tempore quod nam velit consequatur ullam fugit saepe est. Dolorem ex maiores inventore earum, quas porro! Obcaecati incidunt voluptatum minima quos dolorum numquam, odio, itaque sequi nisi vitae quas animi? Praesentium quaerat vel odio provident possimus, incidunt voluptate facilis.</div>
          <button className=" absolute text-white border hover:scale-110 transition-all border-white  bottom-4 right-5 px-5 py-1 rounded-2xl  backdrop-blur-2xl cursor-pointer"><IoSend className="text-2xl"  />  </button>
        </div>
      </div>
      
      <button className="border fixed text-white hover:scale-110 transition-all top-6 right-20 border-white   px-3 py-1 rounded-2xl  backdrop-blur-xl cursor-pointer">Logout</button>
    </div>
  );
};

export default ChatPage;
