import React from "react";
import { motion } from "framer-motion";
import Animate from "./Animate";
import "../styles/landing.css";
import { useNavigate } from "react-router-dom";
const lines = [
  {
    lineNo: 1,
    line: "This is the first line appearing with a delay.",
    delay: 2,
  },
  {
    lineNo: 2,
    line: "The second line appears a bit after the first one.",
    delay: 3,
  },
  {
    lineNo: 3,
    line: "  Finally, the third line appears after the second.",
    delay: 4,
  },
];

const LandingPage = () => {
  const history = useNavigate();
  return (
    <>
      <div className="container p-4 bg-cover bg-center bg-no-repeat bg-yellow-50 fade-in-bg background-image max-w-full h-screen flex justify-center flex-col">
        <section className="container flex items-center justify-center gap-10 ">
          <div className="max-w-5xl flex flex-col gap-6">
            {lines.map((line) => {
              return (
                <motion.p
                  key={line.lineNo}
                  className="text-4xl font-bold text-white"
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
            className="text-white bg-purple-600 px-6 py-2 rounded-xl border border-purple-950 font-bold w-[30%]"
            onClick={() => history("/test")}
          >
            Lets Go
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
