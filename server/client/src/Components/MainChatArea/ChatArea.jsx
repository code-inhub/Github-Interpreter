import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/AuthContext";
import Input from "../Chat-Input";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { createChat, getChatAnalysis } from "../../api";

const ChatArea = () => {
  const {
    isChatAnalysis,
    setIsChatAnalysis,
    setIsChatWithRepo,
    githubLink,
    setGithubLink,
    setUser,
    user,
    setUserChatList,
    userChatList,
    isChatComing,
    setIsChatComing,
    setChatId,
    chatId,
    repoAnalysisMessage,
    setRepoAnalysisMessage,
  } = useContext(AuthContext);

  const handleSubmit = (githubLink, type) => {
    console.log(githubLink, type);

    createChat(githubLink, type)
      .then((data) => {
        setChatId(data.data._id);
        setGithubLink("");
        setIsChatComing((prev) => !prev);

        console.log("chatid", chatId);

        if (type === "Repo Analysis") {
          getChatAnalysis(data.data._id, githubLink)
            .then((analysisData) => {
              console.log("Repo Analysis Data:", analysisData);
              setRepoAnalysisMessage(analysisData?.aiMessage?.text);
            })
            .catch((error) => {
              toast.error("Error fetching Repo analysis");
              console.log("Error fetching Repo analysis:", error);
            });
        }
        // if(type === "Chat with Repo"){

        //   console.log("Chat with Repo");
        // }
        // if(type === "Handle Error"){
        //   console.log("Handle Error");
        // }
      })
      .catch((error) => {
        console.log(error)
        toast.error("Failed to create chat");
      });
  };

  console.log(user);
  console.log(userChatList);
  console.log(chatId);

  return (
    <>
      <div className="p-4 flex-1 ">
        <div className="flex flex-col items-center justify-center w-full h-full gap-8">
          <Input
            icon={<MdDriveFileRenameOutline className="text-white" />}
            inputState={githubLink}
            placeholder="Write your text here"
            inputStateFunc={setGithubLink}
            type={"text"}
            label={"Your Github Repo Link"}
            width={"35%"}
          />
          <div className="flex gap-6 items-center text-white justify-center">
            <button
              className="border hover:scale-110 transition-all text-4xl border-white px-3 py-1 rounded-full backdrop-blur-2xl cursor-pointer"
              onClick={() => {
                handleSubmit(githubLink, "Repo Analysis");
                setIsChatAnalysis(true);
                setIsChatWithRepo(false);
              }}
            >
              Repo Analysis
            </button>
            <button
              className="border hover:scale-110 transition-all text-4xl border-white px-3 py-1 rounded-full backdrop-blur-2xl cursor-pointer"
              onClick={() => {
                handleSubmit(githubLink, "Chat with Repo");
                setIsChatWithRepo(true);
                setIsChatAnalysis(false);
              }}
            >
              Chat with Repo
            </button>
            <button className="border hover:scale-110 transition-all text-4xl border-white px-3 py-1 rounded-full backdrop-blur-2xl cursor-pointer">
              Handle Error
            </button>
          </div>
        </div>
        {/*  */}
      </div>
    </>
  );
};

export default ChatArea;
