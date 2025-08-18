import { campaignTableData } from "@/components/Modules/UserDashboard/NewCampaign/CampaignManagement.tsx";
import { CampaignTable } from "@/components/Modules/UserDashboard/NewCampaign/CampaignManagement.tsx/CampaignTable";

export default function CampaignTablePage() {
  return (
    <div className="px-4 md:px-10 mt-10">
      <div className="mb-6">
        <h1 className="text-2xl md:text-4xl  font-semibold text-white mb-2">
          Campaign Management
        </h1>
        <p className="text-title-color text-base md:text-lg">
          Manage your advertising campaigns and track performance metrics.
        </p>
      </div>

      <CampaignTable campaigns={campaignTableData} />
    </div>
  );
}
