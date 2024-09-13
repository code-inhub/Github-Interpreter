import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import Input from "../Chat-Input";
import Answer from "../Conversation/Answer.jsx";
import Question from "../Conversation/Question.jsx";
import { getAnswer } from "../../api.js";

const ChatRepo = () => {
  const [chatRepo, setChatRepo] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "question",
      content:
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam asperiores non velit nesciunt neque incidunt vel suscipit corporis exercitationem quo, perspiciatis laudantium.What is React?",
    },
    {
      type: "answer",
      content:
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam asperiores non velit nesciunt neque incidunt vel suscipit corporis exercitationem quo, perspiciatis laudantium. What is React?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam asperiores non velit nesciunt neque incidunt vel suscipit corporis exercitationem quo, perspiciatis laudantium. What is React? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam asperiores non velit nesciunt neque incidunt vel suscipit corporis exercitationem quo, perspiciatis laudantium. What is React?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam asperiores non velit nesciunt neque incidunt vel suscipit corporis exercitationem quo, perspiciatis laudantium. What is React?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam asperiores non velit nesciunt neque incidunt vel suscipit corporis exercitationem quo, perspiciatis laudantium. What is React?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam asperiores non velit nesciunt neque incidunt vel suscipit corporis exercitationem quo, perspiciatis laudantium. What is React?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam asperiores non velit nesciunt neque incidunt vel suscipit corporis exercitationem quo, perspiciatis laudantium. What is React?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam asperiores non velit nesciunt neque incidunt vel suscipit corporis exercitationem quo, perspiciatis laudantium. What is React?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam asperiores non velit nesciunt neque incidunt vel suscipit corporis exercitationem quo, perspiciatis laudantium.  React is a JavaScript library for building user interfaces.",
    },
    { type: "question", content: "What is a component?" },
    {
      type: "answer",
      content:
        "A component is a reusable piece of code that defines how a part of a user interface should appear.",
    },
  ]);

  const handleSend = async () => {
    console.log("calling");
    if (chatRepo.trim() === "") return;

    // Add new question to messages
    const newMessages = [...messages, { type: "question", content: chatRepo }];
    setMessages(newMessages);
    setChatRepo(""); // Clear input field

    // Make API request to get the answer
    try {
      const repoUrl = "xvz ";
      const answer = await getAnswer(
        chatRepo,
        repoUrl,
        "66e2d60549b9bb63c1b428a9"
      );
      setMessages([...newMessages, { type: "answer", content: answer }]);
    } catch (error) {
      console.error("Error fetching answer:", error);
    }
  };

  return (
    <div className="flex-1 ">
      <div className="flex flex-col justify-center items-center p-10 w-full h-full">
        <div className="chat-container relative mt- flex-1">
          <div className="p-2 overflow-y-auto max-h-full text-white h-[90%]">
            {messages?.map((message, index) =>
              message?.type === "question" ? (
                <Question key={index} content={message?.content} />
              ) : (
                <Answer key={index} content={message?.content} />
              )
            )}
          </div>
          <div className="flex bottom-0 text items-center justify-center w-full px-10">
            <Input
              inputState={chatRepo}
              placeholder="Write your text here"
              inputStateFunc={setChatRepo}
              type={"text"}
              label={"Your Prompt"}
              width={"100%"}
              className="text-sm"
            />

            <button
              className=" text-white hover:scale-110 transition-all  right-3 px-4  rounded-2xl backdrop-blur-2xl cursor-pointer"
              onClick={handleSend}
            >
              <IoSend className="text-2xl " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRepo;
