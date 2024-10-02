import React, { useContext, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism"; // You can use any theme you like
import { ColorRing } from "react-loader-spinner";
import AuthContext from "../../context/auth/AuthContext";

const ChatComponent = () => {
  const [chatText, setChatText] = useState("");

  const { repoAnalysisMessage, setRepoAnalysisMessage, isChatLoading, setIsChatLoading } =
    useContext(AuthContext);

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
    <div className="flex-1 overflow-x-auto">
      <div className="flex flex-col justify-center items-center p-10 w-full h-full">
        <div className="chat-container relative p-4 flex-1">
          {/* Show a loading spinner if chat is loading */}
          {isChatLoading && (
            <div className="flex items-center justify-center h-full w-full">
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            </div>
          )}

          {/* Render the repoAnalysisMessage if available */}
          {repoAnalysisMessage && (
            <div className="p-2 overflow-y-auto max-h-full bg-gray-300 text-black rounded-2xl shadow-lg">
              {/* Render repoAnalysisMessage as Markdown with code syntax highlighting */}
              <ReactMarkdown
                components={components}
                skipHtml={false} // Avoids skipping HTML elements inside markdown
                children={repoAnalysisMessage} // You can also use `{repoAnalysisMessage}`
                breaks={true} // Enable line breaks with single line returns
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
