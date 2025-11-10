 
import { ClientCommand, FetchHistoryCmd, Message, NewMessageCmd, ServerEvent, User } from "@/components/Modules/UserDashboard/LiveChat";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentToken } from "@/store/Slices/AuthSlice/authSlice";
import { useCallback, useMemo, useState } from "react";
import useWebSocket from "react-use-websocket";
import { toast } from "sonner";


export const useChatWebSocket = () => {
  const token = useAppSelector(selectCurrentToken);

  const socketUrl = useMemo(() => {
    if (!token) return null;
    const base = import.meta.env.VITE_WEBSOCKET_URL as string;
    return `${base}?token=${encodeURIComponent(token)}`;
  }, [token]);

  const [messages, setMessages] = useState<Message[]>([]);

  const [admins, setAdmins] = useState<User[]>([]);

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
      case "new_message":
        setMessages(prev => [...prev, msg.data]);
        break;

      case "fetch_history":
        setMessages(msg.data);
        break;
      case "fetch_admins":
        setAdmins(msg.data);
        break;

      case "new_notification":
        toast.info(msg.data.notificationDetail);
        break;

      case "error":
        toast.error(msg.error);
        break;
    }
  }, []);

  const { sendMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: () => true,
    onMessage: handleMessage,
  });

  const sendCmd = (cmd: ClientCommand) => sendMessage(JSON.stringify(cmd));

  const fetchHistory = (receiverId: string) => {
    const payload: FetchHistoryCmd = { type: "fetch_history", receiverId };
    sendCmd(payload);
  };

  const sendChatMessage = (receiverId: string, text: string) => {
    const payload: NewMessageCmd = { type: "new_message", receiverId, text };
    sendCmd(payload);
  };

  return {
    messages,
    admins,
    readyState,
    fetchHistory,
    sendChatMessage,
  };
};
