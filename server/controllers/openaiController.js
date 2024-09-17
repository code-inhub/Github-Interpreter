const dotenv = require("dotenv");
dotenv.config();
const { getGithubCode } = require("./scrapGithub");
const { OpenAI } = require("openai");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const { getFileNames } = require("./scrapFileNames");

const openai = new OpenAI(process.env.OPENAI_API_KEY);

exports.codeCorrectionController = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { issue } = req.body;

    // Find or create a chat
    let chat;
    try {
      if (chatId) {
        chat = await Chat.findById(chatId);
        if (!chat) {
          return res.status(400).json({ message: "Chat not found" });
        }
      } else {
        return res.status(400).json({ message: "Chat ID is required" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error retrieving chat", error: err.message });
    }

    // const code = await getGithubCode(repoUrl);

    // Mocked OpenAI response
    const mockedOpenAIResponse = {
      choices: [
        {
          message: {
            content:
              "This is a mocked response from OpenAI for testing purposes.",
          },
        },
      ],
    };

    const data = mockedOpenAIResponse;

    if (data && data.choices[0].message.content) {
      const userMessage = await Message.create({
        chatId: chat._id,
        text: issue,
        isUser: true,
      });
      const aiMessage = await Message.create({
        chatId: chat._id,
        text: data.choices[0].message.content,
        isUser: false,
      });

      chat.messages.push(userMessage._id);
      chat.messages.push(aiMessage._id);
      await chat.save();

      return res.status(200).json({ userMessage, aiMessage });
    } else {
      return res.status(400).json({ message: "No valid response from OpenAI" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.chatWithRepo = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { userMessageContent } = req.body;

    // Find or create a chat
    let chat;
    try {
      if (chatId) {
        chat = await Chat.findById(chatId);
        if (!chat) {
          return res.status(400).json({ message: "Chat not found" });
        }
      } else {
        return res.status(400).json({ message: "Chat ID is required" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error retrieving chat", error: err.message });
    }

    const code = await getGithubCode(chat.githubLink, chatId);

    const data = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a code assistant. Your task is to assist the user with their queries related to the provided repository. Provide detailed and accurate responses based on the user's message and the repository code. Give necessay codes and examples wherever necessary.",
        },
        {
          role: "user",
          content: `User Message: ${userMessageContent}`,
        },
        {
          role: "user",
          content: `Repository Code: ${code}`,
        },
      ],
      // stream: true,
    });

    if (data && data.choices[0].message.content) {
      const userMessage = await Message.create({
        chatId: chat._id,
        text: userMessageContent,
        isUser: true,
      });
      const aiMessage = await Message.create({
        chatId: chat._id,
        text: data.choices[0].message.content,
        isUser: false,
      });

      chat.messages.push(userMessage._id);
      chat.messages.push(aiMessage._id);
      await chat.save();

      return res.status(200).json({ userMessage, aiMessage });
    } else {
      return res.status(400).json({ message: "No valid response from OpenAI" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.repoAnalysisController = async (req, res) => {
  try {
    const { chatId } = req.params;

    // Find or create a chat
    let chat;
    try {
      if (chatId) {
        chat = await Chat.findById(chatId);
        if (!chat) {
          return res.status(400).json({ message: "Chat not found" });
        }
      } else {
        return res.status(400).json({ message: "Chat ID is required" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error retrieving chat", error: err.message });
    }

    const code = await getGithubCode(chat.githubLink, chatId);

    const data = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a code analysis assistant. Your task is to thoroughly analyze the provided code and give a detailed summary, explaining the structure, functionality, and key components. Highlight important features, coding patterns, and any potential issues or improvements.",
        },
        {
          role: "user",
          content: `Repository Code: ${code}`,
        },
      ],
      // stream: true,
    });

    if (data && data.choices[0].message.content) {
      const userMessage = await Message.create({
        chatId,
        text: "Repo Analysis Question(summarization)",
        isUser: true,
      });
      const aiMessage = await Message.create({
        chatId,
        text: data.choices[0].message.content,
        isUser: false,
      });
      chat.messages.push(userMessage._id);
      chat.messages.push(aiMessage._id);
      await chat.save();

      return res.status(200).json({ userMessage, aiMessage });
    } else {
      return res.status(400).json({ message: "No valid response from OpenAI" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message, 
    });
  }
};

exports.handleErrorController = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { errorDescription } = req.body;

    // Find or create a chat
    let chat;
    try {
      if (chatId) {
        chat = await Chat.findById(chatId);
        if (!chat) {
          return res.status(400).json({ message: "Chat not found" });
        }
      } else {
        return res.status(400).json({ message: "Chat ID is required" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error retrieving chat", error: err.message });
    }

    const code = await getGithubCode(chat.githubLink, chatId);

    const data = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an advanced error handling assistant. Your task is to analyze the provided error description, code, and file structure, and offer a detailed explanation of the error. Provide step-by-step corrections, explain why the changes are necessary, and suggest improvements where applicable.",
        },
        {
          role: "user",
          content: `Error Description: ${errorDescription}`,
        },
        {
          role: "user",
          content: `Code: ${code}`,
        },
        // {
        //   role: "user",
        //   content: `File Structure: ${fileStructure}`,
        // },
      ],
      // stream: true,
    });
    if (data && data.choices[0].message.content) {
      const userMessage = await Message.create({
        chatId,
        text: errorDescription,
        isUser: true,
      });
      const aiMessage = await Message.create({
        chatId,
        text: data.choices[0].message.content,
        isUser: false,
      });
      chat.messages.push(userMessage._id);
      chat.messages.push(aiMessage._id);
      await chat.save();

      return res.status(200).json({ userMessage, aiMessage });
    } else {
      return res.status(400).json({ message: "No valid response from OpenAI" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

// Controller to get all file names from the repository
exports.getFileNames = async (req, res) => {
  try {
    const { repo_url } = req.body;
    const fileNames = await getFileNames(repo_url);
    return res.status(200).json({ fileNames });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};
