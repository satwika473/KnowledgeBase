import React, { useState, useEffect, useRef } from "react";
import "./ChatBot.css";
import {
  FaStar,
  FaBars,
  FaPaperclip,
  FaMicrophone,
  FaPaperPlane,
  FaTrash,
} from "react-icons/fa";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const fetchChatHistory = async () => {
    try {
      const res = await fetch("http://localhost:3000/chats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setChatHistory(data);
      }
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const clearAllChats = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete all chats?");
    if (!confirmDelete) return;

    try {
      const res = await fetch("http://localhost:3000/chats", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        setMessages([]);
        setChatHistory([]);
        setCurrentChatId(null);
        setChatStarted(false);
        console.log("All chats cleared.");
      } else {
        console.error("Failed to clear chats.");
      }
    } catch (error) {
      console.error("Error clearing chats:", error);
    }
  };

  const sendMessage = async (msg, chatIdToUse) => {
    setIsTyping(true);
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ message: msg, chatId: chatIdToUse }),
    });
    const data = await res.json();
    setIsTyping(false);
    return data.reply;
  };

  const saveChat = async (chatIdToUse, allMessages) => {
    try {
      await fetch("http://localhost:3000/saveChat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ chatId: chatIdToUse, messages: allMessages }),
      });
      await fetchChatHistory();
    } catch (error) {
      console.error("Error saving chat:", error);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) {
      alert("Please enter a message before sending.");
      return;
    }

    if (!chatStarted) setChatStarted(true);

    const chatIdToUse = currentChatId || `chat_${Date.now()}`;
    if (!currentChatId) setCurrentChatId(chatIdToUse);

    const userMessage = { sender: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    const reply = await sendMessage(input, chatIdToUse);
    const botMessage = { sender: "bot", text: reply };
    const finalMessages = [...updatedMessages, botMessage];
    setMessages(finalMessages);

    await saveChat(chatIdToUse, finalMessages);
  };

  const startNewChat = () => {
    if (messages.length > 0 && currentChatId) {
      saveChat(currentChatId, messages);
    }
    setMessages([]);
    setCurrentChatId(`chat_${Date.now()}`);
    setChatStarted(false);
  };

  const loadChat = async (chatId) => {
    if (!chatId || chatId === "null") return;

    try {
      const res = await fetch(`http://localhost:3000/chat/${chatId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();

      if (res.status !== 200 || data.error) {
        setMessages([{ sender: "bot", text: "Chat not found or deleted." }]);
        setCurrentChatId(null);
        setChatStarted(false);
        return;
      }

      if (data && Array.isArray(data.messages)) {
        setMessages(data.messages);
        setCurrentChatId(chatId);
        setChatStarted(true);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("Failed to load chat:", error);
      setMessages([{ sender: "bot", text: "Error loading chat." }]);
    }
  };

  const handleDeleteChat = async (chatIdToDelete, e) => {
    e.stopPropagation();
    try {
      const res = await fetch(`http://localhost:3000/chat/${chatIdToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        setChatHistory((prev) =>
          prev.filter((chat) => chat.chatId !== chatIdToDelete)
        );
        if (currentChatId === chatIdToDelete) {
          setMessages([]);
          setCurrentChatId(null);
          setChatStarted(false);
          localStorage.clear();
        }
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  const handleMicClick = () => {
    if (!recognition) {
      alert("Speech recognition not supported.");
      return;
    }

    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.start();
    setIsListening(true);

    recognition.onstart = () => {
      console.log("Voice recognition started");
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        setInput((prev) => prev + finalTranscript);
        setIsListening(false);
      } else if (interimTranscript) {
        setInput(interimTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      console.log("Voice recognition ended");
      setIsListening(false);
    };
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="page-container">
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <button
            className="toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars />
          </button>
          <h2>Chat History</h2>
        </div>
        {sidebarOpen && (
          <>
            <button className="new-chat-btn" onClick={startNewChat}>
              + New Chat
            </button>
            <button onClick={clearAllChats} className="clear-all-btn">
              Clear All Chats
            </button>

            <ul className="history-list">
              {chatHistory.map((chat, idx) => (
                <li
                  key={chat.chatId || chat._id || `chat-${idx}`}
                  onClick={() => loadChat(chat.chatId)}
                  className={
                    currentChatId === chat.chatId ? "active-chat" : ""
                  }
                >
                  <span>Chat {idx + 1}</span>
                  <FaTrash
                    className="delete-icon"
                    onClick={(e) => handleDeleteChat(chat.chatId, e)}
                    title="Delete Chat"
                  />
                </li>
              ))}
            </ul>
          </>
        )} 
      </div>

      <div className={`chat-area ${sidebarOpen ? "shifted" : ""}`}>
        <div className="chat-messages">
          {!chatStarted && messages.length === 0 && (
            <div className="myplaceholder">How can I help you today?</div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-bubble ${msg.sender === "user" ? "user" : "bot"}`}
            >
              {msg.sender === "bot" && <FaStar className="star-icon" />}
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="chat-bubble bot typing">
              <span className="dot-flashing"></span>
            </div>
          )}
          {isListening && (
            <div className="chat-bubble bot typing">
              <span className="dot-flashing"></span> Listening...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-area">
          <button
            className="input-button blue disabled"
            title="This model doesn’t support attachments"
            onClick={(e) => e.preventDefault()}
            style={{ cursor: "not-allowed", opacity: 0.5, borderRadius: "30%" }}
          >
            <FaPaperclip />
          </button>

          <input
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something medical..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="input-button blue"
            onClick={handleMicClick}
            style={{ borderRadius: "30%" }}
          >
            <FaMicrophone />
          </button>
          <button className="send-button blue" onClick={handleSend}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
