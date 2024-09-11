import React from "react";
import { motion } from "framer-motion";
import Animate from "./Animate";
import "../styles/landing.css";
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
      <div className="container p-4 bg-cover bg-center bg-no-repeat bg-yellow-50 fade-in-bg background-image max-w-full h-screen flex justify-center flex-col">
        <div className="absolute top-4 left-4">
        </div>
        <h1 className="text-5xl font-bold mb-8" style={{ color: "rgb(255,218,192)" }}>Github-Interpreter</h1>
        <section className="container flex items-center justify-center gap-10 ">
          <div className="max-w-5xl flex flex-col gap-6 backdrop-blur-2xl p-6 rounded-lg">
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
          <div>
            <Animate />
          </div>
        </section>

        <div className="flex items-center justify-center py-13 mt-10">
          <button
            className="text-white px-6 py-2 bg-black rounded-xl border border-purple-950 font-bold w-[20%]"
            onClick={handleButtonClick}
          >
            Lets Go
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;