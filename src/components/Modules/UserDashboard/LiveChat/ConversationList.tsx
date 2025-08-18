import { formatDistanceToNow } from "date-fns";
import { ChevronRight } from "lucide-react";
import { ChatConversation } from ".";
import p3 from "../../../../assets/Dashboard/person3.png";
interface ConversationListProps {
  conversations: ChatConversation[];
  onSelectConversation: (conversationId: string) => void;
}

export function ConversationList({
  conversations,
  onSelectConversation,
}: ConversationListProps) {
  return (
    <div className="flex-1  overflow-y-auto">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          onClick={() => onSelectConversation(conversation.id)}
          className="flex items-center gap-4 p-4  cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
            <img
              src={p3}
              alt={conversation.agentName}
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4
                className={`font-medium text-gray-900 truncate ${
                  conversation.unread ? "font-semibold" : ""
                }`}
              >
                {conversation.agentName}{" "}
                {conversation.unread && <span className="text-red-500">*</span>}
              </h4>
              <span
                className={`text-xs text-gray-500 flex-shrink-0 ${
                  conversation.unread ? "font-semibold" : ""
                }`}
              >
                {formatDistanceToNow(conversation.timestamp, {
                  addSuffix: true,
                })}
              </span>
            </div>
            <p
              className={`text-sm text-gray-600 truncate mt-1 ${
                conversation.unread ? "font-semibold" : ""
              }`}
            >
              {conversation.lastMessage}
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-title-color flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}
