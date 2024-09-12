import React, { useEffect } from "react";
import LandingPage from "./Components/LandingPage";
import SignUp from "./Components/Auth/SignUp.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import ChatPage from "./Components/ChatPage.jsx";
import AuthState from "./context/auth/AuthState.jsx";
import { getUser } from "./api/index.js";

const App = () => {
  useEffect(() => {
    getUser()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Router>
      <AuthState>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/test" element={<ChatPage />}></Route>
        </Routes>
      </AuthState>
    </Router>
  );
};

export default App;
