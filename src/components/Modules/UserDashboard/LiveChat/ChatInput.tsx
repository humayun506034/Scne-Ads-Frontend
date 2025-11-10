import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Smile } from "lucide-react";
import { useState } from "react";

export default function ChatInput({
  onSendMessage,
  placeholder = "Ask a question...",
}: {
  onSendMessage: (msg: string) => void;
  placeholder?: string;
}) {
  const [message, setMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const emojis = [
    "😀",
    "😁",
    "😂",
    "😊",
    "😍",
    "😉",
    "👍",
    "🙏",
    "🔥",
    "🎉",
  ];

  function addEmoji(emoji: string) {
    setMessage((prev) => `${prev}${emoji}`);
    setShowEmojis(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;
    onSendMessage(text);
    setMessage("");
  }

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={placeholder}
            className="pr-20 p-5 text-black rounded-full border-2  border-gray-200"
          />{" "}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-bg-dashboard "
              onClick={() => setShowEmojis((s) => !s)}
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          {showEmojis && (
            <div className="absolute right-0 mt-2 w-44 rounded-lg border bg-white shadow-md p-2 grid grid-cols-6 gap-2">
              {emojis.map((e) => (
                <button
                  key={e}
                  type="button"
                  className="text-xl hover:scale-110 transition-transform"
                  onClick={() => addEmoji(e)}
                >
                  {e}
                </button>
              ))}
            </div>
          )}
        </div>
        <Button
          type="submit"
          size="icon"
          className="h-10 w-10 rounded-full cursor-pointer bg-bg-dashboard "
          disabled={!message.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
