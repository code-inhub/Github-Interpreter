import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/AuthContext";
import { FaCircleUser } from "react-icons/fa6";
import { logout, getUserChat } from "../../api";
import { useNavigate } from "react-router-dom";
import Analysis from "./../RepoComponents/Analysis";
import { toast } from "react-toastify";

const SideBar = () => {
  const {
    setIsChatAnalysis,
    setIsChatWithRepo,
    isChatAnalysis,
    isChatWithRepo,
    isError,
    user,
    setMessages,
    userChatList,
    setGithubLink,
    githubLink,
    setChatId,
    repoAnalysisMessage,
    setRepoAnalysisMessage,
    setIsError,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  //console.log(user);
  const handleLogout = () => {
    logout()
      .then((res) => {
        console.log(res);
        toast.success("Logout Successful");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Logout Failed");
      });
  };

  const handleClick = async (chatId) => {
    getUserChat(chatId)
      .then((data) => {
        console.log(data.messages);
        setRepoAnalysisMessage("");

        if (data.type === "Repo Analysis") {
          console.log("repo analyser", data);

          setIsChatAnalysis(true);
          setIsChatWithRepo(false);

          setRepoAnalysisMessage(data?.messages[1]?.text);
        } else {
          setMessages(data.messages);
          setIsChatWithRepo(true);
          setIsChatAnalysis(false);
        }
        setChatId(chatId);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to get chat data");
      });
  };

  const extractRepoInfo = (url) => {
    const pattern = /github\.com\/([\w-]+)\/([\w-]+)/;
    const match = url.match(pattern);
    if (match) {
      const username = match[1];
      const repo = match[2];
      return `${username}-${repo}`;
    }
    return url;
  };

  return (
    <div className="sidebar w-1/6 h-full backdrop-blur-2xl bg-opacity-70 text-white flex flex-col justify-between p-4">
      <div className="chat-history overflow-y-auto ">
        <button
          className="border hover:scale-110 transition-all border-white px-8 py-1 rounded-2xl backdrop-blur-2xl cursor-pointer mb-8 mt-2 ml-2"
          onClick={(prev) => {
            isChatAnalysis
              ? setIsChatAnalysis(false)
              : isChatWithRepo
              ? setIsChatWithRepo(false)
              : setIsError(false);
          }}
        > 
          New Chat
        </button>
        {userChatList && userChatList.length > 0 ? (
          userChatList.slice().reverse().map((obj, index) => (
            <div
              key={index}
              className="chat-item mb-2 p-2 border-b border-gray-600 cursor-pointer"
              onClick={() => handleClick(obj._id)}
            >
              {extractRepoInfo(obj.githubLink) + " " + obj.type}
            </div>
          ))
        ) : (
          <div className="text-gray-400">No chats available</div>
        )}
      </div>
      <div className="absolute bottom-2 py-2 flex justify-center items-center gap-2">
        <FaCircleUser className="text-white text-2xl" />
        <article>{user?.username}</article>
        <button
          onClick={handleLogout}
          className="border justify-end font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 via-red-500 via-yellow-500 to-green-500 transition-all duration-300 hover:scale-110 border-white px-3 py-1 rounded-lg bg-gray-300 cursor-pointer transition-all top-6 right-20 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
