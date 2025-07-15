const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_API_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";

// In-memory conversation history (optional)
let conversation_history = [];

// Simulated "system prompt" for medical context
const system_prompt = `You are Medibot, a helpful and accurate AI-powered medical assistant. 
You answer health-related questions clearly, based on publicly available medical knowledge.
You do not provide personal diagnoses or replace medical professionals.
Always encourage users to consult a real doctor when symptoms are serious.`

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const fetch = (await import("node-fetch")).default;

    // Combine the system prompt and user's message
    const fullPrompt = `${system_prompt}\n\nUser: ${message}\nMedibot:`;

    const payload = {
      inputs: fullPrompt,
      parameters: {
        max_new_tokens: 200,
        temperature: 0.7,
        top_p: 0.9,
        repetition_penalty: 1.1
      }
    };

    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HuggingFace API error: ${errorText}`);
    }

    const data = await response.json();
    const reply = data[0]?.generated_text?.split("Medibot:")?.[1]?.trim() || "I'm sorry, I couldn't understand that.";

    // Store conversation history (optional)
    conversation_history.push({ user: message, bot: reply });

    res.json({ reply });
  } catch (error) {
    console.error("Error from model:", error.message);
    res.status(500).json({ error: "Something went wrong on the server." });
  }
});

module.exports = router;
