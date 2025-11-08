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
  // const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  // const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  // const [dateFilter] = useQueryState(
  //   "dateFilter",
  //   parseAsString.withDefault("today")
  // );
  // const [startDate] = useQueryState("startDate", parseAsString);
  // const [endDate] = useQueryState("endDate", parseAsString);

  // // --- fallback to full current year if no custom dates ---
  // const currentYear = new Date().getFullYear();
  // const defaultStart = `${currentYear}-01-01T00:00:00.000Z`;
  // const defaultEnd = `${currentYear}-12-31T00:00:00.000Z`;

  // const effectiveStart = startDate || defaultStart;
  // const effectiveEnd = endDate || defaultEnd;

  const { data: customData, isLoading: customDataLoading } =
    useGetCustomerCustomsQuery(undefined);
  const { data: bundleData, isLoading: bundleDataLoading } =
    useGetCustomerBundlesQuery(undefined);

  if (customDataLoading || bundleDataLoading) return <Loading />;
  const customCampaigns = customData?.data?.data || [];
  const bundleCampaigns = bundleData?.data?.data || [];

  const mergedData = [...customCampaigns, ...bundleCampaigns];

  // Merge stats manually
  const mergedMeta: CampaignMeta = {
    page: 1,
    limit: 10,
    total:
      (customData?.data?.meta?.total || 0) +
      (bundleData?.data?.meta?.total || 0),
    totalPages: 1,
    counts: {
      totalCampaign:
        (customData?.data?.meta?.counts.totalCampaign || 0) +
        (bundleData?.data?.meta?.counts.totalCampaign || 0),
      byStatus: {
        pending:
          (customData?.data?.meta?.counts.byStatus.pending || 0) +
          (bundleData?.data?.meta?.counts.byStatus.pending || 0),
        running:
          (customData?.data?.meta?.counts.byStatus.running || 0) +
          (bundleData?.data?.meta?.counts.byStatus.running || 0),
        completed:
          (customData?.data?.meta?.counts.byStatus.completed || 0) +
          (bundleData?.data?.meta?.counts.byStatus.completed || 0),
      },
    },
    revenue: {
      totalRevenue:
        (customData?.data?.meta?.revenue.totalRevenue || 0) +
        (bundleData?.data?.meta?.revenue.totalRevenue || 0),
      monthlyRevenue: [
        {
          year: new Date().getFullYear(),
          months: (
            customData?.data?.meta?.revenue.monthlyRevenue?.[0]?.months || []
          ).map((m, i) => ({
            month: m.month,
            revenue:
              m.revenue +
              (bundleData?.data?.meta?.revenue.monthlyRevenue?.[0]?.months?.[i]
                ?.revenue || 0),
          })),
        },
      ],
    },
  };


  return (
    <div>
      <div className="md:px-8">
        <UserDashboardNavbar />
      </div>
      <div className="px-5 md:px-10">
        <div className="flex justify-center items-start gap-4 mt-12 flex-col xl:flex-row w-full">
          <div className="xl:w-[60%] w-full">
            <StatsSection meta={mergedMeta} />
          </div>
          <div className="xl:w-[40%] w-full">
            <ResponsiveBillboardMap />
          </div>
        </div>
        <AnalyticsSection
          meta={mergedMeta}
          campaigns={mergedData}
        />
        <NewCampaignSection />
      </div>
    </div>
  );
};

export default UserDashboardMetrics;
