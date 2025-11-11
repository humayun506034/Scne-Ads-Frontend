import { ChevronRight } from "lucide-react";
import p3 from "../../../../assets/Dashboard/person3.png";
import type { User } from ".";

interface ConversationListProps {
  conversations: User[];
  onSelectConversation: (conversationId: string) => void;
  lastById?: Record<string, { text: string; createdAt: string; fromMe: boolean }>;
}

export function ConversationList({
  conversations,
  onSelectConversation,
  lastById,
}: ConversationListProps) {
  return (
    <div className="flex-1  overflow-y-auto">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          onClick={() => onSelectConversation(conversation.id)}
          className="flex items-center gap-4 p-4  cursor-pointer"
        >
          {/** avatar */}
          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
            <img
              src={conversation.image || p3}
              alt={`${conversation.first_name} ${conversation.last_name}`}
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className={`font-medium text-gray-900 truncate`}>
                {`${conversation.first_name} ${conversation.last_name}`}
              </h4>
            </div>
            <p className={`text-sm text-gray-600 truncate mt-1`}>
              {lastById?.[conversation.id]
                ? `${lastById[conversation.id].fromMe ? "You: " : ""}${lastById[conversation.id].text}`
                : conversation.role}
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-title-color flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}
