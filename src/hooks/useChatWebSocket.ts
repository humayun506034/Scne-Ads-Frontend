 
import { ClientCommand, FetchAdminsCmd, FetchChatListCmd, FetchHistoryCmd, Message, NewMessageCmd, ServerEvent, User, type ChatListItem } from "@/components/Modules/UserDashboard/LiveChat";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentToken, selectCurrentUser } from "@/store/Slices/AuthSlice/authSlice";
import { useCallback, useMemo, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import { toast } from "sonner";


export const useChatWebSocket = () => {
  const token = useAppSelector(selectCurrentToken);
  const currentUser = useAppSelector(selectCurrentUser);

  const socketUrl = useMemo(() => {
    if (!token) return null;
    const base = import.meta.env.VITE_WEBSOCKET_URL as string;
    return `${base}?token=${encodeURIComponent(token)}`;
  }, [token]);

  const [messages, setMessages] = useState<Message[]>([]);

  const [admins, setAdmins] = useState<User[]>([]);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [chatList, setChatList] = useState<ChatListItem[]>([]);
  const lastFetchForRef = useRef<string | null>(null);
 

  const handleMessage = useCallback((ev: MessageEvent<string>) => {
    let msg: ServerEvent;
    try {
      msg = JSON.parse(ev.data) as ServerEvent;
    } catch (e) {
      console.error("Invalid WS payload", e);
      toast.error("Invalid WS payload");
      return;
    }

    switch (msg.type) {
      case "new_message": {
        setMessages(prev => [...prev, msg.data]);
        if (currentUser && msg.data.receiverId === currentUser.id) {
          setNotificationCount((c) => c + 1);
          const from = msg.data.sender?.first_name
            ? `${msg.data.sender.first_name} ${msg.data.sender.last_name ?? ""}`.trim()
            : "New message";
          toast.success(`${from}: ${msg.data.text}`);
        }
        break;
      }
      case "message_sent":
        setMessages(prev => [...prev, msg.data]);
        break;

      case "fetch_history": {
        setMessages(msg.data);
        break;
      }
      case "fetch_admins":
        setAdmins(msg.data);
        break;
      case "fetch_chat_list": {
        // Sort by latest message time desc
        const sorted = [...msg.data].sort((a, b) => new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime());
        
        setChatList(sorted);
        break;
      }
   

      case "new_notification":
        setNotificationCount((c) => c + 1);
        break;

      case "error":
        toast.error(msg.error);
        break;
    }
  }, [currentUser]);

  const { sendMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: () => true,
    onMessage: handleMessage,
  });

  const sendCmd = (cmd: ClientCommand) => sendMessage(JSON.stringify(cmd));

  const fetchHistory = (receiverId: string) => {
    lastFetchForRef.current = receiverId;
    const payload: FetchHistoryCmd = { type: "fetch_history", receiverId };
    sendCmd(payload);
  };

  const sendChatMessage = (receiverId: string, text: string) => {
    const payload: NewMessageCmd = { type: "new_message", receiverId, text };
    sendCmd(payload);
  };
const fetchAdmins = (receiverId: string,) => {
  const payload: FetchAdminsCmd = { type: "fetch_admins" ,receiverId};
  sendCmd(payload);
}

  const fetchChatList = (receiverId?: string) => {
    const payload: FetchChatListCmd = { type: "fetch_chatList", receiverId };
    sendCmd(payload);
  };

  const resetNotifications = () => setNotificationCount(0);
  const clearMessages = () => setMessages([]);

  return {
    messages,
    admins,
    readyState,
    fetchHistory,
    sendChatMessage,
    fetchAdmins,
    fetchChatList,
    notificationCount,
    resetNotifications,
    clearMessages,
    chatList,
  };
};
