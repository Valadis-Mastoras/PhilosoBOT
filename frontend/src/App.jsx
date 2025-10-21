// frontend/src/App.jsx
import React, { useState, useRef, useEffect } from "react";

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

    await new Promise(r => setTimeout(r, 300));

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

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      width: "100vw",
      backgroundColor: "#343541",
      color: "#fff",
      fontFamily: "Inter, sans-serif",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
    }}>
      {/* Chat header */}
      <div style={{
        padding: "16px",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "1.25rem",
        borderBottom: "1px solid #444",
      }}>
        PhilosoBOT
      </div>

      {/* Chat container */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}>
        {chat.map((c, i) => (
          <div key={i} style={{
            display: "flex",
            flexDirection: c.user === "You" ? "row-reverse" : "row",
            alignItems: "flex-start",
            gap: "10px",
          }}>
            {/* Avatar */}
            <div style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: c.user === "You" ? "#10a37f" : "#444654",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "1rem",
              flexShrink: 0,
            }}>{c.user[0]}</div>

            {/* Message bubble */}
            <div style={{
              backgroundColor: c.user === "You" ? "#10a37f" : "#444654",
              padding: "12px 16px",
              borderRadius: "12px",
              maxWidth: "70%",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              lineHeight: "1.5",
            }}>
              {c.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: "#444654",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}>B</div>
            <div style={{
              backgroundColor: "#444654",
              padding: "12px 16px",
              borderRadius: "12px",
              fontStyle: "italic",
              color: "#ccc",
              maxWidth: "70%",
            }}>
              Bot is typing...
            </div>
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* Input area */}
      <div style={{
        padding: "12px 16px",
        display: "flex",
        gap: "10px",
        borderTop: "1px solid #444",
        backgroundColor: "#40414f",
      }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            backgroundColor: "#343541",
            color: "#fff",
            fontSize: "1rem",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "0 18px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#10a37f",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = "#0d826a"}
          onMouseOut={e => e.currentTarget.style.backgroundColor = "#10a37f"}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
