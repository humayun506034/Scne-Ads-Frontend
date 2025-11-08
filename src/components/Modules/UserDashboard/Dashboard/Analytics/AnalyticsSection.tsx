
import { Campaign, CampaignMeta } from "@/pages/UserDashboard/UserDashboardMetrics";
import { SpendImpressionsChart } from "./ImpressionChart";


type Props = {
  meta: CampaignMeta;
  campaigns: Campaign[];
};

export default function AnalyticsSection({ meta, campaigns }: Props) {
console.log("🚀 ~ AnalyticsSection ~ campaigns:", campaigns)



  
  return (
    <div className="mt-20 w-full">
      <div className="flex flex-col xl:flex-row w-full gap-4">
        <div className="xl:w-[60%]">
          <SpendImpressionsChart meta={meta} />
        </div>
        <div className="xl:w-[40%]">
          <h3 className="text-2xl font-bold text-center mb-4">Recent Campaigns</h3>
          <div className="space-y-3 max-h-[370px] overflow-y-auto">
            {campaigns.map((c) => (
              <div key={c.id} className="bg-[#1E2B4D] p-4 rounded-md">
                <p className="text-sm font-semibold">{c.screens[0]?.screen_name}</p>
                <p className="text-xs text-gray-400">{c.status}</p>
                <p className="text-xs">৳{c.CustomPayment[0]?.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
