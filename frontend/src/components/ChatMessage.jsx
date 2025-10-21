import './ChatMessage.css';

export default function ChatMessage({ user, text, typing }) {
  const isUser = user === "You";

  return (
    <div className={`chat-row ${isUser ? "chat-user" : "chat-bot"}`}>
      <div className={`avatar ${isUser ? "avatar-user" : "avatar-bot"}`}>
        {user[0]}
      </div>
      <div className={`bubble ${isUser ? "bubble-user" : "bubble-bot"} ${typing ? "typing" : ""}`}>
        {text}
      </div>
    </div>
  );
}
