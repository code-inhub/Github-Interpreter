import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import Input from "../Chat-Input";

const ChatRepo = () => {
  const [chatRepo, setChatRepo] = useState("");
  return (
    <div className="flex flex-col justify-center items-center p-10">
      <div className="chat-container relative mt-4 flex-1">
        <div className="p-2 overflow-y-auto max-h-full text-white h-[82%]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem eum
          repellendus tempore quod nam velit consequatur ullam fugit saepe est.
          Dolorem ex maiores inventore earum, quas porro! Obcaecati incidunt
          voluptatum minima quos dolorum numquam, odio, itaque sequi nisi vitae
          quas animi? Praesentium quaerat vel odio provident possimus, incidunt
          voluptate facilis.quas animi? Praesentium quaerat vel odio provident
          possimus, incidunt voluptate facilis.quas animi? Praesentium quaerat
          vel odio provident possimus, incidunt voluptate facilis.quas animi?
        </div>
        <div className="fixed bottom-0 flex gap-1 w-full">
          <Input
            inputState={chatRepo}
            placeholder="Write your text here"
            inputStateFunc={setChatRepo}
            type={"text"}
            label={"Your Prompt"}
            width={"100%"}
          />

          <button className=" text-white border hover:scale-110 transition-all border-white right-5 px-5 py-1 rounded-2xl backdrop-blur-2xl cursor-pointer">
            <IoSend className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRepo;
