import p1 from "../../../../assets/Dashboard/person1.png";
import p2 from "../../../../assets/Dashboard/person2.png";
import p3 from "../../../../assets/Dashboard/person3.png";
import logo from "../../../../assets/logo.png";
import type { Message } from ".";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/Slices/AuthSlice/authSlice";

interface ChatHomeProps {
  messages: Message[];
  userName: string;
}

export function ChatHome({ messages, userName }: ChatHomeProps) {
  const user = useAppSelector(selectCurrentUser);
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-bg-dashboard text-white p-4 relative">
        <div className="flex items-center justify-between mb-4 mr-10">
          <div className=" rounded-full w-fit h-[60px] p-2">
            <img src={logo} alt="logo" className="w-full h-full" />
          </div>
          <div className="flex -space-x-2">
            <img
              src={p1}
              alt="Agent 1"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src={p2}
              alt="Agent 2"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src={p3}
              alt="Agent 3"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-1">Hey {userName}</h2>
          <p className="text-title-color">Need a hand (or two) ?</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((m) => {
          const mine = user ? m.senderId === user.id : false;
          return (
            <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div className={`p-2 rounded-lg ${mine ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                <p>{m.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
