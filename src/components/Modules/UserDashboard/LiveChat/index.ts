

export type NotificationType = "chat_message"; // extend as you add types

export interface Notification {
  id: string;
  userId: string;
  notificationType: NotificationType;
  notificationDetail: string; // or structure it later: { from: string; text: string }
  createdAt: string;
  // add updatedAt if your schema has it
}

export type UserRole = "admin" | "customer";                  // extend if needed
export type OrganisationRole = "advertiser" | "agency";       // extend if needed
export type UserStatus = "active" | "inactive" | "suspended"; // guessed; use your enum
// ws-events.ts

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  isSeen: boolean;
  createdAt: string;

  sender: User;
  receiver: User;
}
export interface WsEventBase<T extends string> {
  type: T;
}

export interface NewMessageEvent extends WsEventBase<"new_message"> {
  data: Message;
}

export interface MessageSentEvent extends WsEventBase<"message_sent"> {
  data: Message;
}

export interface NewNotificationEvent extends WsEventBase<"new_notification"> {
  data: Notification;
}

export interface FetchHistoryEvent extends WsEventBase<"fetch_history"> {
  data: Message[]; // server returns an array
}

export interface FetchAdminsEvent extends WsEventBase<"fetch_admins"> {
  data: User[]; // server returns a list of admins
}

// Chat list types
export interface ChatListItem {
  counterpart: Pick<User, "id" | "first_name" | "last_name" | "image" | "role">;
  lastMessage: {
    id: string;
    text: string;
    createdAt: string;
    from: string;
    to: string;
  };
}

export interface FetchChatListEvent extends WsEventBase<"fetch_chat_list"> {
  data: ChatListItem[];
}

export interface ErrorEvent extends WsEventBase<"error"> {
  error: string;
  fullError?: unknown;
}

export type ServerEvent =
  | NewMessageEvent
  | MessageSentEvent
  | NewNotificationEvent
  | FetchHistoryEvent
  | FetchAdminsEvent
  | FetchChatListEvent
  | ErrorEvent;

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  image: string | null; // you may receive null if not set
  password: string;     // hashed string from DB
  organisation_name: string | null;

  role: UserRole;
  organisation_role: OrganisationRole;

  otp: string | null;
  otp_expires_at: string | null;

  is_verified: boolean;

  password_reset_otp: string | null;
  password_reset_expires: string | null;

  createdAt: string;
  updatedAt: string;
  status: UserStatus;
}
// ws-commands.ts

export interface FetchHistoryCmd {
  type: "fetch_history";
  receiverId: string;
  cursor?: { id: string; createdAt: string };
  limit?: number;
}

export interface FetchAdminsCmd {
  type: "fetch_admins";
  receiverId:string
}

export interface FetchChatListCmd {
  type: "fetch_chatList";
  receiverId?: string;
}

export interface NewMessageCmd {
  type: "new_message";
  receiverId: string;
  text: string;
  // later: fileUrl?: string; fileType?: string;
}

export type ClientCommand = FetchHistoryCmd | FetchAdminsCmd | FetchChatListCmd | NewMessageCmd;
export interface ChatMessage {
    id: string
    content: string
    sender: "user" | "agent"
    timestamp: Date
    agentName?: string
    agentAvatar?: string
}

export interface ChatConversation {
    id: string
    agentName: string
    agentAvatar: string
    lastMessage: string
    timestamp: Date
    unread?: boolean
}

export interface ChatAgent {
    id: string
    name: string
    avatar: string
    status: "online" | "offline"
    role: string
}
