import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

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
  useEffect(() => setIsClient(true), []);

  const monthOrder = [
    "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
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
    xaxis: { categories: monthOrder, title: { text: "Month" } },
    yaxis: { title: { text: "Revenue ($)" } },
    plotOptions: { bar: { borderRadius: 6, horizontal: false } },
    dataLabels: { enabled: true },
    colors: ["#38B6FF"],
    tooltip: { y: { formatter: (val: number) => `$${val.toLocaleString()}` } },
  };

  const series = [{ name: "Revenue", data: revenueData }];

  if (!isClient) return <div className="text-white p-6">Loading chart...</div>;

  return (
    <div className="bg-[#0B1739] p-6 rounded-xl">
      <h2 className="text-white text-xl mb-4">Monthly Revenue</h2>
      <Chart options={chartOptions} series={series} type="bar" height={300} />
    </div>
  );
};

export default RevenueChart;
