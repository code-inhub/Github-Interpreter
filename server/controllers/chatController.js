const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");

// Create a new chat
exports.createChat = async (req, res, next) => {
  try {
    const {type, githubLink } = req.body;
    const {id} = req.user;
    const user = await User.findById(id);
    
    const pattern = /github\.com\/([\w-]+)\/([\w-]+)/;
    const match = githubLink.match(pattern);
    if (!match) {
      return next(new errorResponse("Invalid Github URL", 400)); 
    }

    if (!user) {
      return next(new errorResponse("User not found", 404));
    }

    const chat = await Chat.create({ user: id, type, githubLink });
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

    const message = await Message.create({ chatId: chatId, isUser, text });
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


// Controller to get all file names from the repository
exports.getFileNames = async (req, res, next) => {
  const { repo_url } = req.body;

  const pattern = /github\.com\/([\w-]+)\/([\w-]+)/;
  const match = repo_url.match(pattern);
  let url = "";
  if (match) {
    const username = match[1];
    const repo = match[2];
    url = `https://api.github.com/repos/${username}/${repo}/contents`;
  } else {
    return next(new errorResponse("Invalid URL", 400));
  }

  try {
    const response = await fetch(url);
    if (response.ok) {
      const jsonData = await response.json();
      const fileNames = [];

      const extractFileNames = (files) => {
        files.forEach((item) => {
          if (item.type === "file") {
            fileNames.push(item.name);
          } else if (item.type === "dir") {
            fetchDataForDirectory(item.url).then((subDirFiles) => {
              extractFileNames(subDirFiles);
            });
          }
        });
      };

      const fetchDataForDirectory = async (directoryUrl) => {
        const response = await fetch(directoryUrl);
        if (response.ok) {
          return await response.json();
        } else {
          throw new Error("Error fetching data from the API.");
        }
      };

      extractFileNames(jsonData);

      res.status(200).json({
        success: true,
        data: fileNames,
      });
    } else {
      throw new Error("Error fetching data from the API.");
    }
  } catch (err) {
    console.log(err);
    next(new errorResponse("Error fetching file names", 500));
  }
};