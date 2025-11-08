import React, { useEffect, useState } from "react";
import CommonSelect from "@/common/CommonSelect";
import { CalendarDays } from "lucide-react";
import CommonLoading from "@/common/CommonLoading";
import { CampaignMeta } from "@/pages/UserDashboard/UserDashboardMetrics";
import { MetricCard } from "./MetricCard";

const Chart = React.lazy(() => import("react-apexcharts"));

type Props = {
  meta: CampaignMeta;
};

export function SpendImpressionsChart({ meta }: Props) {
  const [isClient, setIsClient] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Jan 2025 - Dec 2025");

  useEffect(() => setIsClient(true), []);

  const options = [
    { value: "Jan 2025 - Dec 2025", label: "Jan 2025 - Dec 2025" },
    { value: "Jan 2024 - Dec 2024", label: "Jan 2024 - Dec 2024" },
    { value: "Jan 2023 - Dec 2023", label: "Jan 2023 - Dec 2023" },
  ];

  // Data extraction
  const monthly = meta?.revenue?.monthlyRevenue?.[0]?.months || [];
  const categories = monthly.map((m) => m.month);
  const data = monthly.map((m) => m.revenue);

  const totalRevenue = meta?.revenue?.totalRevenue || 0;

  const chartOptions = {
    chart: {
      type: "area" as const,
      height: 400,
      background: "transparent",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    theme: { mode: "dark" as const },
    colors: ["#38B6FF"],
    stroke: { curve: "smooth" as const, width: 3 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    grid: {
      borderColor: "#1e293b",
      strokeDashArray: 3,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: "#64748b", fontSize: "12px" },
      },
    },
    dataLabels: { enabled: false },
    yaxis: {
      labels: {
        style: { colors: "#64748b", fontSize: "12px" },
        formatter: (v: number) => {
          if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
          if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K`;
          return v.toString();
        },
      },
    },
    tooltip: {
      theme: "dark",
      style: { fontSize: "12px" },
      y: {
        formatter: (v: number) => {
          if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(2)}M`;
          if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K`;
          return v.toString();
        },
      },
    },
  };

  const series = [{ name: "Revenue", data }];

  if (!isClient) {
    return (
      <div className="bg-[#0B1739] rounded-xl p-6 h-[400px] flex items-center justify-center">
        <div className="text-title-color">Loading chart...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#0B1739] rounded-l-xl rounded-r-xl xl:rounded-r-none p-6 border border-[#343B4F]">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <MetricCard
          title="Total Revenue"
          value={`৳${totalRevenue.toLocaleString()}`}
          growth={5.4}
          isPositive={true}
        />

        <div className="flex flex-wrap items-center gap-4">
          {/* Legend */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#38B6FF]" />
              <span className="text-title-color text-sm">Revenue</span>
            </div>
          </div>

          {/* Year Dropdown */}
          <div className="flex items-center gap-2 bg-[#0A1330] rounded-lg px-2 py-1">
            <CommonSelect
              bgColor="#0A1330"
              Value={selectedDate}
              setValue={setSelectedDate}
              options={options}
              Icon={CalendarDays}
            />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[370px]">
        <Chart options={chartOptions} series={series} type="area" height="100%" />
      </div>
    </div>
  );
}
