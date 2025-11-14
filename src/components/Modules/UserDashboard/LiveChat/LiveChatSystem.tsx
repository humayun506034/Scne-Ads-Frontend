 
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useChatWebSocket } from "@/hooks/useChatWebSocket";
import { Bell, Loader2, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { motion } from "framer-motion";
import { ChatHeader } from "./ChatHeader";
import { ChatHome } from "./ChatHome";

import { useGetAllAdminsQuery, useGetAllChatListsQuery } from "@/store/api/adminDashboard/adminApi";
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
    fetchHistory,
    fetchMoreHistory,
    sendChatMessage,
    notificationCount,
    isHistoryLoading,
    isSending,
    isLoadingMoreHistory,
    hasMoreHistory,
    setNotificationsVisible,
  } = useChatWebSocket();

  // RTK Query: Admins (load when chat opens)
  const { data: adminsResp } = useGetAllAdminsQuery(undefined, { skip: !isOpen });
  const admins = useMemo(() => {
    const raw = (adminsResp as any)?.data ?? [];
    return raw.map((a: any) => ({
      id: a.id,
      first_name: a.first_name,
      last_name: a.last_name,
      image: a.image ?? null,
      role: a.role,
      phone: "",
      email: "",
      password: "",
      organisation_name: null,
      organisation_role: "agency" as any,
      otp: null,
      otp_expires_at: null,
      is_verified: true,
      password_reset_otp: null,
      password_reset_expires: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "active" as any,
    }));
  }, [adminsResp]);


  const { data: chatListsResp } = useGetAllChatListsQuery(
   
    { limit: 50 },
   
  );

  const chatList = useMemo(() => {
    const raw = chatListsResp as any;
    const items = Array.isArray(raw)
      ? raw
      : Array.isArray(raw?.items)
      ? raw.items
      : Array.isArray(raw?.data)
      ? raw.data
      : Array.isArray(raw?.data?.items)
      ? raw.data.items
      : [];
    return (items as any[]).map((it: any) => ({
      counterpart: {
        id: it?.counterpart?.id ?? it?.user?.id ?? it?.from?.id,
        first_name: it?.counterpart?.first_name ?? it?.user?.first_name ?? it?.from?.first_name ?? "",
        last_name: it?.counterpart?.last_name ?? it?.user?.last_name ?? it?.from?.last_name ?? "",
        image: it?.counterpart?.image ?? it?.user?.image ?? it?.from?.image ?? null,
        role: it?.counterpart?.role ?? it?.user?.role ?? it?.from?.role ?? "customer",
      },
      lastMessage: {
        id: it?.lastMessage?.id ?? it?.id,
        text: it?.lastMessage?.text ?? it?.text ?? "",
        createdAt: it?.lastMessage?.createdAt ?? it?.createdAt ?? new Date().toISOString(),
        from: it?.lastMessage?.from ?? it?.from ?? "",
        to: it?.lastMessage?.to ?? it?.to ?? "",
      },
    }));
  }, [chatListsResp]);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

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
    const finalId = id || admins?.[0]?.id || null;
    if (!finalId) return;
    setSelectedConversationId(finalId);
    fetchHistory(finalId);
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

  // Control toast visibility: only after login and when chat is closed
  useEffect(() => {
    setNotificationsVisible(Boolean(user) && !isOpen);
  }, [user, isOpen, setNotificationsVisible]);

  // Scroll when history arrives (skip on prepend)
  useEffect(() => {
    if (currentView !== "chat") return;
    if (isLoadingMoreHistory) return;
    const t = setTimeout(() => {
      if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "auto" });
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      }
    }, 0);
    return () => clearTimeout(t);
  }, [messages, currentView, isLoadingMoreHistory]);

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

  // Clear optimistic bubble when server acks send
  useEffect(() => {
    if (!isSending && optimisticMessage) {
      setOptimisticMessage(null);
    }
  }, [isSending, optimisticMessage]);



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
    if (isLoadingMoreHistory) return; // keep position when loading older
    const t = setTimeout(() => {
      if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      }
    }, 0);
    return () => clearTimeout(t);
  }, [messages, currentView, isLoadingMoreHistory]);

  // Fetch chat list when Messages tab is active
  // Chat list loads via RTK Query when Messages tab is active

  const selectedAgent = admins?.[0];
  const selectedPartner = useMemo(() => {
    if (!selectedConversationId) return selectedAgent;
    const byContact = contacts?.find((a) => a.id === selectedConversationId);
    if (byContact) return byContact;
    const byAdmin = admins?.find((a) => a.id === selectedConversationId);
    return byAdmin || selectedAgent;
  }, [selectedConversationId, contacts, admins, selectedAgent]);

  return (
    <div className="">
      <motion.div>
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className={` relative bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] z-50 text-white text-sm md:w-fit w-full py-3 md:px-4 md:py-3 rounded-lg md:rounded-full cursor-pointer transition-all duration-300 hover:shadow-[0_0_32px_rgba(9,72,157,0.9)]  flex   justify-center items-center gap-2 `}
        >
          <div className="relative">
            <Bell className="h-5 w-6" />
          </div>
          Live Chat
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {notificationCount}
            </span>
          )}
         
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
                {isHistoryLoading ? (
                  <div className="flex-1 min-h-0 overflow-y-auto flex items-center justify-center bg-black text-white">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Loading chat...
                    </div>
                  </div>
                ) : (
                  <div ref={scrollContainerRef} className="flex-1 min-h-0 overflow-y-auto">
                    <div className="w-full flex justify-center py-2">
                      {isLoadingMoreHistory ? (
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Loader2 className="h-3 w-3 animate-spin" /> Loading older messages...
                        </div>
                      ) : hasMoreHistory ? (
                        <button
                          className="text-xs text-blue-600 hover:underline"
                          onClick={() => fetchMoreHistory()}
                        >
                          Load previous messages
                        </button>
                      ) : null}
                    </div>
                    {messages.map((m) => (
                      <MessageBubble key={m.id} message={m} />
                    ))}
                    {optimisticMessage && (
                      <MessageBubble message={optimisticMessage} isPending />
                    )}
                    <div ref={bottomRef} />
                  </div>
                )}
                <ChatInput onSendMessage={handleSendMessage} isSending={isSending} />
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
