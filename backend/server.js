const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Chat = require("./models/chat");
const chatRoute = require("./open"); // Your /chat route (LLM)
const authenticate = require("./middleware/authToken"); // Authentication middleware
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser()); 

// ChatBot response endpoint (LLM)
app.use("/chat", chatRoute);

// MongoDB Connection
mongoose
  .connect(process.env.mongo_url)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Multer setup
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Register route
app.post("/register", upload.single("file"), async (req, res) => {
  try {
    const { name, email, password, dob, residential, permanent } = req.body;
    const filePath = req.file ? req.file.path : null;
    const user1 = new User({
      name,
      email,
      password,
      dob,
      residential,
      permanent,
      filePath,
    });
    await user1.save();
    res.status(200).send("success");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error registering user");
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.jwt_token,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
            httpOnly: true,
            sameSite: "Lax",
            secure: false, // set to true in production with HTTPS
        }).json({ msg: "Logged in" });
  } catch (err) {
    console.error("Login failed:", err);
    res.status(500).json({ error: "Login error" });
  }
});

// Get all users
app.get("/user", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ msg: "Unauthorized" });
    const user = jwt.verify(token, "secret");
    const users = await User.find({userId: user.id});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not retrieve users" });
  }
});

// Save or update chat (upsert)
const { v4: uuidv4 } = require('uuid');


app.post("/saveArticle", async (req, res) => {
  try {
    let { articleId, email, title, content, tags } = req.body;

    // Validate required fields
    if (!title || !content || !email) {
      return res.status(400).json({ error: "Title, content, and email are required." });
    }

    // Auto-generate articleId if not provided
    if (!articleId) {
      articleId = uuidv4();
    }

    // Clean/parse tags if string
    if (typeof tags === "string") {
      tags = tags.split(",").map(tag => tag.trim());
    }

    // Find existing or insert new
    const saved = await Chat.findOneAndUpdate(
      { articleId },
      { articleId, title, content, tags, email },
      { upsert: true, new: true }
    );

    res.status(201).json({
      message: "✅ Article saved successfully.",
      article: saved,
    });
  } catch (err) {
    console.error("❌ Error saving article:", err);
    res.status(500).json({ error: "Failed to save article" });
  }
});

 



// Get all chats
app.get("/articles", async (req, res) => {
  try {
    const allArticles = await Chat.find().sort({ createdAt: -1 }); // newest first (optional)
    res.json(allArticles);
  } catch (err) {
    console.error("Error fetching articles:", err);
    res.status(500).json({ error: "Failed to get articles" });
  }
});
//update article
app.put("/articles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedArticle = await Chat.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json(updatedArticle);
  } catch (err) {
    console.error("Error updating article:", err);
    res.status(500).json({ error: "Failed to update article" });
  }
});


// Get chat by ID
app.get("/chat/:chatId", async (req, res) => {
  try {
    const chat = await Chat.findOne({ chatId: req.params.chatId });
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    res.json(chat);
  } catch (err) {
    console.error("Error fetching chat:", err);
    res.status(500).json({ error: "Failed to get chat" });
  }
});
// Delete chat by ID
app.delete("/articles/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Chat.findByIdAndDelete(id); // Assuming "Chat" is your Article model

    if (!result) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/chats", async (req, res) => {
  try {
    await Chat.deleteMany({});
    res.json({ message: "All chats deleted successfully" });
  } catch (err) {
    console.error("Error deleting chats:", err);
    res.status(500).json({ error: "Failed to delete chats" });
  }
});
 

// GET user by email
// app.get("/email/:email", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.params.email });
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });
app.get("/email/:email", async (req, res) => {
  try {
    console.log("Looking for email:", req.params.email); // DEBUG
    const myuser = await User.findOne({ email: req.params.email });
    if (!myuser) return res.status(404).json({ message: "User not found" });
    res.json(myuser);
  } catch (err) {
    console.error("Error in /email/:email:", err); // DEBUG
    res.status(500).json({ message: "Server error" });
  }
});




// Start server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
