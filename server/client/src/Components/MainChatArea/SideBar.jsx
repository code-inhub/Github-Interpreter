import React, { useContext } from "react";
import AuthContext from "../../context/auth/AuthContext";
import { FaCircleUser } from "react-icons/fa6";
import { logout } from "../../api";
import {useNavigate} from "react-router-dom";


const SideBar = () => {
  const {
    setIsChatAnalysis,
    setIsChatWithRepo,
    isChatAnalysis,
    isChatWithRepo,
    user,
    userChatList,
  } = useContext(AuthContext);

  const navigate = useNavigate();
 
  const handleLogout = () => {
    logout()
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  
  const handleSubmit = async (chat) => {};
  return (
    <div className="sidebar w-1/6 h-full backdrop-blur-2xl bg-opacity-70 text-white flex flex-col justify-between p-4">
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
        {userChatList && userChatList.length > 0 ? (
          userChatList.map((chat, index) => (
            <div
              key={index}
              className="chat-item mb-2 p-2 border-b border-gray-600"
              onClick={() => handleSubmit(chat)}
            >
              {chat} {/* Assuming each chat object has a 'name' property */}
            </div>
          ))
        ) : (
          <div className="text-gray-400">No chats available</div>
        )}
        {/* Add more chat items as needed */}
      </div>
      <div className="absolute bottom-0 py-2 flex justify-center  items-center gap-2">
        <FaCircleUser className="text-white text-2xl" />
        <article>{user?.username}</article>
      </div>
      <button
          onClick={handleLogout}
          className="border justify-end font-bold  fixed top-[95%] bottom-1 right-1  text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 via-red-500 via-yellow-500 to-green-500 transition-all duration-300 hover:scale-110 border-white px-3 py-1 rounded-lg bg-gray-300  cursor-pointer transition-all top-6 right-20 cursor-pointer"
        >
          Logout
        </button>
    </div>
  );
};

export default SideBar;
