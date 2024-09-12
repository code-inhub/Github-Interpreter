import React, { useState } from "react";
import AuthContext from "./AuthContext.jsx";

const AuthState = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isChatArea, setIsChatArea] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setUser,
        setIsAuthenticated,
        isChatArea,
        setIsChatArea,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
