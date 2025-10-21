// src/hooks/useChat.js
import { useState } from "react";

export function useChat(backendUrl) {
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  async function sendMessage(message) {
    if (!message.trim()) return;

    const userMsg = { user: "You", text: message, time: new Date() };
    setChat(prev => [...prev, userMsg]);

    setIsTyping(true);

    try {
      await new Promise(r => setTimeout(r, 300)); // simulate typing
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setChat(prev => [
        ...prev,
        { user: "Bot", text: data.response, time: new Date() },
      ]);
    } catch (err) {
      setChat(prev => [
        ...prev,
        { user: "Bot", text: "Error: Could not get response.", time: new Date() },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return { chat, isTyping, sendMessage };
}
