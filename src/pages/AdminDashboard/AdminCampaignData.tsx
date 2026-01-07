import CommonSelect from "@/common/CommonSelect";
import Loading from "@/common/MapLoading";
import { Button } from "@/components/ui/button";
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
import { motion } from "framer-motion";
import { useQueryState } from "nuqs";
import CampaignPerformanceAnalytics from "./CampaignPerformanceAnalytics";

type MetricCardProps = {
  title: string;
  subtitle: string;
  value: string | number;
  className?: string;
};

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
    <Card
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(71,148,255,0.25),_rgba(12,22,48,0.95))] backdrop-blur-xl shadow-[0_25px_60px_-35px_rgba(0,0,0,0.8)] ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#38B6FF]/40 to-[#09489D]/20" />
      <CardHeader className="pb-2 relative">
        <CardTitle className="text-xl md:text-2xl font-medium text-white tracking-tight flex items-center gap-2">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-sky-200/90 backdrop-blur">
            #
          </span>
          {title}
        </CardTitle>
        <CardDescription className="text-sm md:text-md font-normal text-slate-200/80">
          {subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <div className="text-3xl md:text-4xl font-medium text-white drop-shadow">
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

  const [selectedYear, setSelectedYear] = useQueryState<number>("year", {
    defaultValue: new Date().getFullYear(),
    parse: (value: string) => {
      const num = Number(value);
      return isNaN(num) ? new Date().getFullYear() : num;
    },
  });

  if (bundleLoading || screenLoading)
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center">
        <Loading />
      </div>
    );

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

  // Filter campaigns
  const filteredCampaigns =
    chartType === "custom" ? CustomCampaigns : BundleCampaigns;

  const availableYears: number[] = Array.from(
    new Set(
      filteredCampaigns
        .map(
          (c: { createdAt: string | number | Date }) =>
            c.createdAt && new Date(c.createdAt).getFullYear()
        )
        .filter(Boolean)
    )
  )
    .map(Number)
    .sort((a, b) => b - a);

  const filteredCampaignsByYear = filteredCampaigns.filter(
    (c: { createdAt: string | number | Date }) =>
      c.createdAt && new Date(c.createdAt).getFullYear() === selectedYear
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
      className="min-h-screen bg-gradient-to-b from-[#020617] via-[#050F2A] to-[#040B1A] lg:py-10"
    >
      <div className="px-6 mx-auto space-y-8">
        <div className="relative overflow-hidden rounded-[32px] border border-white/5 bg-white/5 px-6 py-8 md:px-10 md:py-12 backdrop-blur-2xl shadow-[0_30px_90px_-40px_rgba(0,0,0,0.95)]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-10 right-0 h-32 w-32 bg-[#38B6FF]/30 blur-3xl" />
            <div className="absolute -bottom-12 left-10 h-24 w-24 bg-[#75E0F9]/20 blur-3xl" />
          </div>
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3 text-white">
              <p className="text-sm uppercase tracking-[0.4em] text-title-color">
                Control Center
              </p>
              <h1 className="text-3xl md:text-4xl font-medium leading-tight">
                Campaign Intelligence for Admins
              </h1>
              <p className="text-base text-title-color max-w-2xl">
                Monitor bundles and custom screens 
                filter yearly performance, and switch seamlessly between program
                types without losing context.
              </p>
            </div>
            <div className="rounded-3xl space-y-1 border border-white/10 bg-white/5 px-6 py-4 text-right text-white shadow-inner backdrop-blur">
              <p className="text-sm uppercase tracking-[0.3em] text-title-color">
                Active Year
              </p>
              <p className="text-3xl font-medium">{selectedYear}</p>
              <p className="text-xs text-title-color">Campaign overview</p>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 mt-6 md:mt-2"
        >
          {metricsData.map((metric, index) => (
            <MetricCard
              key={index}
              {...metric}
            />
          ))}
        </motion.div>

        {/* Chart Type Heading */}
        <div className=" ">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg md:text-4xl font-medium text-white tracking-tight">
              Select Campaign Type
            </h2>
            <p className="text-sm text-title-color">
              Toggle between datasets and fine tune the time horizon to refresh
              the analytics canvas.
            </p>
          </div>
        </div>

        {/* Chart Type + Year Filter */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 px-4 md:px-8 lg:px-10">
          {/* Chart Type Buttons */}
          <div className="flex gap-3 flex-wrap">
            {[
              {
                type: "Custom",
                description: "Shows analytics for custom screen campaigns",
              },
              {
                type: "Bundle",
                description: "Shows analytics for bundle campaigns",
              },
            ].map(({ type, description }) => (
              <motion.div
                key={type}
                whileHover={{ scale: chartType === type.toLowerCase() ? 1 : 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.button
                whileTap={{scale:0.8}}
                whileHover={{scale:1.02}}
                  onClick={() =>
                    setChartType(type.toLowerCase() as "custom" | "bundle")
                  }
                  title={description}
                  className={`relative overflow-hidden py-3 px-8 rounded-xl text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer  ${
                    chartType === type.toLowerCase()
                      ? "bg-gradient-to-r from-[#38B6FF] via-[#0c3d7c] to-[#091d3f] text-white shadow-[0_20px_45px_-20px_rgba(8,33,71,0.9)]"
                      : "bg-[#0c1222] border border-dashboard-border text-gray-300 hover:bg-[#111a31]"
                  }`}
                >
                  <span className="relative z-10">{type}</span>
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Year Select */}
          <div className="mt-2 md:mt-0 min-w-[160px]">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur">
              <CommonSelect
                Value={String(selectedYear)}
                setValue={(val) => setSelectedYear(Number(val))}
                options={availableYears.map((year) => ({
                  label: String(year),
                  value: String(year),
                }))}
              />
            </div>
          </div>
        </div>

        {/* Campaign Analytics or Empty State */}
        {filteredCampaignsByYear.length === 0 ? (
          <div className="text-gray-400 text-center py-10">
            No campaigns found for {selectedYear}.
          </div>
        ) : (
          <CampaignPerformanceAnalytics
            campaigns={filteredCampaignsByYear}
            revenueMeta={filteredRevenueMeta}
          />
        )}
      </div>
    </motion.div>
  );
};

export default AdminCampaignData;
