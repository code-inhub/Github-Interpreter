const express = require("express");
const {
  
  codeCorrectionController,
  repoAnalysisController,
  handleErrorController,
  chatWithRepo,
  getFileNames,
} = require("../controllers/openaiController"); 

const { createChat, getChat, addMessage } = require("../controllers/chatController");
const router = express.Router();

// router.post("/summary", summaryController);
router.post("/code-correction/:chatId", codeCorrectionController);

router.post("/chat-Repo/:chatId",chatWithRepo)
router.post("/repo-Analysis/:chatId",repoAnalysisController);
router.post("/handle-Error/:chatId",handleErrorController);
router.post("/getFileNames",getFileNames);
router.post("/create-chat", createChat);
router.get("/get-chat/:chatId", getChat); 

router.post("/add-message", addMessage);
 
module.exports = router;  