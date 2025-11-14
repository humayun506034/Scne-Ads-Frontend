import CommonHeader from "@/common/CommonHeader";
import Loading from "@/common/MapLoading";
import AnalyticsSection from "@/components/Modules/UserDashboard/Dashboard/Analytics/AnalyticsSection";
import ResponsiveBillboardMap from "@/components/Modules/UserDashboard/Dashboard/BillboardMap/ResponsiveBillboard";
import NewCampaignSection from "@/components/Modules/UserDashboard/Dashboard/NewCampaign/NewCampaign";
import { StatsSection } from "@/components/Modules/UserDashboard/Dashboard/Stats/StatsSection";
import {
  useGetCustomerBundlesQuery,
  useGetCustomerCustomsQuery,
} from "@/store/api/analyticApi";
import { motion } from 'framer-motion';
import { parseAsString, useQueryState } from "nuqs";

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

export interface BundleDetails {
  bundle_name?: string;
  duration?: string;
  price?: number;
  slug?: string;
  screens?: Screen[];
  img_url?: string;
  status?: string;
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
  bundle?: BundleDetails;
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

  if (customLoading || bundleLoading)
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center">
        <Loading />
      </div>
    );

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

  const viewModes = [
    {
      value: "bundle",
      headline: "Bundle Placements",
    
    },
    {
      value: "custom",
      headline: "Custom Placements",
      
    },
  ] as const;

  return (
    <div className="mb-20">
    

      <div className="px-4  sm:px-6 md:px-10">
      <div className="flex  my-20  flex-col md:flex-row  md:items-start md:justify-between gap-4">
      

        <div className="w-full md:w-[60%] space-y-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="">
              <p className="uppercase tracking-[0.4em] text-xs mb-2 text-title-color">
                Analytics Dashboard
              </p>
              <CommonHeader title="Screen Intelligence" />
              <p className="text-sm md:text-base text-gray-300 max-w-2xl">
                Switch between bundle or custom programs to inspect live screen
                performance.
              </p>
            </div>
            
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            {viewModes.map((mode) => {
              const isActive = chartType === mode.value;
              return (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  key={mode.value}
                  onClick={() => setChartType(mode.value)}
                  className={`flex-1 min-w-0 gap-3 sm:gap-4 flex items-center justify-between sm:justify-center text-left cursor-pointer rounded-2xl border border-white/10 px-4 py-3 sm:px-6 h-auto transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#38B6FF] via-[#0c3d7c] to-[#091d3f] text-white shadow-[0_20px_45px_-20px_rgba(8,33,71,0.9)]"
                      : "bg-[#0c1222] text-gray-300 hover:bg-[#111a31]"
                  }`}
                >
                  <span className="block text-xs uppercase tracking-[0.3em] text-sky-200/80">
                    {isActive ? "Active" : "View"}
                  </span>
                  <p className="text-base sm:text-lg font-semibold">{mode.headline}</p>
                </motion.button>
              );
            })}
          </div>
           {filteredMeta && (
              <StatsSection
                meta={filteredMeta}
                availableYears={availableYears}
              />
            )}
        </div>
<div className="w-full  md:w-[40%]">
  <ResponsiveBillboardMap/>
              </div> 
        </div>
        {filteredMeta && (
          <AnalyticsSection
            meta={filteredMeta}
            campaigns={filteredCampaigns}
            viewType={chartType === "bundle" ? "bundle" : "custom"}
          />
        )}

        
      </div>
        <div className="flex justify-center items-stretch gap-6 md:mt-8 flex-col xl:flex-row w-full">
       
           
            <NewCampaignSection />
        
        </div>
    </div>
  );
};

export default UserDashboardMetrics;
