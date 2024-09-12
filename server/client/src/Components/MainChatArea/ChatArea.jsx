import React from "react";

const ChatArea = () => {
  return (
    <>
      <div className="flex justify-center items-center h-32 text-4xl font-bold text-white mb-4">
        Create a New Chat with
      </div>

      <div className="chat-page flex-1 p-4 flex flex-col">
        <div className="flex gap-6 items-center text-white">
          <button className="border hover:scale-110 transition-all text-4xl border-white px-3 py-1 rounded-full backdrop-blur-2xl cursor-pointer">
            Repo Analysis
          </button>
          <button className="border hover:scale-110 transition-all text-4xl border-white px-3 py-1 rounded-full backdrop-blur-2xl cursor-pointer">
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
