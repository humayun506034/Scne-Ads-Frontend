import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/Slices/AuthSlice/authSlice";
import type { Message } from ".";
import { Loader2 } from "lucide-react";

export function MessageBubble({ message, isPending, delivered }: { message: Message; isPending?: boolean; delivered?: boolean }) {
  const user = useAppSelector(selectCurrentUser);
  const mine = user ? message.senderId === user.id : false;
  return (
    <div className={`px-4 py-2 ${mine ? "text-right" : "text-left"}`}>
      <div className="inline-flex flex-col items-end gap-1 max-w-[85%]">
        <span
          className={`inline-block px-3 py-3 rounded-2xl ${
            mine
              ? `text-black ${isPending ? "bg-blue-200 opacity-70" : "bg-title-color"}`
              : "bg-[#202E58] text-white"
          }`}
        >
          {message.text}
        </span>
        {mine && isPending && (
          <span className="text-[10px] text-gray-500 flex items-center gap-1">
            <Loader2 className="h-3 w-3 animate-spin" /> Sending...
          </span>
        )}
        {mine && delivered && !isPending && (
          <span className="text-[10px] text-gray-500">Delivered</span>
        )}
      </div>
    </div>
  );
}
