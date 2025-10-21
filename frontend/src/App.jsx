// frontend/src/App.jsx
import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;
    setChat([...chat, { user: "You", text: message }]);

    const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
    });
    const data = await res.json();

    setChat([...chat, { user: "You", text: message }, { user: "Bot", text: data.response }]);
    setMessage("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>PhilosoBOT</h1>
      <div style={{ border: "1px solid #ccc", padding: 10, height: 300, overflow: "auto" }}>
        {chat.map((c, i) => (
          <div key={i}><b>{c.user}:</b> {c.text}</div>
        ))}
      </div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
