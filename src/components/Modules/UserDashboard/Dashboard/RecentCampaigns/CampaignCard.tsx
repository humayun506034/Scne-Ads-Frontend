import { ChevronRight } from "lucide-react";

import DashboardTransparentButton from "@/common/DashboardTransparentButton";
import { StatusBadge } from "./StatusBadge";
export interface ICampaign {
  id: string;
  type: "Fixed-Duration";
  status: "Active" | "Paused" | "Completed";
  brand: string;
  title: string;
  totalSpent: number;
  completion: number;
  limit: number;
}

export interface CampaignCardProps {
  campaign: ICampaign;
  onContinueSetup: (campaignId: string) => void;
}

export function CampaignCard({ campaign, onContinueSetup }: CampaignCardProps) {
  return (
    <div className="bg-dashboard-card-bg rounded-lg p-6 flex justify-between flex-col   transition-all duration-200">
      {/* Header with badges */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-between w-full ">
          <div className="flex items-center gap-2">
            {campaign.status === "Paused" && (
              <span className="px-4 py-2.5 bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] text-white  text-xs font-medium rounded-full">
                Draft
              </span>
            )}
            <span className="px-4 py-2 border border-secondary-color  text-title-color text-xs font-medium rounded-full">
              {campaign.type}
            </span>
          </div>
          <StatusBadge status={campaign.status} />
        </div>
      </div>

      <div className="">
        {/* Brand */}
        <div className="mb-2 mt-6">
          <span className="text-title-color text-sm font-medium">
            {campaign.brand}
          </span>
        </div>

        {/* Campaign Title */}
        <h3 className="text-white text-2xl font-semibold mt-3">
          {campaign.title}
        </h3>

        {/* Progress Section */}
        <div className="mb-6">
          <div className=" mt-5 h-2 border-[#AEB9E1] rounded-full  border  w-full    ">
            <div
              className="bg-[#AEB9E1] w-full h-full   rounded-full transition-all duration-300"
              style={{ width: `${campaign.completion}%` }}
            />
          </div>
        </div>

        {/* Spending Info */}
        <div className="flex flex-wrap items-center justify-between text-base gap-4">
          <div className="flex  items-center gap-8">
            <span className="text-title-color">
              $ {campaign.totalSpent} Total Spent
            </span>
            <span className="text-title-color">{campaign.completion}%</span>
          </div>
          <div className="px-2 py-1 bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)]  text-white text-base  rounded">
            {campaign.limit} Limit
          </div>
        </div>
      </div>

      {/* Continue Setup Button */}
      <div className="mt-8">
        <DashboardTransparentButton
          title="Continue Setup"
          Icon={ChevronRight}
          onClick={() => onContinueSetup(campaign.id)}
        />
      </div>
    </div>
  );
}
