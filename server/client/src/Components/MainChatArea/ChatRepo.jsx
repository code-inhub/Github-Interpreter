import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import Input from "../Chat-Input";

const ChatRepo = () => {
  const [chatRepo, setChatRepo] = useState("");
  return (
    <div className="flex-1 ">
      <div className="flex flex-col justify-center items-center p-10 w-full h-full">
        <div className="chat-container relative mt-4 flex-1 p-2">
          <div className="p-2 overflow-y-auto max-h-full text-white h-[82%]">
            {" "}
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem eum
          </div>
          <div className="fixed bottom-0 flex gap-2 w-full py-2">
            <Input
              inputState={chatRepo}
              placeholder="Write your text here"
              inputStateFunc={setChatRepo}
              type={"text"}
              label={"Your Prompt"}
              width={"85%"}
            />

            <button className=" text-white border hover:scale-110 transition-all border-white right-3 px-4  rounded-2xl backdrop-blur-2xl cursor-pointer">
              <IoSend className="text-0.5xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRepo;
