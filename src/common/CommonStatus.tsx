import { cn } from "@/lib/utils";
import React from "react";

type StatusType =
  | "Active"
  | "Approved"
  | "Completed"
  | "Pending"
  | "Maintenance"
  | "Rejected"
  | string;

interface CommonStatusProps {
  status: StatusType;
  className?: string;
}

const CommonStatus: React.FC<CommonStatusProps> = ({
  status,
  className = "",
}) => {
  const statusClasses: Record<string, string> = {
    active: "bg-[#18432F] text-{#A2F3CD}",
    approved: "bg-[#18432F] text-{#A2F3CD}",
    completed: "bg-[#0C3368] text-secondary-color",
    pending: "bg-[#786038] text-[#FFD8AC]",
    rejected: "bg-[#651C12] text-[#F6D1CC]",
    inactive: "bg-[#651C12] text-[#F6D1CC]",
    maintenance: "bg-[#786038] text-[#FFD8AC]",
  };

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-sm font-medium",
        statusClasses[status] || "bg-slate-600/20 text-slate-300",
        className
      )}
    >
      {status.toUpperCase()}
    </span>
  );
};

export default CommonStatus;
