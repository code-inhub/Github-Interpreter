const dotenv = require("dotenv");
dotenv.config();
const { getGithubCode } = require("./scrapGithub");
const { OpenAI } = require("openai");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const { getFileNames } = require("./scrapFileNames");
const { Readable } = require('stream');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

const generateSummary = async (previousSummary, newQuestions, aiResponse) => {
  try {
    const data = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a summarization assistant. Your task is to generate a concise summary incorporating the previous summary, new questions, and the latest AI response to maintain context for future queries.",
        },
        {
          role: "user",
          content: `Here is the previous summary of the conversation: ${previousSummary}`,
        },
        {
          role: "user",
          content: `These are the new questions from the user: ${newQuestions}`,
        },
        {
          role: "user",
          content: `This is the latest response from the AI: ${aiResponse}`,
        },
      ],
    });
    

    if (data && data.choices[0].message.content) {
      return data.choices[0].message.content;
    } else {
      throw new Error("No valid response from OpenAI");
    }
  } catch (err) {
    console.error("Error generating summary:", err);
    throw err;
  }
};

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
            "You are a code assistant. Your task is to assist the user with their queries related to the provided repository. Provide detailed and accurate responses based on the user's message and the repository code. Give necessary codes and examples wherever necessary.",
        },
        {
          role: "user",
          content: `Previous conversation summary: ${chat.summary}`,
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

      const previousSummary = chat.summary || "";
      const newSummary = await generateSummary(previousSummary, userMessageContent, data.choices[0].message.content);

      chat.summary = newSummary; 
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

    // Get code from GitHub repository
    const code = await getGithubCode(chat.githubLink, chatId);

    if (!code || !code.trim()) {
      return res.status(400).json({ message: "Code is empty or not found." });
    }

    // Set headers for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Create a Readable stream
    const stream = new Readable({
      read() {}
    });

    stream.pipe(res);  // Pipe the readable stream to the response

    let fullMessage = '';

    try {
      // Stream the response from OpenAI
      const openaiStream = await openai.chat.completions.create({
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
        stream: true,
      });

      for await (const chunk of openaiStream) {
        const message = chunk.choices[0]?.delta?.content || '';

        // Check if the message is not empty
        if (message.trim()) {
          fullMessage += message;
          stream.push(`data: ${message}\n\n`);
        }
      }

      // Once streaming is done, close the stream
      stream.push(null);
    } catch (err) {
      console.error("Error streaming from OpenAI:", err);
      return res.status(500).json({ message: "Error streaming from OpenAI", error: err.message });
    }

    // Ensure we have a valid message before saving to the database
    // console.log("Full message:", fullMessage);
    if (fullMessage.trim()) {
      try {
        const userMessage = await Message.create({
          chatId,
          text: "Repo Analysis Question(summarization)",
          isUser: true,
        });
        const aiMessage = await Message.create({
          chatId,
          text: fullMessage,
          isUser: false,
        });

        chat.messages.push(userMessage._id);
        chat.messages.push(aiMessage._id);
        await chat.save();
      } catch (dbErr) {
        console.error("Error saving message to the database:", dbErr);
        return res.status(500).json({ message: "Error saving message to the database", error: dbErr.message });
      }
    } else {
      console.warn("No valid message to save to the database.");
      return res.status(400).json({ message: "No valid message from OpenAI to save." });
    }

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: err.message });
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
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an advanced error handling assistant. Your task is to analyze the provided error description, code, and file structure, and offer a detailed explanation of the error. Provide step-by-step corrections, explain why the changes are necessary, and suggest improvements where applicable.",
        },
        {
          role: "user",
          content: `Previous conversation summary: ${chat.summary}`,
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

      // Generate a new summary after the AI response is generated
      const previousSummary = chat.summary || "";
      const newSummary = await generateSummary(previousSummary, errorDescription, data.choices[0].message.content);

      chat.summary = newSummary; // Store the new summary in the chat object
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
