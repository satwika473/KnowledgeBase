// src/components/CreateArticle.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const CreateArticle = () => {
  const [form, setForm] = useState({
    email: "",
    title: "",
    content: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setForm((prev) => ({ ...prev, email }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const articleData = {
      ...form,
      articleId: uuidv4(),
      tags: form.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      await axios.post("http://localhost:5000/saveArticle", articleData);
      alert("✅ Article submitted successfully!");
      setForm({ email: form.email, title: "", content: "", tags: "" });
    } catch (err) {
      console.error("Submission error:", err);
      alert("❌ Failed to submit article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container mt-5 mb-5 p-4"
      style={{
        maxWidth: "720px",
        background: "linear-gradient(145deg, #f0fdf4, #d1fae5)",
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(16, 185, 129, 0.2)",
        fontFamily: "Poppins, sans-serif",
        border: "1px solid #a7f3d0"
      }}
    >
      <h2
        className="mb-4"
        style={{
          color: "#065f46",
          fontWeight: 600,
          borderBottom: "2px solid #10b981",
          paddingBottom: "8px"
        }}
      >
        📝 Create a New Article
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          className="form-control mb-3"
          placeholder="User email"
          value={form.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="title"
          className="form-control mb-3"
          placeholder="Article Title"
          value={form.title}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <textarea
          name="content"
          className="form-control mb-3"
          placeholder="Write your article..."
          rows="6"
          value={form.content}
          onChange={handleChange}
          required
          style={{ ...inputStyle, resize: "vertical" }}
        ></textarea>
        <input
          type="text"
          name="tags"
          className="form-control mb-4"
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={handleChange}
          style={inputStyle}
        />
        <button
          type="submit"
          className="btn w-100"
          disabled={loading}
          style={{
            backgroundColor: loading ? "#6ee7b7" : "#10b981",
            color: "white",
            fontWeight: "600",
            fontSize: "1rem",
            padding: "10px",
            border: "none",
            borderRadius: "10px",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 10px rgba(16, 185, 129, 0.3)",
            cursor: "pointer"
          }}
        >
          {loading ? "Submitting..." : "✅ Submit Article"}
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: "12px 16px",
  fontSize: "1rem",
  borderRadius: "10px",
  border: "1px solid #a7f3d0",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
};

export default CreateArticle;
