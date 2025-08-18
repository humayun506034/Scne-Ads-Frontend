import { recentCampaignsData } from ".";
import { CampaignCard } from "./CampaignCard";

export function RecentCampaignsSection() {
  const handleContinueSetup = (campaignId: string) => {
    console.log("Continue setup for campaign:", campaignId);
    // Add your navigation logic here
  };

  return (
    <div className="w-full my-20">
      {/* Header Section */}
      <div className="">
        <h2 className=" text-2xl font-semibold mb-2">Your Recent Campaigns</h2>
        <p className="text-title-color text-base leading-relaxed max-w-4xl">
          Quickly get to some of the campaigns you've been tinkering with in the
          past. Go on. You know you want to.
        </p>
      </div>

      {/* Campaign Cards Grid */}
      <div className="grid mt-12 grid-cols-1 xl:grid-cols-3  gap-4">
        {recentCampaignsData.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onContinueSetup={handleContinueSetup}
          />
        ))}
      </div>
    </div>
  );
}
