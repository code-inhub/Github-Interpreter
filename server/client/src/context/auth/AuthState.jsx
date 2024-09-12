import React, { useState } from "react";
import AuthContext from "./AuthContext.jsx";

const AuthState = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isChatAnalysis, setIsChatAnalysis] = useState(false);
  const [isChatWithRepo, setIsChatWithRepo] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setUser,
        setIsAuthenticated,
        isChatAnalysis,
        setIsChatAnalysis,
        isChatWithRepo,
        setIsChatWithRepo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
