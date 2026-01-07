import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import img from "../../../../assets/Dashboard/person1.png";
interface ChatHeaderProps {
  agentName: string;
  agentRole: string;
  agentAvatar: string;

  onBack?: () => void;
  showBackButton?: boolean;
}

export function ChatHeader({
  agentName,
  agentRole,
  agentAvatar,

  onBack,
  showBackButton = false,
}: ChatHeaderProps) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-bg-dashboard">
      <div className="flex items-center gap-3">
        {showBackButton && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            onClick={onBack}
            className="h-8 w-8 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> 
          </motion.button>
        )}
        <div className="w-10 h-10 rounded-full flex items-center justify-center">
          <img
            src={agentAvatar || img}
            alt={agentName}
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div>
          <h3 className="font-semibold ">{agentName}</h3>
          <p className="text-sm text-title-color">{agentRole}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button> */}
      </div>
    </div>
  );
}
