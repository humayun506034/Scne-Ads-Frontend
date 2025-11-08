import React, { useEffect, useState } from "react";
import { CampaignMeta } from "@/pages/UserDashboard/UserDashboardMetrics";
import { MetricCard } from "./MetricCard";
import { useQueryState, parseAsString } from "nuqs";

const Chart = React.lazy(() => import("react-apexcharts"));

type Props = {
  meta: CampaignMeta;
};

export function SpendImpressionsChart({ meta }: Props) {
  const [isClient, setIsClient] = useState(false);
  const [period] = useQueryState(
    "period",
    parseAsString.withDefault(new Date().getFullYear().toString())
  );

  useEffect(() => setIsClient(true), []);

  // Extract correct year’s data
  const selectedYearData = meta?.revenue?.monthlyRevenue.find(
    (r) => r.year.toString() === period
  );

  const monthly = selectedYearData?.months || [];
  const year = selectedYearData?.year || new Date().getFullYear();
  const categories = monthly.map((m) => `${m.month} ${year}`);
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
      labels: { style: { colors: "#64748b", fontSize: "12px" } },
    },
    dataLabels: { enabled: true },
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
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <MetricCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
        />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#38B6FF]" />
            <span className="text-title-color text-sm">Revenue ({year})</span>
          </div>
        </div>
      </div>

      <div className="h-[370px]">
        <Chart
          options={chartOptions}
          series={series}
          type="area"
          height="100%"
        />
      </div>
    </div>
  );
}
