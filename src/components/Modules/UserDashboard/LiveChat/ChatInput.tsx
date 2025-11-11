import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";

export default function ChatInput({
  onSendMessage,
  placeholder = "Ask a question...",
}: {
  onSendMessage: (msg: string) => void;
  placeholder?: string;
}) {
  const [message, setMessage] = useState("");



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
            className="pr-20 p-5 text-black rounded-full border-1 border-title-color  focus:ring-title-color"
          />{" "}
      
        </div>
        <Button
          type="submit"
          size="icon"
          className="h-10 w-10 rounded-full  bg-bg-dashboard cursor-pointer"
          disabled={!message.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
