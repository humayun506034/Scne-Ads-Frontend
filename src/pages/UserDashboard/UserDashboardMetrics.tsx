import { parseAsString, parseAsInteger, useQueryState } from "nuqs";
import { useGetCustomerCustomsQuery } from "@/store/api/analyticApi";
import { UserDashboardNavbar } from "@/components/Modules/UserDashboard/UserDashboardNavbar";
import { StatsSection } from "@/components/Modules/UserDashboard/Dashboard/Stats/StatsSection";
import AnalyticsSection from "@/components/Modules/UserDashboard/Dashboard/Analytics/AnalyticsSection";
import ResponsiveBillboardMap from "@/components/Modules/UserDashboard/Dashboard/BillboardMap/ResponsiveBillboard";
import NewCampaignSection from "@/components/Modules/UserDashboard/Dashboard/NewCampaign/NewCampaign";
import Loading from "@/common/MapLoading";

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
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [dateFilter] = useQueryState(
    "dateFilter",
    parseAsString.withDefault("today")
  );
  const [startDate] = useQueryState("startDate", parseAsString);
  const [endDate] = useQueryState("endDate", parseAsString);

  // --- fallback to full current year if no custom dates ---
  const currentYear = new Date().getFullYear();
  const defaultStart = `${currentYear}-01-01T00:00:00.000Z`;
  const defaultEnd = `${currentYear}-12-31T00:00:00.000Z`;

  const effectiveStart = startDate || defaultStart;
  const effectiveEnd = endDate || defaultEnd;

  const { data, isLoading } = useGetCustomerCustomsQuery(undefined);

  if (isLoading) return <Loading />;

  const campaignData = data?.data?.data;
  const meta = data?.data?.meta;

  return (
    <div>
      <div className="md:px-8">
        <UserDashboardNavbar />
      </div>
      <div className="px-5 md:px-10">
        <div className="flex justify-center items-start gap-4 mt-12 flex-col xl:flex-row w-full">
          <div className="xl:w-[60%] w-full">
            <StatsSection meta={meta} />
          </div>
          <div className="xl:w-[40%] w-full">
            <ResponsiveBillboardMap />
          </div>
        </div>
        <AnalyticsSection meta={meta} campaigns={campaignData} />
        <NewCampaignSection />
      </div>
    </div>
  );
};

export default UserDashboardMetrics;
