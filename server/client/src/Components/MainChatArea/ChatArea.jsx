import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/AuthContext";
import Input from "../Chat-Input";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { createChat } from "../../api";

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
  } = useContext(AuthContext);

  const handleSubmit = (githubLink, type) => {
    console.log(githubLink, type);

    createChat(githubLink, type)
      .then((data) => {
        setChatId(data.data._id);
        setGithubLink("");
        setIsChatComing((prev) => !prev);
      })
      .catch((error) => console.log(error));
  };

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
