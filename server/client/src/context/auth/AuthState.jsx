import React, { useState } from "react";
import AuthContext from "./AuthContext.jsx";

const AuthState = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userChatList, setUserChatList] = useState([]);
  const [isChatAnalysis, setIsChatAnalysis] = useState(false);
  const [isChatWithRepo, setIsChatWithRepo] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        isChatAnalysis,
        setIsChatAnalysis,
        isChatWithRepo,
        setIsChatWithRepo,
        userChatList,
        setUserChatList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
