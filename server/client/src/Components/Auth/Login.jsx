import { useContext, useState, useEffect } from "react";
import Input from "../AuthComponents/Input.jsx";
import { TbMailFilled } from "react-icons/tb";
import { MdLockOutline } from "react-icons/md";
import { motion } from "framer-motion";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import { getToken, login } from "../../api.js";
import AuthContext from "../../context/auth/AuthContext.jsx";

const Login = () => {
  const [emailAddress, setEmailAdress] = useState("");
  const [password, setPassword] = useState("");

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
    login(emailAddress, password)
      .then((response) => {
        if (response && response.status === 200) {
          console.log(response.data);
          navigate("/");
        } else {
          // add pop notification : incorrect email Id or password
          console.log("Login failed");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("Login failed");
      });
  };

  return (
    <div className="login-page">
      {/* <ToastContainer /> */}
      {/* <div className="header">VidzSpace</div> */}
      <div className="hero">
        <div className="login-container">
          <div className="left">
            <div className="login-title">
              <p className="title-text">Login</p>
              <p className="subtitle-text">Welcome to VidzSpace</p>
            </div>
            <div className="input-fields">
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
                <p>LOGIN</p>
              </motion.div>
              <p className="text-center text-white">
                Don't have an account ? {"  "}
                <motion.button
                  onClick={() => navigate("/signup")}
                  className="text-lg underline font-black text-white mt-5"
                >
                  Sign Up
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
