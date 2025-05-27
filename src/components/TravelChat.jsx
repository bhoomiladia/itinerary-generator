import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import "./TravelChat.css";
import { useNavigate } from "react-router-dom";

const TravelChat = () => {
  const [messages, setMessages] = useState([
    {
      from: "agent",
      text: "Hi! I’m your travel buddy. Ask me for suggestions!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://ai-travel-buddy.onrender.com/suggest-place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          session_id: sessionId,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { from: "agent", text: data.reply || "Sorry, no suggestion found." },
      ]);
      if (data.session_id && !sessionId) {
        setSessionId(data.session_id);
        localStorage.setItem("travel_chat_session", data.session_id);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          from: "agent",
          text: "Oops! Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedSession = localStorage.getItem("travel_chat_session");
    if (savedSession) setSessionId(savedSession);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const navigate = useNavigate();

  return (
    <div className="body">
      <nav className=" absolute top-0 left-0 w-full flex justify-between items-center px-8 py-4 text-white">
        <ul className=" mt-4 ml-2 flex gap-8">
          <li
            onClick={() => navigate("/Options")}
            className="relative cursor-pointer group pb-2 inline-block hover:text-blue-200 transition-color duration-300"
          >
            Home
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-10 h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </li>
          <li className="relative group pb-2 inline-block cursor-pointer hover:text-blue-200 transition-color duration-300">
            About{" "}
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-10 h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </li>
          <li className="relative cursor-pointer group pb-2 inline-block r hover:text-blue-200 transition-color duration-300">
            Gallery{" "}
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-10 h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </li>
        </ul>
      </nav>
      <div className="chat-container">
        <div className="chat-header">
          <span role="img" aria-label="plane">
            ✈️
          </span>{" "}
          Travel Buddy
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("travel_chat_session");
            setSessionId(null);
            setMessages([
              {
                from: "agent",
                text: "Hi! I’m your travel buddy. Ask me for suggestions!",
              },
            ]);
          }}
          className=" bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Clear Chat
        </button>
        <div className="messages-panel">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message-bubble ${
                msg.from === "user" ? "user" : "agent"
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}
          {loading && (
            <div className="message-bubble agent loading">
              <span className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-bar">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="Ask about destinations, budgets, or itineraries..."
          />
          <button onClick={sendMessage} disabled={loading || !input.trim()}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelChat;
