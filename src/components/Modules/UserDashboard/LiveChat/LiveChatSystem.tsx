 
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useChatWebSocket } from "@/hooks/useChatWebSocket";
import { Bell, Loader2, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { motion } from "framer-motion";
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
    chatList,
    fetchHistory,
    sendChatMessage,
    fetchAdmins,
    fetchChatList,
    notificationCount,
    resetNotifications,
    clearMessages,
  } = useChatWebSocket();
 
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleStartChat = () => {
    if (admins && admins.length > 0) {
      const first = admins[0];
      setSelectedConversationId(first.id);
      setIsLoadingHistory(true);
      clearMessages();
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
    setIsLoadingHistory(true);
    clearMessages();
    fetchHistory(id);
    setCurrentView("chat");
  };

  const handleSendMessage = (content: string) => {
    if (selectedConversationId) {
      // Optimistic UI: show user's message immediately as pending
      if (user) {
        const temp: any = {
          id: `temp-${Date.now()}`,
          senderId: user.id,
          receiverId: selectedConversationId,
          text: content,
          isSeen: false,
          createdAt: new Date().toISOString(),
          sender: user,
          receiver: admins.find((a) => a.id === selectedConversationId) || null,
        };
        setOptimisticMessage(temp);
      }
      sendChatMessage(selectedConversationId, content);
    }
  };

  const handleTabChange = (tab: ChatTab) => {
    setActiveTab(tab);
    setCurrentView(tab);
  };

  // Simple pending support removed; keep placeholder for future enhancements
  const [optimisticMessage, setOptimisticMessage] = useState<any | null>(null);

  // Fetch admins when the chat opens
  useEffect(() => {
    if (isOpen) {
      fetchAdmins(user?.id || '');
      resetNotifications();
    }
  }, [isOpen, fetchAdmins, resetNotifications, user?.id]);

  // Stop loading and scroll when history arrives
  useEffect(() => {
    if (isLoadingHistory) setIsLoadingHistory(false);
    const t = setTimeout(() => {
      if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "auto" });
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      }
    }, 0);
    return () => clearTimeout(t);
  }, [messages, isLoadingHistory]);

  // Removed ack-based delivery indicator for simplicity

  // Auto-scroll when optimistic message appears
  useEffect(() => {
    if (!optimisticMessage) return;
    const t = setTimeout(() => {
      if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      }
    }, 0);
    return () => clearTimeout(t);
  }, [optimisticMessage]);



  // Contacts from chatList (new endpoint)
  const contacts = useMemo(() => {
    const users = chatList.map(c => ({
      id: c.counterpart.id,
      first_name: c.counterpart.first_name,
      last_name: c.counterpart.last_name,
      image: c.counterpart.image ?? null,
      phone: "",
      email: "",
      password: "",
      organisation_name: null,
      role: c.counterpart.role as any,
      organisation_role: "agency" as any,
      otp: null,
      otp_expires_at: null,
      is_verified: true,
      password_reset_otp: null,
      password_reset_expires: null,
      createdAt: c.lastMessage.createdAt,
      updatedAt: c.lastMessage.createdAt,
      status: "active" as any,
    }));
    return users;
  }, [chatList]);

  const previewById = useMemo(() => {
    const map: Record<string, { text: string; createdAt: string; fromMe: boolean }> = {};
    if (user) {
      chatList.forEach(item => {
        map[item.counterpart.id] = {
          text: item.lastMessage.text,
          createdAt: item.lastMessage.createdAt,
          fromMe: item.lastMessage.from === user.id,
        };
      });
    }
    return map;
  }, [chatList, user]);

  // Auto-scroll on every new message in chat view
  useEffect(() => {
    if (currentView !== "chat") return;
    const t = setTimeout(() => {
      if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      }
    }, 0);
    return () => clearTimeout(t);
  }, [messages, currentView]);

  // Fetch chat list when Messages tab is active
  useEffect(() => {
    if (!isOpen || currentView !== 'messages') return;
    fetchChatList(user?.id);
  }, [isOpen, currentView, user?.id, fetchChatList]);

  const selectedAgent = admins?.[0];
  const selectedPartner =
    (contacts && selectedConversationId
      ? contacts.find((a) => a.id === selectedConversationId)
      : undefined) ||
    selectedAgent;

  return (
    <div className="">
      <motion.div >
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className={` bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] z-50 text-white text-sm md:w-fit w-full py-3 md:px-4 md:py-3 rounded-lg md:rounded-full cursor-pointer transition-all duration-300 hover:shadow-[0_0_32px_rgba(9,72,157,0.9)]  flex   justify-center items-center gap-2 `}
        >
          <div className="relative">
            <Bell className="h-5 w-6" />
           {notificationCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {notificationCount}
            </span>
          )}
          </div>
          Live Chat
         
        </button>
      </motion.div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="w-full z-[1000] sm:w-96 p-0 !rounded-xl border-none flex flex-col h-full md:max-h-[60vh] mt-auto bg-white overflow-hidden"
        >
          <div className="flex-1 flex flex-col min-h-0">
            {currentView === "home" && (
              <ChatHome
                userName={user?.first_name + " " + user?.last_name || "User"}
              
                admins={admins}
                onSelectAdmin={handleSelectConversation}
              />
            )}

            {currentView === "messages" && (
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Messages 
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                 
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 cursor-pointer"
                  >
                    <X className="h-4 w-4 text-black" />
                  </motion.button>
                </div>
                <ConversationList
                  conversations={contacts}
                  onSelectConversation={handleSelectConversation}
                  lastById={previewById}
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
              <div className="flex relative flex-col h-full min-h-0">
                <ChatHeader
                  agentName={`${selectedPartner?.first_name ?? ""} ${selectedPartner?.last_name ?? ""}`.trim() || "Agent"}
                  agentRole={selectedPartner?.role || "Support"}
                  agentAvatar={selectedPartner?.image || "/placeholder.svg?height=40&width=40"}
                  onBack={() => {
                    setCurrentView("messages");
                    setActiveTab("messages");
                  }}
                  showBackButton
                />
                {isLoadingHistory ? (
                  <div className="flex-1 min-h-0 overflow-y-auto flex items-center justify-center bg-black text-white">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Loading chat...
                    </div>
                  </div>
                ) : (
                  <div ref={scrollContainerRef} className="flex-1 min-h-0 overflow-y-auto">
                    {messages.map((m) => (
                      <MessageBubble key={m.id} message={m} />
                    ))}
                    <div ref={bottomRef} />
                  </div>
                )}
                <ChatInput onSendMessage={handleSendMessage} />
              </div>
            )}
          </div>

          {currentView !== "chat" && (
            <ChatTabs activeTab={activeTab} onTabChange={handleTabChange} />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
