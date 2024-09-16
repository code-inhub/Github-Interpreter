// const errorHandler = require("../middelwares/errorMiddleware");
const userModel = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");

// JWT TOKEN
exports.sendTokens = async (user, statusCode, res) => {
  const authToken = user.getSignedAuthToken();
  const refreshToken = user.getSignedRefreshToken();

  // Store the auth token in a cookie
  res.cookie("authToken", authToken, {
    httpOnly: true,
    //secure: true,
    maxAge: 15 * 60 * 1000,
  });

  // Store the refresh token in a cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    //secure: true,
    maxAge: 1 * 24 * 60 * 60 * 1000,
  }); 

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // Send a response without including the tokens in the body
  res.status(statusCode).json({
    success: true,
    message: "Tokens have been set in cookies",
  });
};

//REGISTER
exports.registerContoller = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    //exisitng user
    const exisitingEmail = await userModel.findOne({ email });
    if (exisitingEmail) {
      return next(new errorResponse("Email is already register", 500));
    }
    const user = await userModel.create({ username, email, password });
    this.sendTokens(user, 201, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//LOGIN
exports.loginController = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return next(new errorResponse("Please provide email or password"));
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new errorResponse("Invalid Creditial", 401));
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse("Invalid Creditial", 401));
    }
    //res
    this.sendTokens(user, 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
 
//LOGOUT
exports.logoutController = async (req, res) => {
  res.clearCookie("authToken");
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logout Succesfully",
  });
};
