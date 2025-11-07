import AnalyticsSection from "@/components/Modules/UserDashboard/Dashboard/Analytics/AnalyticsSection";
import ResponsiveBillboardMap from "@/components/Modules/UserDashboard/Dashboard/BillboardMap/ResponsiveBillboard";
import NewCampaignSection from "@/components/Modules/UserDashboard/Dashboard/NewCampaign/NewCampaign";
import { StatsSection } from "@/components/Modules/UserDashboard/Dashboard/Stats/StatsSection";
import { UserDashboardNavbar } from "@/components/Modules/UserDashboard/UserDashboardNavbar";

export interface SpendDataPoint {
  x: string; // e.g. "Jan", "Feb"
  y: number; // spend amount
}

export interface AnalyticsResponse {
  period: "month" | "year";
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  totalBundleSpend: number;
  totalCustomSpend: number;
  totalSpend: number;
  spendData: SpendDataPoint[];
  growth: number;
  isPositive: boolean;
}

const UserDashboardMetrics = () => {
  return (
    <div>
      <div className="md:px-8">
        <UserDashboardNavbar />
      </div>
      <div className="px-5 md:px-10">
        <div className="flex justify-center items-start gap-4 mt-12 flex-col xl:flex-row w-full ">
          <div className="xl:w-[60%]  w-full">
            <StatsSection />
          </div>

          <div className="xl:w-[40%] w-full">
            <ResponsiveBillboardMap />
          </div>
        </div>
        <AnalyticsSection />
        <NewCampaignSection />
        {/* <RecentCampaignsSection /> */}
      </div>
    </div>
  );
};

export default UserDashboardMetrics;
