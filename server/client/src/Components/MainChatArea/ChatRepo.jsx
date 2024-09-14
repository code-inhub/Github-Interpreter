import React, { useState, useContext } from "react";
import { IoSend } from "react-icons/io5";
import Input from "../Chat-Input";
import Answer from "../Conversation/Answer.jsx";
import Question from "../Conversation/Question.jsx";
import { getAnswer } from "../../api.js";
import AuthContext from "../../context/auth/AuthContext";



const ChatRepo = () => {
  const {githubLink,chatId,messages,setMessages} = useContext(AuthContext);
  const [question, setQuestion] = useState(""); 

  const handleSend = async () => {
    console.log("calling");
    if (question.trim() === "") return;
 
    // Add new question to messages
    const newMessages = [...messages, { type: "question", content: question }];
    setMessages(newMessages);
    setQuestion(""); // Clear input field

    // Make API request to get the answer
    try {
      console.log("running getANswer");
      const answer = await getAnswer(
        question,
        githubLink,
        chatId
      );
      setMessages([...newMessages, { type: "answer", content: answer.aiMessage.text }]);
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
              message?.isUser === true ? (
                <Question key={index} content={message?.text} />
              ) : (
                <Answer key={index} content={message?.text} />
              )
            )}
          </div>
          <div className="flex bottom-0 text items-center justify-center w-full px-10">
            <Input
              inputState={question}
              placeholder="Write your text here"
              inputStateFunc={setQuestion}
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
