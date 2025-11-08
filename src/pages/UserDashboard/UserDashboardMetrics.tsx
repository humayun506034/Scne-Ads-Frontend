import {
  useGetCustomerBundlesQuery,
  useGetCustomerCustomsQuery,
} from "@/store/api/analyticApi";
import { UserDashboardNavbar } from "@/components/Modules/UserDashboard/UserDashboardNavbar";
import { StatsSection } from "@/components/Modules/UserDashboard/Dashboard/Stats/StatsSection";
import AnalyticsSection from "@/components/Modules/UserDashboard/Dashboard/Analytics/AnalyticsSection";
import ResponsiveBillboardMap from "@/components/Modules/UserDashboard/Dashboard/BillboardMap/ResponsiveBillboard";
import NewCampaignSection from "@/components/Modules/UserDashboard/Dashboard/NewCampaign/NewCampaign";
import Loading from "@/common/MapLoading";
import { parseAsString, useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";

export interface ScreenImage {
  url: string;
  index: string;
}

export interface Screen {
  id: string;
  slug: string;
  screen_name: string;
  screen_size: string;
  description: string;
  resolution: string;
  lat: string;
  lng: string;
  imageUrls: ScreenImage[];
  price: number;
  location: string;
  status: string;
  availability: string;
}

export interface CustomPayment {
  id: string;
  amount: number;
  status: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
  contentUrls: string[];
}

export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface Campaign {
  id: string;
  customerId: string;
  paymentId: string;
  status: string;
  type: string;
  startDate: string;
  endDate: string;
  contentUrls: string[];
  createdAt: string;
  updatedAt: string;
  customer: Customer;
  screens: Screen[];
  CustomPayment: CustomPayment[];
}

export interface CampaignMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  counts: {
    totalCampaign: number;
    byStatus: {
      pending: number;
      running: number;
      completed: number;
    };
  };
  revenue: {
    totalRevenue: number;
    monthlyRevenue: {
      year: number;
      months: { month: string; revenue: number }[];
    }[];
  };
}

export interface CampaignResponse {
  data: Campaign[];
  meta: CampaignMeta;
}

const UserDashboardMetrics = () => {
  const [chartType, setChartType] = useQueryState(
    "chartType",
    parseAsString.withDefault("bundle")
  );
  const [period, setPeriod] = useQueryState(
    "period",
    parseAsString.withDefault(new Date().getFullYear().toString())
  );

  const {
    data: customData,
    isLoading: customLoading,
    isError: customError,
  } = useGetCustomerCustomsQuery(undefined);
  const {
    data: bundleData,
    isLoading: bundleLoading,
    isError: bundleError,
  } = useGetCustomerBundlesQuery(undefined);

  if (customLoading || bundleLoading) return <Loading />;
  if (customError || bundleError)
    return <div className="text-center py-10">Failed to load data.</div>;

  const isBundle = chartType === "bundle";
  const selectedResponse = isBundle ? bundleData?.data : customData?.data;

  const campaigns = selectedResponse?.data || [];
  const meta = selectedResponse?.meta;

  // Extract available years
  const revenueYears =
    meta?.revenue?.monthlyRevenue?.map((r) => r.year.toString()) || [];
  const campaignYears = campaigns.map((c) =>
    new Date(c.createdAt).getFullYear().toString()
  );
  const availableYears = Array.from(
    new Set([...revenueYears, ...campaignYears])
  );

  // Fallback year
  if (!availableYears.includes(period) && availableYears.length > 0) {
    setPeriod(availableYears.at(-1)!);
  }

  // Filter data by selected year
  const filteredCampaigns = campaigns.filter(
    (c) => new Date(c.createdAt).getFullYear().toString() === period
  );

  let filteredMeta: CampaignMeta | undefined = undefined;
  if (meta) {
    const selectedRevenueYear = meta.revenue.monthlyRevenue.find(
      (r) => r.year.toString() === period
    );

    filteredMeta = {
      ...meta,
      revenue: {
        ...meta.revenue,
        monthlyRevenue: selectedRevenueYear
          ? [selectedRevenueYear]
          : meta.revenue.monthlyRevenue,
      },
    };
  }

  return (
    <div>
      <div className="md:px-8">
        <UserDashboardNavbar />
      </div>

      <div className="px-5 md:px-10">
        <div className="flex justify-center items-start gap-4 mt-12 flex-col xl:flex-row w-full">
          <div className="xl:w-[60%] w-full">
            {filteredMeta && (
              <StatsSection
                meta={filteredMeta}
                availableYears={availableYears}
              />
            )}
          </div>
          <div className="xl:w-[40%] w-full">
            <ResponsiveBillboardMap />
          </div>
        </div>

        <div className="flex gap-2 my-8">
          {["Custom", "Bundle"].map((type) => (
            <Button
              key={type}
              onClick={() => setChartType(type.toLowerCase())}
              className={`cursor-pointer py-2 px-6 rounded-lg text-sm font-medium transition-colors duration-200 ease-in-out ${
                chartType === type.toLowerCase()
                  ? "bg-gradient-to-r from-[#38B6FF] to-[#09489D] text-white shadow-md"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {type}
            </Button>
          ))}
        </div>

        {filteredMeta && (
          <AnalyticsSection
            meta={filteredMeta}
            campaigns={filteredCampaigns}
          />
        )}

        <NewCampaignSection />
      </div>
    </div>
  );
};

export default UserDashboardMetrics;
