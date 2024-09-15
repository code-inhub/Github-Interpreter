import React, { useContext, useEffect, useState } from "react";
import Input from "../AuthComponents/Input.jsx";
import { TbMailFilled } from "react-icons/tb";
import { MdLockOutline } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { motion } from "framer-motion";
import "../../styles/signup.css";
import { useNavigate } from "react-router-dom";
import { register } from "../../api.js";
import AuthContext from "../../context/auth/AuthContext.jsx";
import { toast } from "react-toastify";

const Login = () => {
  const [emailAddress, setEmailAdress] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const componentLoading = false;

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      let isToken = await getToken();
      if (isToken) {
        navigate("/");
      }
    };

    checkToken();
  }, [history]);

  const handleSubmit = () => {
    console.log("data", userName, emailAddress, password);
    register(userName, emailAddress, password)
      .then((data) => {
        toast.success("Signup Successful"); 
        console.log(data);
        navigate("/test");
      })
      .catch((error) => console.log(error));
  };

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
                inputStateFunc={setUserName}
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
              <motion.div className="login-button" onClick={handleSubmit}>
                <p>SIGNUP</p>
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
