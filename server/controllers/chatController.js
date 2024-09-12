const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");

// Create a new chat
exports.createChat = async (req, res, next) => {
  try {
    const {type} = req.body;
    const {id} = req.user;
    const user = await User.findById(id);

    if (!user) {
      return next(new errorResponse("User not found", 404));
    }

    const chat = await Chat.create({ user: id,type });
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
    const { chatId, isUser, text } = req.body;
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return next(new errorResponse("Chat not found", 404));
    }

    const message = await Message.create({ chat: chatId, isUser, text });
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

exports.getChat = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId).populate("messages");

    if (!chat) {
      return next(new errorResponse("Chat not found", 404));
    }

    res.status(200).json({
      success: true,
      data: chat,
    });
  } catch (error) {
    next(error);
  }
};