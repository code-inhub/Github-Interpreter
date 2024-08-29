import React from "react";
import LandingPage from "./Components/LandingPage";
import SignUp from "./Components/Auth/SignUp.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import ChatPage from "./Components/ChatPage.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/test" element={<ChatPage />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
