import React, { useState } from "react";
import Input from "../AuthComponents/Input.jsx";
import { TbMailFilled } from "react-icons/tb";
import { MdLockOutline } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { motion } from "framer-motion";
import "../../styles/signup.css";

const Login = () => {
  const [emailAddress, setEmailAdress] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUseName] = useState("");
  const componentLoading = false;
  return (
    <div className="login-page">
      {/* <ToastContainer /> */}
      {/* <div className="header">VidzSpace</div> */}
      <div className="hero">
        <div className="signup-container">
          <div className="left">
            <div className="login-title">
              <p className="title-text">SignUp</p>
              <p className="subtitle-text">Welcome to VidzSpace</p>
            </div>
            <div className="input-fields">
              <Input
                // placeholder={"Password"}
                icon={<MdDriveFileRenameOutline className="text-white" />}
                inputState={userName}
                inputStateFunc={setUseName}
                type={"text"}
                label={"Name"}
              />
              <Input
                // placeholder={"Email Address"}
                icon={<TbMailFilled className="text-white" />}
                inputState={emailAddress}
                inputStateFunc={setEmailAdress}
                type={"text"}
                label={"Email"}
              />
              <Input
                // placeholder={"Password"}
                icon={<MdLockOutline className="text-white" />}
                inputState={password}
                inputStateFunc={setPassword}
                type={"password"}
                label={"Password"}
              />
              <motion.div className="login-button">
                <p>{!componentLoading ? "SIGNUP" : <InputLoader />}</p>
              </motion.div>
              <p className="text-center text-white">
                Have an account ? {"  "}
                <motion.button
                  onClick={() => navigate("/login")}
                  className="text-lg underline font-black text-white mt-5"
                >
                  Login
                </motion.button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
