import React from "react";
import { useState } from "react";
import { color, motion } from "framer-motion";

const Input = ({
  placeholder,
  label,
  icon,
  inputState,
  inputStateFunc,
  type,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const inputContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    borderRadius: "40px",
    padding: "10px 10px", // Adjust padding as needed
    border: "2px solid #ffffff", // Change color if needed
    backgroundColor: "",
    marginBottom: "8px",
    width: "50%",
  };
  const inputStyle = {
    width: "100%",
    height: "100%",
    color: "white",
    backgroundColor: "transparent",
    fontSize: "1.2rem", // Adjust font size as needed
    // fontWeight: "bold",

    outline: "none",
  };
  const shadowStyle = isFocus
    ? { boxShadow: "0 0 4px black" } // Change color if needed
    : {};

  return (
    <>
      <motion.div style={{ ...inputContainerStyle, ...shadowStyle }}>
        {icon}
        <input
          type={type}
          placeholder={placeholder}
          style={{ ...inputStyle }}
          value={inputState}
          onChange={(e) => inputStateFunc(e.target.value)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      </motion.div>
    </>
  );
};

export default Input;
