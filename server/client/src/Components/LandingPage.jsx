import React from "react";
import { motion } from "framer-motion";
import Animate from "./Animate";
import "../styles/landing.css";
import colouredGithub from "../styles/pics/GitHub Colored.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const lines = [
  {
    lineNo: 1,
    line: "Seamless Code Debugging at Your Fingertips..",
    delay: 2,
  },
  {
    lineNo: 2,
    line: "Analyze GitHub Repositories, Detect Errors Instantly, and Automate Debugging with AI.",
    delay: 3,
  },
  {
    lineNo: 3,
    line: "Get Started and Supercharge Your Development Workflow.",
    delay: 4,
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/auth/verify-token", {
        withCredentials: true,
      });
  
      if (response.status === 200) {
        navigate("/test");
      } else {
        console.log("User is not logged in");
        navigate("/login");
      }
    } catch (error) {
      console.log("Error verifying token:", error);
      navigate("/login");
    }
  };

  return (
    <>
      <div className="container p-4 bg-cover bg-center bg-no-repeat bg-yellow-50 fade-in-bg background-image max-w-full h-screen flex flex-col justify-between">
        <div className="flex justify-center mt-10">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 via-red-500 via-yellow-500 to-green-500 transition-all duration-300">
            Github-Interpreter
          </h1>        </div>
        <section className="flex flex-1 items-center justify-between px-10">
          <div className="w-3/5 flex flex-col gap-6 p-6 rounded-lg">
            {lines.map((line) => {
              return (
                <motion.p
                  key={line.lineNo}
                  className="text-2xl font-bold"
                  style={{ color: "rgb(255,218,192)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: line.delay }}
                >
                  {line.line}
                </motion.p>
              );
            })}
          </div>
          <div className="w-2/5 flex justify-center">
            <img src={colouredGithub} className="w-3/4 h-auto" />
          </div>
        </section>
        <div className="flex items-center justify-center py-13">
        <button
  className="text-white px-6 py-1 mb-10 text-3xl font-bold backdrop-blur-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 via-red-500 via-yellow-500 to-green-500 transition-all duration-300 rounded-2xl"
  onClick={handleButtonClick} 
>
  Lets Go"logo"
</button>
        </div>
      </div>
    </>
  );
}; 

export default LandingPage; 