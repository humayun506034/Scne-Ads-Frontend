import React from "react";
import { cn } from "@/lib/utils";

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
    Active: "bg-[#18432F] text-{#A2F3CD}",
    Approved: "bg-[#18432F] text-{#A2F3CD}",
    Completed: "bg-[#0C3368] text-secondary-color",
    Pending: "bg-[#786038] text-[#FFD8AC]",
    Rejected: "bg-[#651C12] text-[#F6D1CC]",
    Maintenance: "bg-[#786038] text-[#FFD8AC]",
  };

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-sm font-medium",
        statusClasses[status] || "bg-slate-600/20 text-slate-300",
        className
      )}
    >
      {status}
    </span>
  );
};

export default CommonStatus;
