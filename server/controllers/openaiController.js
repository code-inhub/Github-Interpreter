const dotenv = require("dotenv");
dotenv.config();
const {getGithubCode} = require("./scrapGithub");
const { OpenAI } = require("openai");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");

// const openai = new OpenAI(process.env.OPENAI_API_KEY);

// exports.codeCorrectionController = async (req, res) => {
//   try {
//     const {chatId} = req.params;
//     const { repoUrl,issue } = req.body;

//     // Find or create a chat
//     let chat;
//     try {
//       if (chatId) {
//         chat = await Chat.findById(chatId);
//         if (!chat) {
//           return res.status(400).json({ message: "Chat not found" });
//         }
//       } else {
//         return res.status(400).json({ message: "Chat ID is required" });
//       }
//     } catch (err) {
//       return res.status(500).json({ message: "Error retrieving chat", error: err.message });
//     } 

//     const code = await getGithubCode(repoUrl);

//     const data  = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "system",
//           content: "You are a code correction, completion, and explaining assistant. You need to provide the user appropriate and correct results after understanding their code. Provide necessary code if needed. You will be provided with all the file codes and their paths. Also, send all responses at once.",
//         }, 
//         { 
//           role: "user", 
//           content: `Problem Description: ${issue}`,
//         },
//         {
//           role: "user", 
//           content: `Code: ${code}`, 
//         },
//       ],
//     });
    
//     if (data && data.choices[0].message.content) {
//       const userMessage = await Message.create({ chatId,text:issue,isUser:true }); 
//       const aiMessage = await Message.create({ chatId,text:data.choices[0].message.content,isUser:false });
//       chat.messages.push(userMessage._id);
//       chat.messages.push(aiMessage._id);

//       return res.status(200).json({ userMessage, aiMessage });
//     } else {
//       return res.status(400).json({ message: "No valid response from OpenAI" });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       message: err.message,
//     });
//   }
// };


exports.codeCorrectionController = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { repoUrl, issue } = req.body;

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

    // const code = await getGithubCode(repoUrl);

    // Mocked OpenAI response
    const mockedOpenAIResponse = {
      choices: [
        {
          message: {
            content: "This is a mocked response from OpenAI for testing purposes.",
          },
        },
      ],
    };

    const data = mockedOpenAIResponse;

    if (data && data.choices[0].message.content) {
      const userMessage = await Message.create({ chatId: chat._id, text: issue, isUser: true });
      const aiMessage = await Message.create({ chatId: chat._id, text: data.choices[0].message.content, isUser: false });

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
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Summarize this \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};


exports.handleErrorController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `write a detail paragraph about \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};


exports.codeGenerationController = async (req, res) => {
  try{
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Write a code snippet to \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }       
};

