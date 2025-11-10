import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useChatWebSocket } from "@/hooks/useChatWebSocket";
import { X } from "lucide-react";
import { useState } from "react";

import { motion } from "framer-motion";
import { chatAgents } from ".";
import { ChatHeader } from "./ChatHeader";
import { ChatHome } from "./ChatHome";

import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/Slices/AuthSlice/authSlice";
import ChatInput from "./ChatInput";
import { ChatTabs, type ChatTab } from "./ChatTabs";
import { ConversationList } from "./ConversationList";
import { MessageBubble } from "./MessageBubble";

export function LiveChatSystem() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const [activeTab, setActiveTab] = useState<ChatTab>("home");
  const [currentView, setCurrentView] = useState<"home" | "messages" | "chat">(
    "home"
  );
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);

  const {
    messages,
    admins,
    // readyState,
    fetchHistory,
    sendChatMessage,
  } = useChatWebSocket();

  const handleStartChat = () => {
    if (admins && admins.length > 0) {
      const first = admins[0];
      setSelectedConversationId(first.id);
      fetchHistory(first.id);
      setCurrentView("chat");
    } else {
      setActiveTab("messages");
      setCurrentView("messages");
    }
  };

  // const handleViewMessages = () => {
  //   setActiveTab("messages");
  //   setCurrentView("messages");
  // };

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
    fetchHistory(id);
    setCurrentView("chat");
  };

  const handleSendMessage = (content: string) => {
    if (selectedConversationId) {
      sendChatMessage(selectedConversationId, content);
    }
  };

  const handleTabChange = (tab: ChatTab) => {
    setActiveTab(tab);
    setCurrentView(tab);
  };

  const selectedAgent = chatAgents[0];

  return (
    <>
      <motion.div>
        <button
          onClick={() => setIsOpen(true)}
          type="submit"
          className={`bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] z-50 text-white text-sm md:w-fit w-full py-3 md:px-4 md:py-3 rounded-lg md:rounded-full cursor-pointer transition-all duration-300 hover:shadow-[0_0_32px_rgba(9,72,157,0.9)]  flex   justify-center items-center gap-2 `}
        >
          Live Chat
        </button>
      </motion.div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="w-full z-[1000] sm:w-96 p-0 !rounded-xl border-none flex flex-col h-full md:max-h-[60vh]  mt-auto bg-white"
        >
          <div className="flex-1 flex flex-col">
            {currentView === "home" && (
              <ChatHome
                userName={user?.first_name || "User"}
                messages={messages}
              />
            )}

            {currentView === "messages" && (
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Messages
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <ConversationList
                  conversations={admins}
                  onSelectConversation={handleSelectConversation}
                />
                <div className="p-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartChat}
                    className="w-full px-5 cursor-pointer py-3 hover:bg-bg-dashboard bg-[#202E58] text-white rounded-full"
                  >
                    Ask a question
                  </motion.button>
                </div>
              </div>
            )}

            {currentView === "chat" && (
              <div className="flex flex-col h-full">
                <ChatHeader
                  agentName={(
                    admins.find((a) => a.id === selectedConversationId)?.first_name +
                      " " +
                    (admins.find((a) => a.id === selectedConversationId)?.last_name || "")
                  ) || selectedAgent.name}
                  agentRole={
                    admins.find((a) => a.id === selectedConversationId)?.role ||
                    selectedAgent.role
                  }
                  agentAvatar={
                    admins.find((a) => a.id === selectedConversationId)?.image ||
                    selectedAgent.avatar
                  }
                  onBack={() => {
                    setCurrentView("messages");
                    setActiveTab("messages");
                  }}
                  showBackButton
                />
                <div className="flex-1 overflow-y-auto">
                  {messages.map((m) => (
                    <MessageBubble key={m.id} message={m} />
                  ))}
                </div>
                <ChatInput onSendMessage={handleSendMessage} />
              </div>
            )}
          </div>

          {currentView !== "chat" && (
            <ChatTabs activeTab={activeTab} onTabChange={handleTabChange} />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
