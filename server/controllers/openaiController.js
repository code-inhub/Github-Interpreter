const dotenv = require("dotenv");
dotenv.config();
const {getGithubCode} = require("./scrapGithub");
const { OpenAI } = require("openai");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");

const openai = new OpenAI(process.env.OPENAI_API_KEY);

exports.codeCorrectionController = async (req, res) => {
  try {
    const {chatId} = req.params;
    const { repoUrl,issue } = req.body;

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
      return res.status(500).json({ message: "Error retrieving chat", error: err.message });
    } 

    const code = await getGithubCode(repoUrl);

    const data  = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a code correction, completion, and explaining assistant. You need to provide the user appropriate and correct results after understanding their code. Provide necessary code if needed. You will be provided with all the file codes and their paths. Also, send all responses at once.",
        }, 
        { 
          role: "user", 
          content: `Problem Description: ${issue}`,
        },
        {
          role: "user", 
          content: `Code: ${code}`, 
        },
      ],
    });
    
    if (data && data.choices[0].message.content) {
      const userMessage = await Message.create({ chatId,text:issue,isUser:true }); 
      const aiMessage = await Message.create({ chatId,text:data.choices[0].message.content,isUser:false });
      chat.messages.push(userMessage._id);
      chat.messages.push(aiMessage._id);

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


// exports.summaryController = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const { data } = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `Summarize this \n${text}`,
//       max_tokens: 500,
//       temperature: 0.5,
//     });
//     if (data) {
//       if (data.choices[0].text) {
//         return res.status(200).json(data.choices[0].text);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(404).json({
//       message: err.message,
//     });
//   }
// };
// exports.paragraphController = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const { data } = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `write a detail paragraph about \n${text}`,
//       max_tokens: 500,
//       temperature: 0.5,
//     });
//     if (data) {
//       if (data.choices[0].text) {
//         return res.status(200).json(data.choices[0].text);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(404).json({
//       message: err.message,
//     });
//   }
// };
// exports.chatbotController = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const { data } = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `Answer question similar to how yoda from star war would.
//       Me: 'what is your name?'
//       yoda: 'yoda is my name'
//       Me: ${text}`,
//       max_tokens: 300,
//       temperature: 0.7,
//     });
//     if (data) {
//       if (data.choices[0].text) {
//         return res.status(200).json(data.choices[0].text);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(404).json({
//       message: err.message,
//     });
//   }
// };
// exports.jsconverterController = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const { data } = await openai.createCompletion({
//       model: "text-davinci-002",
//       prompt: `/* convert these instruction into javascript code \n${text}`,
//       max_tokens: 400,
//       temperature: 0.25,
//     });
//     if (data) {
//       if (data.choices[0].text) {
//         return res.status(200).json(data.choices[0].text);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(404).json({
//       message: err.message,
//     });
//   }
// };
// exports.scifiImageController = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const { data } = await openai.createImage({
//       prompt: `generate a scifi image of ${text}`,
//       n: 1,
//       size: "512x512",
//     });
//     if (data) {
//       if (data.data[0].url) {
//         return res.status(200).json(data.data[0].url);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(404).json({
//       message: err.message,
//     });
//   }
// };