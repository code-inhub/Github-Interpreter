const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  isUser: {
    type: Boolean,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;