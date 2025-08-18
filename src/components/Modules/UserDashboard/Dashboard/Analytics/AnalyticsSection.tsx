import { analyticsData } from ".";
import { ClicksChart } from "./ClicksChart";
import { ConversionsChart } from "./ConversationChart";
import { SpendImpressionsChart } from "./ImpressionChart";

export default function AnalyticsSection() {
  return (
    <div className="mt-20  w-ful">
      {/* Main Grid */}
      <div className="flex flex-col xl:flex-row w-full gap-4 xl:gap-0">
        {/* Left Side - Spend & Impressions Chart */}
        <div className="xl:w-[60%]">
          <SpendImpressionsChart
            spendData={analyticsData.spendData}
            impressionsData={analyticsData.impressionsData}
            totalSpend={analyticsData.totalSpend}
          />
        </div>

        {/* Right Side - Conversions & Clicks */}
        <div className="space-y-4 xl:space-y-0  xl:w-[40%] ">
          <ConversionsChart
            data={analyticsData.conversionsData}
            totalConversions={analyticsData.totalConversions}
          />

          <ClicksChart
            data={analyticsData.clicksData}
            totalClicks={analyticsData.totalClicks}
          />
        </div>
      </div>
    </div>
  );
}
