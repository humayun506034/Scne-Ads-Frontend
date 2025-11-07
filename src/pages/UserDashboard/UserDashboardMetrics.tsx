import CommonLoading from "@/common/CommonLoading";
import AnalyticsSection from "@/components/Modules/UserDashboard/Dashboard/Analytics/AnalyticsSection";
import ResponsiveBillboardMap from "@/components/Modules/UserDashboard/Dashboard/BillboardMap/ResponsiveBillboard";
import NewCampaignSection from "@/components/Modules/UserDashboard/Dashboard/NewCampaign/NewCampaign";
import { StatsSection } from "@/components/Modules/UserDashboard/Dashboard/Stats/StatsSection";
import { UserDashboardNavbar } from "@/components/Modules/UserDashboard/UserDashboardNavbar";
import { useGetAnalyticsQuery } from "@/store/api/analyticApi";
import { useSearchParams } from "react-router-dom";

export interface SpendPoint {
  x: string; // e.g. "Jan"
  y: number; // spend value
}

export interface AnalyticsData {
  period: "year" | "month";
  startDate: string;
  endDate: string;
  totalBundleSpend: number;
  totalCustomSpend: number;
  totalSpend: number;
  growth: number;
  isPositive: boolean;
  spendData: SpendPoint[];
}

export interface AnalyticsResponse {
  availableYears: number[];
  analyticsData: AnalyticsData;
}

const UserDashboardMetrics = () => {
  const [searchParams] = useSearchParams();

  const duration = searchParams.get("duration");

  const { data, isLoading } = useGetAnalyticsQuery(duration!);

  if (isLoading) {
    return <CommonLoading />;
  }

  const analyticsData = data?.data.analyticsData;

  return (
    <div>
      <div className="md:px-8">
        <UserDashboardNavbar />
      </div>
      <div className="px-5 md:px-10">
        <div className="flex justify-center items-start gap-4 mt-12 flex-col xl:flex-row w-full ">
          <div className="xl:w-[60%]  w-full">
            <StatsSection analyticsData={analyticsData} />
          </div>

          <div className="xl:w-[40%] w-full">
            <ResponsiveBillboardMap />
          </div>
        </div>
        <AnalyticsSection analyticsData={analyticsData} />
        <NewCampaignSection />
        {/* <RecentCampaignsSection /> */}
      </div>
    </div>
  );
};

export default UserDashboardMetrics;
