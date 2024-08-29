const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser")
const verifyJWT = require("./middlewares/authMiddleware");
//routes path
const authRoutes = require("./routes/authRoutes");

dotenv.config(); 

connectDB(); 

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());  
app.use(errorHandler);
 
const PORT = process.env.PORT || 8080;

// API routes 
// app.use("/", (req, res) => {
//   res.send("API is running...."); 
// } );
app.use("/api/v1/auth",  authRoutes); 
// app.use("/api/v1/openai", verifyJWT, require("./routes/openaiRoutes"));

//listen server
app.listen(PORT, () => { 
  console.log(
    `Server Running port no ${PORT}`);
});
  