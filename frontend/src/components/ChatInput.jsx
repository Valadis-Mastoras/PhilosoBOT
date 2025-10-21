import './ChatInput.css';

export default function ChatInput({ message, setMessage, onSend }) {
  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);  // hook adds user + bot
    setMessage("");   // clear input immediately
  };

  return (
    <div className="input-area">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type your message..."
        className="chat-input"
      />
      <button onClick={handleSend} className="send-btn">
        Send
      </button>
    </div>
  );
}
