import Loading from "@/common/MapLoading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useGetAllBundleCampaignQuery,
  useGetAllCustomCampaignQuery,
} from "@/store/api/Campaign/campaignApi";
import { useGetAllUserQuery } from "@/store/api/User/useApi";

import AdminDashboardHeader from "@/components/Modules/admin-dashboard/AdminDashboardHeader";
import { motion } from "framer-motion";
import CampaignPerformanceAnalytics from "./CampaignPerformanceAnalytics";
import { Button } from "@/components/ui/button";
import CommonSelect from "@/common/CommonSelect";
import { useQueryState } from "nuqs";

type MetricCardProps = {
  title: string;
  subtitle: string;
  value: string | number;
  className?: string;
};

// Metric Card Component
const MetricCard: React.FC<MetricCardProps> = ({
  title,
  subtitle,
  value,
  className = "",
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className={`bg-[#0B1739] border-slate-700/50 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl md:text-2xl font-medium text-[#ffffff]">
          {title}
        </CardTitle>
        <CardDescription className="text-sm md:text-md font-normal text-[#ffffff]">
          {subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl md:text-4xl font-medium text-[#ffffff]">
          {value}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const AdminCampaignData: React.FC = () => {
  const { data: BundleResponse, isLoading: bundleLoading } =
    useGetAllBundleCampaignQuery({});
  const { data: ScreenResponse, isLoading: screenLoading } =
    useGetAllCustomCampaignQuery({});
  const { data: UserResponse } = useGetAllUserQuery({});

  const [chartType, setChartType] = useQueryState<"custom" | "bundle">(
    "chartType",
    {
      defaultValue: "custom",
      parse: (value: string) =>
        value === "custom" || value === "bundle" ? value : "custom",
    }
  );

  // Year query state
  const [selectedYear, setSelectedYear] = useQueryState<number>("year", {
    defaultValue: new Date().getFullYear(),
    parse: (value: string) => {
      const num = Number(value);
      return isNaN(num) ? new Date().getFullYear() : num;
    },
  });
  if (bundleLoading || screenLoading) return <Loading />;

  const BundleCampaigns = BundleResponse?.data?.data ?? [];
  const CustomCampaigns = ScreenResponse?.data?.data ?? [];
  const UserAnalytics = UserResponse?.data?.analytics ?? {};

  const metricsData: MetricCardProps[] = [
    {
      title: "Total Bundle Campaigns",
      subtitle: "Pending, Running and Completed",
      value: BundleResponse?.data?.meta?.counts.totalCampaign ?? 0,
    },
    {
      title: "Total Screen Campaigns",
      subtitle: "Pending, Running and Completed",
      value: ScreenResponse?.data?.meta?.counts.totalCampaign ?? 0,
    },
    {
      title: "Total Revenue",
      subtitle: "Year-to-Date Earnings",
      value:
        (BundleResponse?.data?.meta?.revenue?.totalRevenue ?? 0) +
        (ScreenResponse?.data?.meta?.revenue?.totalRevenue ?? 0),
    },
    {
      title: "Total Admin",
      subtitle: "Admins",
      value: UserAnalytics?.totalAdmins ?? 0,
    },
    {
      title: "Total Customers",
      subtitle: "Customers",
      value: UserAnalytics?.totalCustomers ?? 0,
    },
    {
      title: "New Signups",
      subtitle: "Last 15 Days",
      value: UserAnalytics?.signUps15d ?? 0,
    },
  ];

  // --- Pass actual campaigns to analytics ---
  const filteredCampaigns =
    chartType === "custom" ? CustomCampaigns : BundleCampaigns;

  const availableYears: number[] = Array.from(
    new Set(
      (chartType === "custom" ? CustomCampaigns : BundleCampaigns)
        .map((c) => c.createdAt && new Date(c.createdAt).getFullYear())
        .filter(Boolean)
    )
  )
    .map(Number) // ensure type is number
    .sort((a, b) => b - a); // now TS knows a, b are numbers

  const filteredCampaignsByYear = filteredCampaigns.filter(
    (c) => new Date(c.createdAt).getFullYear() === selectedYear
  );

  const filteredRevenueMeta = {
    monthlyRevenue: [
      ...(chartType === "bundle"
        ? BundleResponse?.data?.meta?.revenue?.monthlyRevenue ?? []
        : ScreenResponse?.data?.meta?.revenue?.monthlyRevenue ?? []),
    ].filter((y) => y.year === selectedYear),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-bg-dashboard lg:py-8"
    >
      <div className="px-4 md:px-8 lg:px-6 mx-auto">
        <AdminDashboardHeader />

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10 mt-6 md:mt-10"
        >
          {metricsData.map((metric, index) => (
            <MetricCard
              key={index}
              {...metric}
            />
          ))}
        </motion.div>

        <div className="flex gap-4 mb-6">
          {["Custom", "Bundle"].map((type) => (
            <Button
              key={type}
              onClick={() =>
                setChartType(type.toLowerCase() as "custom" | "bundle")
              }
              className={`cursor-pointer py-2 px-6 rounded-lg text-sm font-medium transition-colors duration-200 ease-in-out ${
                chartType === type.toLowerCase()
                  ? "bg-gradient-to-r from-[#38B6FF] to-[#09489D] text-white shadow-md"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {type}
            </Button>
          ))}
          <CommonSelect
            Value={String(selectedYear)}
            setValue={(val) => setSelectedYear(Number(val))}
            options={availableYears.map((year) => ({
              label: String(year),
              value: String(year),
            }))}
          />
        </div>

        <CampaignPerformanceAnalytics
          campaigns={filteredCampaignsByYear}
          revenueMeta={filteredRevenueMeta}
        />
      </div>
    </motion.div>
  );
};

export default AdminCampaignData;
