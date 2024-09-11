const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");

// Create a new chat
exports.createChat = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return next(new errorResponse("User not found", 404));
    }

    const chat = await Chat.create({ user: userId });
    user.chats.push(chat._id);
    await user.save();

    res.status(201).json({
      success: true,
      data: chat,
    });
  } catch (error) {
    next(error);
  }
};

// Add a message to a chat
exports.addMessage = async (req, res, next) => {
  try {
    const { chatId, sender, text } = req.body;
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return next(new errorResponse("Chat not found", 404));
    }

    const message = await Message.create({ chat: chatId, sender, text });
    chat.messages.push(message._id);
    await chat.save();

    res.status(201).json({
      success: true,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};