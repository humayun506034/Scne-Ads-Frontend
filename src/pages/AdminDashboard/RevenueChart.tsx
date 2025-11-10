import { useQueryState } from "nuqs";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ChartHeader } from "./CampaignPerformanceAnalytics";

interface RevenueChartProps {
  revenueMeta: {
    monthlyRevenue: {
      year: number;
      months: { month: string; revenue: number }[];
    }[];
  };
}

const RevenueChart: React.FC<RevenueChartProps> = ({ revenueMeta }) => {
  const [isClient, setIsClient] = useState(false);

  const [chartType] = useQueryState<"custom" | "bundle">("chartType", {
    defaultValue: "custom",
    parse: (value: string) =>
      value === "custom" || value === "bundle" ? value : "custom",
  });

  // Year query state
  const [selectedYear] = useQueryState<number>("year", {
    defaultValue: new Date().getFullYear(),
    parse: (value: string) => {
      const num = Number(value);
      return isNaN(num) ? new Date().getFullYear() : num;
    },
  });

  useEffect(() => setIsClient(true), []);

  const monthOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // --- Prepare revenue data ---
  const revenueByMonth: Record<string, number> = {};
  monthOrder.forEach((m) => (revenueByMonth[m] = 0));

  revenueMeta?.monthlyRevenue?.forEach((yearData) => {
    yearData.months.forEach(({ month, revenue }) => {
      const shortMonth = month.slice(0, 3); // e.g., "January" -> "Jan"
      revenueByMonth[shortMonth] += revenue;
    });
  });

  const revenueData = monthOrder.map((m) => revenueByMonth[m]);

  const chartOptions = {
    chart: {
      id: "revenue-bar",
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: "#fff",
    },
    xaxis: {
      categories: monthOrder.map((m) => `${m} ${selectedYear}`),
      title: { text: "Month" },
    },
    yaxis: { title: { text: "Revenue ($)" } },
    plotOptions: { bar: { borderRadius: 6, horizontal: false } },
    dataLabels: { enabled: true },
    colors: ["#38B6FF"],
    tooltip: {
      enabled: true,
      // remove theme to keep dark background
      style: {
        fontSize: "14px",
        color: "#fff", // text color white for dark bg
      },
      fillSeriesColor: false,
      y: {
        formatter: (val: number) => `$${val.toLocaleString()}`,
      },
      marker: {
        show: true,
      },
      onDatasetHover: {
        highlightDataSeries: true,
      },
      theme: "dark", // optional, ensures dark background
    },
  };

  const series = [{ name: "Revenue", data: revenueData }];

  if (!isClient) return <div className="text-white p-6">Loading chart...</div>;

  return (
    <div className="bg-[#0B1739] p-6 rounded-xl my-10">
      <ChartHeader
        title={`Monthly Revenue for ${
          chartType === "custom" ? "Custom" : "Bundle"
        } Campaigns in ${selectedYear}`}
      />
      <Chart
        options={chartOptions}
        series={series}
        type="bar"
        height={300}
      />
    </div>
  );
};

export default RevenueChart;
