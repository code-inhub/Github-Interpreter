import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import Input from "../Chat-Input";
import Answer from "../Conversation/Answer.jsx";
import Question from "../Conversation/Question.jsx";

const ChatRepo = () => {
  const [chatRepo, setChatRepo] = useState("");
  const [messages, setMessages] = useState([
    { type: "question", content: "What is React?" },
    { type: "answer", content: "React is a JavaScript library for building user interfaces." },
    { type: "question", content: "What is a component?" },
    { type: "answer", content: "A component is a reusable piece of code that defines how a part of a user interface should appear." },    
    
  ]);

  return (
    <div className="flex flex-col justify-center items-center p-10">
      <div className="chat-container relative mt-4 flex-1">
        <div className="p-2 overflow-y-auto max-h-full text-white h-[82%]">
          
          {messages?.map((message,index)=> (
            message?.type === "question"?(
              <Question key = {index} content = {message?.content} />
            ) : (
              <Answer key = {index} content = {message?.content} />
            )
          ))}
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

            <button className=" text-white border hover:scale-110 transition-all border-white right-3 px-4  rounded-2xl backdrop-blur-2xl cursor-pointer">
              <IoSend className="text-0.5xl" />
            </button>
          </div>
        </div>
      </div>
  );
};

export default ChatRepo;
