 
import { useCallback, useMemo, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import { toast } from "sonner";

import {
  ChatListItem,
  ClientCommand,
  FetchHistoryCmd,
  Message,
  NewMessageCmd,
  ServerEvent,
  User,
} from "@/components/Modules/UserDashboard/LiveChat";

import { useGetAllAdminsQuery, useGetAllChatListsQuery } from "@/store/api/adminDashboard/adminApi";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentToken, selectCurrentUser } from "@/store/Slices/AuthSlice/authSlice";

export const useChatWebSocket = () => {
  const token = useAppSelector(selectCurrentToken);
  const currentUser = useAppSelector(selectCurrentUser);

  const socketUrl = useMemo(() => {
    if (!token) return null;
    const base = import.meta.env.VITE_WEBSOCKET_URL as string;
    return `${base}?token=${encodeURIComponent(token)}`;
  }, [token]);

  const apiBase = useMemo(() => import.meta.env.VITE_BASE_URL as string, []);

  const [messages, setMessages] = useState<Message[]>([]);
  const [admins, setAdmins] = useState<User[]>([]);
  const [chatList, setChatList] = useState<ChatListItem[]>([]);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [isSending, setIsSending] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [isLoadingMoreHistory, setIsLoadingMoreHistory] = useState(false);
  const [hasMoreHistory, setHasMoreHistory] = useState(false);
  const toastMutedRef = useRef(true);

  const nextHistoryCursorRef = useRef<{ id: string; createdAt: string } | null>(null);
  const historyReceiverRef = useRef<string | null>(null);
  const historyAppendingRef = useRef(false);
  const historyLimitRef = useRef(50);

  // === RTK Query data ===
  const { data: adminData } = useGetAllAdminsQuery(undefined);
  const { data: chatListData } = useGetAllChatListsQuery({ limit: 20 });

  // === Apply RTK data into state ===
  useMemo(() => {
    if (adminData?.items) setAdmins(adminData.items);
    if (chatListData?.items) setChatList(chatListData.items);
  }, [adminData, chatListData]);

  // === WebSocket setup ===
  const handleMessage = useCallback(
    (ev: MessageEvent<string>) => {
      let msg: ServerEvent;
      try {
        msg = JSON.parse(ev.data);
      } catch {
        toast.error("Invalid WS payload");
        return;
      }

      switch (msg.type) {
        case "new_message": {
          if (!msg.data?.text || msg.data.text.trim().length === 0) {
            break; // ignore blank messages
          }
          setMessages((prev) => [...prev, msg.data]);
          if (currentUser && msg.data.receiverId === currentUser.id) {
            setNotificationCount((c) => c + 1);
            if (!toastMutedRef.current) {
              const from =
                (msg.data.sender?.first_name && `${msg.data.sender.first_name} ${msg.data.sender?.last_name ?? ""}`.trim()) ||
                msg.data.sender?.last_name ||
                "New message";
              toast.success(`${from}: ${msg.data.text}`, { position: "top-right" });
            }
          }
          break;
        }

        case "message_sent": {
          if (msg.data?.text && msg.data.text.trim().length > 0) {
            setMessages((prev) => [...prev, msg.data]);
          }
          setIsSending(false);
          break;
        }

        case "fetch_history": {
          const limit = historyLimitRef.current;
          const itemsDesc = msg.data.filter((m) => m?.text && m.text.trim().length > 0);
          const hasMore = itemsDesc.length > limit;
          const pageDesc = hasMore ? itemsDesc.slice(0, limit) : itemsDesc;
          const asc = [...pageDesc].sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );

          if (historyAppendingRef.current) {
            setMessages((prev) => {
              const seen = new Set(prev.map((m) => m.id));
              const toAdd = asc.filter((m) => !seen.has(m.id));
              return [...toAdd, ...prev];
            });
            setIsLoadingMoreHistory(false);
          } else {
            setMessages(asc);
            setIsHistoryLoading(false);
          }

          setHasMoreHistory(hasMore);
          const earliest = asc[0];
          nextHistoryCursorRef.current =
            hasMore && earliest
              ? { id: earliest.id, createdAt: earliest.createdAt }
              : null;
          historyAppendingRef.current = false;
          break;
        }

        case "error":
          toast.error(msg.error || "Chat error");
          setIsSending(false);
          setIsHistoryLoading(false);
          break;
      }
    },
    [currentUser]
  );

  const { sendMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: () => true,
    onMessage: handleMessage,
    share: true,
  });

  // === Command senders ===
  const sendCmd = (cmd: ClientCommand) => sendMessage(JSON.stringify(cmd));

  const fetchHistory = (receiverId: string, limit = 50) => {
    historyReceiverRef.current = receiverId;
    historyLimitRef.current = limit;
    historyAppendingRef.current = false;
    setIsHistoryLoading(true);
    setIsLoadingMoreHistory(false);
    setHasMoreHistory(false);
    nextHistoryCursorRef.current = null;

    const payload: FetchHistoryCmd = { type: "fetch_history", receiverId, limit };
    sendCmd(payload);
  };

  const fetchMoreHistory = () => {
    const receiverId = historyReceiverRef.current;
    const cursor = nextHistoryCursorRef.current;
    const limit = historyLimitRef.current;
    if (!receiverId || !cursor) return;
    historyAppendingRef.current = true;
    setIsLoadingMoreHistory(true);
    const payload: FetchHistoryCmd = { type: "fetch_history", receiverId, cursor, limit };
    sendCmd(payload);
  };

  const sendChatMessage = (receiverId: string, text: string) => {
    const clean = (text ?? "").trim();
    if (!clean) return toast.error("Cannot send empty message",{ position: "top-right" });
    const payload: NewMessageCmd = { type: "new_message", receiverId, text: clean };
    setIsSending(true);
    sendCmd(payload);
  };

  const fetchChatList = async (limit = 20, cursor?: string) => {
    try {
      const url = new URL(`${apiBase}/chat/getLists`);
      url.searchParams.set("limit", String(limit));
      if (cursor) url.searchParams.set("cursor", cursor);
      const res = await fetch(url.toString(), {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const json = await res.json();
      const list = json.items ??  [];
     
      const sorted = list.sort(
        (a, b) =>
          new Date(b.lastMessage.createdAt).getTime() -
          new Date(a.lastMessage.createdAt).getTime()
      );
      setChatList(sorted);
    } catch (err) {
      console.error("Failed to fetch chat list", err);
      toast.error("Failed to fetch chat list");
    }
  };

  return {
    readyState,
    messages,
    admins,
    chatList,
    notificationCount,
    isSending,
    isHistoryLoading,
    isLoadingMoreHistory,
    hasMoreHistory,
    fetchHistory,
    fetchMoreHistory,
    sendChatMessage,
    fetchChatList,
    setNotificationCount,
    setNotificationsVisible: (visible: boolean) => {
      toastMutedRef.current = !visible;
    },
  };
};
