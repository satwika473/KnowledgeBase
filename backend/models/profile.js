const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const User = require("../models/user");

// Multer setup
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// GET user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT upload profile image
router.put("/upload/:id", upload.single("profileImage"), async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { profileImage: req.file.filename },
      { new: true }
    );
    res.json({ profileImage: updatedUser.profileImage });
  } catch (err) {
    res.status(500).json({ message: "Image upload failed" });
  }
});

module.exports = router;
