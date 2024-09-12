import React from "react";
import Input from "../Chat-Input";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useState } from "react";
import { IoSend } from "react-icons/io5";

const ChatComponent = () => {
  const [chatText, setChatText] = useState("");
  return (
    <div className="flex flex-col justify-center items-center p-10">
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
          repellendus tempore quod nam velit consequatur ullam fugit saepe est.
          Dolorem ex maiores inventore earum, quas porro! Obcaecati incidunt
          voluptatum minima quos dolorum numquam, odio, itaque sequi nisi vitae
          quas animi? Praesentium quaerat vel odio provident possimus, incidunt
          voluptate facilis.
        </div>
        <button className="absolute text-white border hover:scale-110 transition-all border-white bottom-4 right-5 px-5 py-1 rounded-2xl backdrop-blur-2xl cursor-pointer">
          <IoSend className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
