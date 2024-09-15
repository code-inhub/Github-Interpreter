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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isChatAnalysis,
        isChatWithRepo,
        githubLink,
        isChatComing,
        userChatList,
        chatId,
        repoAnalysisMessage,
        setRepoAnalysisMessage,
        messages,
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
