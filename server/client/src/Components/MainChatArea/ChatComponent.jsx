import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism"; // You can use any theme you like
import Input from "../Chat-Input";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import AuthContext from "../../context/auth/AuthContext";

const ChatComponent = () => {
  const [chatText, setChatText] = useState("");

  const { repoAnalysisMessage, setRepoAnalysisMessage } = useContext(AuthContext);

  // Define components for rendering specific elements
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={okaidia}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="flex-1">
      <div className="flex flex-col justify-center items-center p-10 w-full h-full">
        <div className="chat-container relative p-4 flex-1">
          <div className=" p-2 overflow-y-auto max-h-full bg-gray-300 text-black   rounded-2xl  shadow-lg ">
            {/* Render repoAnalysisMessage as Markdown with code syntax highlighting */}
            <ReactMarkdown components={components}>
              {repoAnalysisMessage}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
