import React from "react";
import { IoSend } from "react-icons/io5";
import { getErrorMessages } from "../../api";
import { useContext } from "react";
import AuthContext from "../../context/auth/AuthContext";
import { useState } from "react";
import Input from "../Chat-Input";
import Question from "../Conversation/Question";
import Answer from "../Conversation/Answer";

const ChatError = () => {
  const { githubLink, chatId, errorMessages, setErrorMessages } =
    useContext(AuthContext);
  const [question, setQuestion] = useState("");

  const handleSend = async () => {
    console.log("calling");
    console.log(chatId);
    if (question.trim() === "") return;

    // Add new question to messages
    //console.log(messages);
    const newMessages = [...errorMessages, { isUser: true, text: question }];
    setErrorMessages(newMessages);
    setQuestion(""); // Clear input field

    // Make API request to get the answer
    try {
      console.log("running getANswer");
      const answer = await getErrorMessages(githubLink, chatId, question);
      console.log(answer.aiMessage.text);
      setErrorMessages([
        ...newMessages,
        { isUser: false, text: answer.aiMessage.text },
      ]);
      console.log(answer);
    } catch (error) {
      console.error("Error fetching answer:", error);
    }
  };
  return (
    <div className="flex-1 overflow-x-auto">
      <div className="flex flex-col justify-center items-center p-10 w-full h-full">
        <div className="chat-container relative mt- flex-1">
          <div className="p-2 overflow-y-auto max-h-full text-white h-[90%]">
            {" "}
            {errorMessages?.map((message, index) =>
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

export default ChatError;
