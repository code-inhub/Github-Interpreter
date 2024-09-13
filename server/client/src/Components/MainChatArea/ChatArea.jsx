import React, { useContext } from "react";
import AuthContext from "../../context/auth/AuthContext";

const ChatArea = () => {
  const { isChatAnalysis, setIsChatAnalysis, setIsChatWithRepo } =
    useContext(AuthContext);
  return (
    <>
      <div className="p-4 flex-1 ">
        <div className="flex gap-6 items-center text-white justify-center h-full w-full">
          <button
            className="border text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 via-red-500 via-yellow-500 to-green-500 transition-all duration-300 hover:scale-110 transition-all text-4xl border-white px-3 py-1 rounded-full backdrop-blur-2xl cursor-pointer font-bold"
            onClick={() => {
              setIsChatAnalysis(true);
              setIsChatWithRepo(false);
            }}
          >
            Repo Analysis
          </button>
          <button
            className="border text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 via-red-500 via-yellow-500 to-green-500 transition-all duration-300 hover:scale-110  transition-all text-4xl border-white px-3 py-1 rounded-full backdrop-blur-2xl cursor-pointer font-bold"
            onClick={() => {
              setIsChatWithRepo(true);
              setIsChatAnalysis(false);
            }}
          >
            Chat with Repo
          </button>
          <button className="border text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 via-red-500 via-yellow-500 to-green-500 transition-all duration-300 hover:scale-110 transition-all text-4xl border-white px-3 py-1 rounded-full backdrop-blur-2xl cursor-pointer font-bold ">
            Handle Error
          </button>
        </div>
        {/*  */}
      </div>
    </>
  );
};

export default ChatArea;
