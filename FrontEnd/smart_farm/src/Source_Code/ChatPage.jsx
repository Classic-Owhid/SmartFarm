import React, { useState } from "react";
import "./CSS/ChatPage.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! Ask me about crops." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { from: "user", text: input }]);

    try {
      // Call Django backend
     const res = await fetch("http://127.0.0.1:8000/chatbot/ask", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: input }) // must be 'message'
});


      const data = await res.json();
      const answerText = data.reply || "No info found"; // <-- matches backend

      // Add bot response
      setMessages((prev) => [...prev, { from: "bot", text: answerText }]);
    } catch (err) {
      setMessages((prev) => [...prev, { from: "bot", text: "Error connecting to backend." }]);
    }

    setInput(""); // clear input
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat-page-container">
      <h2>SmartFarm Chatbot</h2>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.from}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
