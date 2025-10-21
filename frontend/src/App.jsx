// frontend/src/App.jsx
import React, { useState, useRef, useEffect } from "react";

// Use conditional backend URL depending on environment
const backendUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/chat"
    : "http://backend:5000/chat";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isTyping]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { user: "You", text: message, time: new Date() };
    setChat(prev => [...prev, userMsg]);
    setMessage("");
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 500)); // simulate typing

    try {
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setChat(prev => [...prev, { user: "Bot", text: data.response, time: new Date() }]);
    } catch (err) {
      console.error(err);
      setChat(prev => [...prev, { user: "Bot", text: "Error: Could not get response.", time: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (date) => date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", fontFamily: "Arial, sans-serif", color: "#fff", padding: "20px" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px", textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}>PhilosoBOT</h1>

      <div style={{ backgroundColor: "#1f1f1f", borderRadius: "15px", width: "400px", maxWidth: "90%", height: "500px", display: "flex", flexDirection: "column", overflowY: "auto", padding: "15px", boxShadow: "0 5px 15px rgba(0,0,0,0.3)" }}>
        {chat.map((c, i) => (
          <div key={i} style={{ display: "flex", flexDirection: c.user === "You" ? "row-reverse" : "row", alignItems: "flex-end", margin: "5px 0" }}>
            <div style={{ width: 35, height: 35, borderRadius: "50%", backgroundColor: c.user === "You" ? "#667eea" : "#764ba2", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", margin: "0 10px", flexShrink: 0 }}>
              {c.user[0]}
            </div>
            <div style={{ backgroundColor: c.user === "You" ? "#667eea" : "#764ba2", color: "#fff", padding: "10px 15px", borderRadius: "15px", maxWidth: "70%", wordBreak: "break-word", boxShadow: "0 2px 5px rgba(0,0,0,0.2)", position: "relative" }}>
              <div style={{ fontSize: "0.85rem", opacity: 0.8, marginBottom: 3 }}>
                {c.user} • {formatTime(c.time)}
              </div>
              {c.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: "flex", alignItems: "center", margin: "5px 0" }}>
            <div style={{ width: 35, height: 35, borderRadius: "50%", backgroundColor: "#764ba2", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", marginRight: "10px" }}>B</div>
            <div style={{ backgroundColor: "#764ba2", padding: "10px 15px", borderRadius: "15px", maxWidth: "70%", fontStyle: "italic", color: "#fff", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}>
              Bot is typing...
            </div>
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      <div style={{ marginTop: "15px", display: "flex", width: "400px", maxWidth: "90%" }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          style={{ flex: 1, padding: "10px 15px", borderRadius: "15px 0 0 15px", border: "none", outline: "none", fontSize: "1rem" }}
        />
        <button
          onClick={sendMessage}
          style={{ backgroundColor: "#667eea", color: "#fff", border: "none", padding: "0 20px", borderRadius: "0 15px 15px 0", cursor: "pointer", fontWeight: "bold", fontSize: "1rem", transition: "background 0.3s" }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = "#556cd6"}
          onMouseOut={e => e.currentTarget.style.backgroundColor = "#667eea"}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
