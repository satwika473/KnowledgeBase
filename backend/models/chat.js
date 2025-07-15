const mongoose = require("mongoose");


const chatSchema = new mongoose.Schema({
  articleId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});



module.exports = mongoose.model("Chat", chatSchema);
