const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  type: {
    type: String,
    enum: ["Repo Analysis", "Chat with Repo", "Handle Error"],
    required: true,
  },
  githubLink:{
    type:String,
    required:true,
  }, 
  filesSelected: [
    {
      type: String,
      required:true,
    },
  ],
}, {
  timestamps: true,
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;