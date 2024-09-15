import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/AuthContext";
import Input from "../Chat-Input";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { createChat, getChatAnalysis, getFiles } from "../../api";
import { IoMdSend } from "react-icons/io";

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

  const [files, setFiles] = useState([]);

  const handleSubmit = (githubLink, type) => {
    console.log(githubLink, type);

    createChat(githubLink, type)
      .then((data) => {
        setChatId(data.data._id);
        //setGithubLink("");
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

  const handleDisplay = async (githubLink) => {
    console.log(githubLink);
    getFiles(githubLink)
      .then((data) => {
        console.log(data);
        setFiles(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="p-4 flex-1 ">
        <div className="flex flex-col items-center justify-center w-full h-full gap-5">
          <Input
            icon={<MdDriveFileRenameOutline className="text-white" />}
            inputState={githubLink}
            placeholder="Write your text here"
            inputStateFunc={setGithubLink}
            type={"text"}
            label={"Your Github Repo Link"}
            width={"35%"}
            icon2={
              <IoMdSend
                onClick={() => handleDisplay(githubLink)}
                className="text-white text-2xl cursor-pointer"
              />
            }
          />
          <div className="flex gap-2 items-center justify-center">
            {" "}
            {files.length != 0 &&
              files?.map((file, key) => (
                <button
                  key={key}
                  className="rounded-2xl px-2 py-1 text-white border border-white border-r-2"
                >
                  {file}
                </button>
              ))}
          </div>

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
