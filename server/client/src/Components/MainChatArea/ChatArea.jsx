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
            className="border hover:scale-110 transition-all text-4xl border-white px-3 py-1 rounded-full backdrop-blur-2xl cursor-pointer"
            onClick={() => {
              setIsChatAnalysis(true);
              setIsChatWithRepo(false);
            }}
          >
            Repo Analysis
          </button>
          <button
            className="border hover:scale-110 transition-all text-4xl border-white px-3 py-1 rounded-full backdrop-blur-2xl cursor-pointer"
            onClick={() => {
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
        {/*  */}
      </div>
    </>
  );
};

export default ChatArea;
