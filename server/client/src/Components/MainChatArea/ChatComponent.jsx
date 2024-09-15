import React, { useContext } from "react";
import Input from "../Chat-Input";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import AuthContext from "../../context/auth/AuthContext";

const ChatComponent = () => {
  const [chatText, setChatText] = useState("");

  const { repoAnalysisMessage, setRepoAnalysisMessage } =
    useContext(AuthContext);
  return (
    <div className="flex-1 ">
      <div className="flex flex-col justify-center items-center p-10 w-full h-full">
        <div className="chat-container relative mt-4 flex-1">
          <div className="p-2 overflow-y-auto max-h-full text-white">
            {repoAnalysisMessage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
