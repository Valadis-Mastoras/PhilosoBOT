import ChatMessage from "./ChatMessage";
import './ChatContainer.css';

export default function ChatContainer({ chat, isTyping, chatEndRef }) {
  return (
    <div className="chat-container">
      {chat.map((c, i) => (
        <ChatMessage key={i} user={c.user} text={c.text} />
      ))}

      {/* Bot typing indicator */}
      {isTyping && <ChatMessage user="Bot" text="Bot is typing..." typing />}

      <div ref={chatEndRef}></div>
    </div>
  );
}
