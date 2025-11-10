import type { Message } from ".";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/Slices/AuthSlice/authSlice";

export function MessageBubble({ message }: { message: Message }) {
  const user = useAppSelector(selectCurrentUser);
  const mine = user ? message.senderId === user.id : false;
  return (
    <div className={`p-4 ${mine ? "text-right" : "text-left"}`}>
      <span
        className={`inline-block px-3 py-2 rounded-2xl ${
          mine ? "bg-title-color text-black" : "bg-[#202E58] text-white"
        }`}
      >
        {message.text}
      </span>
    </div>
  );
}
