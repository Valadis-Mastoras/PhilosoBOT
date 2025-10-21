// src/App.jsx
import React, { useState, useRef, useEffect } from "react";
import { useChat } from "./hooks/useChat";
import ChatHeader from "./components/ChatHeader";
import ChatContainer from "./components/ChatContainer";
import ChatInput from "./components/ChatInput";
import "./App.css";

const backendUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/chat"
    : "http://backend:5000/chat";

function App() {
  const { chat, isTyping, sendMessage } = useChat(backendUrl);
  const [message, setMessage] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isTyping]);

  return (
    <div className="app">
      <ChatHeader />
      <ChatContainer chat={chat} isTyping={isTyping} chatEndRef={chatEndRef} />
      <ChatInput message={message} setMessage={setMessage} onSend={sendMessage} />
    </div>
  );
}

export default App;
