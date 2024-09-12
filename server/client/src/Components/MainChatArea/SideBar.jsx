import React, { useContext } from "react";
import AuthContext from "../../context/auth/AuthContext";
import { FaCircleUser } from "react-icons/fa6";

const SideBar = () => {
  const {
    setIsChatAnalysis,
    setIsChatWithRepo,
    isChatAnalysis,
    isChatWithRepo,
    user,
  } = useContext(AuthContext);

  console.log(user);
  return (
    <div className="sidebar w-1/6 h-full fixed backdrop-blur-2xl bg-opacity-70 text-white flex flex-col justify-between p-4">
      <div className="chat-history overflow-y-auto">
        {/* <h2 className="text-xl mb-4">Chat History</h2> */}
        <button
          className="border hover:scale-110 transition-all border-white   px-8 py-1 rounded-2xl  backdrop-blur-2xl cursor-pointer mb-8 "
          onClick={(prev) => {
            isChatAnalysis
              ? setIsChatAnalysis(false)
              : setIsChatWithRepo(false);
          }}
        >
          {" "}
          New Chat{" "}
        </button>
        {/* Example chat history items */}
        <div className="chat-item mb-2 p-2 border-b border-gray-600">
          Chat 1
        </div>
        <div className="chat-item mb-2 p-2 border-b border-gray-600">
          Chat 2
        </div>
        <div className="chat-item mb-2 p-2 border-b border-gray-600">
          Chat 3
        </div>
        {/* Add more chat items as needed */}
      </div>
      <div className="absolute bottom-0 py-2 flex gap-2">
        <FaCircleUser className="text-white text-2xl" />
        <article>{user?.username}</article>
      </div>
    </div>
  );
};

export default SideBar;
