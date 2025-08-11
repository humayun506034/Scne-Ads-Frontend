import { Home, MessageCircle } from "lucide-react";

export type ChatTab = "home" | "messages";

export function ChatTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: ChatTab;
  onTabChange: (t: ChatTab) => void;
}) {
  return (
    <div
      style={{
        borderRadius: "0 0 18px 18px",
        background: "#FFF",
        boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.25)",
      }}
      className="flex  bg-white"
    >
      <button
        onClick={() => onTabChange("home")}
        className={`flex-1 text-base  flex flex-col items-center gap-1 py-3 px-4 cursor-pointer transition-colors ${
          activeTab === "home"
            ? "text-[#14CA74] font-semibold"
            : "text-[#B0B3BA] hover:text-gray-600"
        }`}
      >
        <Home className="h-5 w-5" />
        <span className="text-xs font-medium">Home</span>
      </button>

      <button
        onClick={() => onTabChange("messages")}
        className={`flex-1 text-base  flex flex-col items-center gap-1 py-3 px-4 cursor-pointer transition-colors ${
          activeTab === "messages"
            ? "text-[#14CA74] font-semibold"
            : "text-[#B0B3BA] hover:text-gray-600"
        }`}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="text-xs font-medium">Messages</span>
      </button>
    </div>
  );
}
