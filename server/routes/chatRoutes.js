const express = require("express");
const {
  // summaryController,
  // paragraphController,
  // chatbotController,
  // jsconverterController,
  // scifiImageController,
  codeCorrectionController,
} = require("../controllers/openaiController"); 

const { createChat, addMessage } = require("../controllers/chatController");
const router = express.Router();

//route
// router.post("/summary", summaryController);
router.post("/code-correction/:chatId", codeCorrectionController);


router.post("/create-chat", createChat);
router.post("/add-message", addMessage);

module.exports = router;