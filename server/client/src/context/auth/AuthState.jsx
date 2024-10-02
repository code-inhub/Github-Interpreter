import React, { useState } from "react";
import AuthContext from "./AuthContext.jsx";

const AuthState = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userChatList, setUserChatList] = useState([]);
  const [isChatAnalysis, setIsChatAnalysis] = useState(false);
  const [isChatWithRepo, setIsChatWithRepo] = useState(false);
  const [isChatComing, setIsChatComing] = useState(false);
  const [githubLink, setGithubLink] = useState("");
  const [chatId, setChatId] = useState("");
  const [messages, setMessages] = useState([]);
  const [repoAnalysisMessage, setRepoAnalysisMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [isDisplay, setIsDisplay] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isChatPage, setIsChatPage] = useState(false);

  const [isChatLoading, setIsChatLoading] = useState(false);

  const [isChatRepoLoading, setIsChatRepoLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        isError,
        isAuthenticated,
        isChatRepoLoading,
        setIsChatRepoLoading,
        isChatAnalysis,
        isChatWithRepo,
        githubLink,
        isChatPage,
        setIsChatPage,
        isChatLoading,
        setIsChatLoading,
        isChatComing,
        userChatList,
        errorMessages,
        chatId,
        messages,
        repoAnalysisMessage,
        isDisplay,
        setIsDisplay,
        setIsError,
        setErrorMessages,
        setRepoAnalysisMessage,
        setMessages,
        setChatId,
        setUser,
        setIsAuthenticated,
        setIsChatAnalysis,
        setIsChatComing,
        setGithubLink,
        setIsChatWithRepo,
        setUserChatList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
