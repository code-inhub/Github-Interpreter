const express = require("express");
const { createChat, addMessage } = require("../controllers/chatController");
const router = express.Router();

router.post("/create-chat", createChat);
router.post("/add-message", addMessage);

module.exports = router;