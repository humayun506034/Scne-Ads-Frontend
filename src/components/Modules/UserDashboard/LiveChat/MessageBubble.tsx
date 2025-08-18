import { ChatMessage } from ".";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const mine = message.sender === "user";
  return (
    <div className={`p-4 ${mine ? "text-right" : "text-left"}`}>
      <span
        className={`inline-block px-3 py-2 rounded-2xl ${
          mine ? "bg-title-color text-black" : "bg-[#202E58] text-white"
        }`}
      >
        {message.content}
      </span>
    </div>
  );
}
