const express = require("express");
const {
  registerContoller,
  loginController,
  logoutController,
} = require("../controllers/authController");

const verifyJWT = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//routes
// REGISTER
router.post("/register", registerContoller);

//LOGIN
router.post("/login", loginController);

//LOGOUT
router.get("/logout", verifyJWT, logoutController);

// VERIFY TOKEN
router.get("/verify-token", verifyJWT, (req, res) => {
  //console.log(JSON.stringify(req));
  res
    .status(200)
    .json({ success: true, message: "Token is valid", user: req.user });
});

module.exports = router;
