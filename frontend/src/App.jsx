import { useState } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const userMessage = input;
    setMessages([...messages, { sender: "user", text: userMessage }]);
    setInput("");

    const res = await axios.post("http://localhost:5000/chat", { message: userMessage });
    setMessages([...messages, { sender: "user", text: userMessage }, { sender: "bot", text: res.data.response }]);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="border p-2 h-80 overflow-y-scroll mb-2">
        {messages.map((m, i) => (
          <div key={i} className={m.sender === "user" ? "text-right" : "text-left"}>
            <span>{m.text}</span>
          </div>
        ))}
      </div>
      <input
        className="border p-1 w-3/4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button className="border p-1 ml-1" onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
