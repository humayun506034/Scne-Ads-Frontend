import { ICampaign } from "./CampaignCard";

interface StatusBadgeProps {
  status: ICampaign["status"];
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: ICampaign["status"]) => {
    switch (status) {
      case "Active":
        return {
          color: "bg-secondary-color",
          text: "Active",
        };

      case "Paused":
        return {
          color: "bg-[#E5D978]",
          text: "Paused",
        };
      case "Completed":
        return {
          color: "bg-[#14CA74]",
          text: "Completed",
        };
      default:
        return {
          color: "bg-gray-500",
          text: status,
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${config.color}`} />
      <span className="text-white text-sm font-medium">{config.text}</span>
    </div>
  );
}
