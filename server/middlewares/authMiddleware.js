const errorResponse  = require("../utils/errorResponse.js");
const jwt = require("jsonwebtoken");
const  User= require("../models/userModel.js");
const verifyJWT = async (req, res, next) => {
  try {
    let token = req.cookies?.authToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return next(new errorResponse("Unauthorized request", 401));
    }

    let decodedToken;

    try {
      decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        // Access token expired, let's refresh it
        const refreshToken = req.cookies?.refreshToken;
 
        if (!refreshToken) {
          return next(new errorResponse("Refresh token missing, please login again", 401));
        }

        try {
          const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
          const user = await User.findById(decodedRefreshToken?._id);

          if (!user || user.refreshToken !== refreshToken) {
            return next(new errorResponse("Invalid refresh token, please login again", 401));
          }

          // Generate a new auth token
          token = jwt.sign({ _id: user._id }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: process.env.JWT_ACCESS_EXPIREIN,
          });

          // Update the auth token cookie
          res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 15 * 60 * 1000, // 15 minutes
          });

          decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET); // Decode the new token

        } catch (refreshError) {
          return next(new errorResponse("Invalid refresh token, please login again", 401));
        }
      } else {
        return next(new errorResponse("Invalid access token", 401));
      }
    }

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if (!user) {
      return next(new errorResponse("Invalid access token", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new errorResponse(error?.message || "Unauthorized request", 401));
  }
};

module.exports = verifyJWT;
