import React, { useEffect, useState } from "react";
import { ChartDataPoint } from ".";
import { MetricCard } from "./MetricCard";

const Chart = React.lazy(() => import("react-apexcharts"));

interface ClicksChartProps {
  data: ChartDataPoint[];
  totalClicks: {
    value: string;
    growth: number;
    isPositive: boolean;
  };
}

export function ClicksChart({ data, totalClicks }: ClicksChartProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const chartOptions = {
    chart: {
      type: "line" as const,
      height: 200,
      background: "transparent",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    theme: {
      mode: "dark" as const,
    },

    colors: ["#CB3CFF"],
    stroke: {
      curve: "smooth" as const,
      width: 3,
    },

    grid: {
      show: false,
    },
    xaxis: {
      categories: data.map((item) => item.x),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#c3cee9",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      min: 0,
      max: 500,
      labels: {
        style: {
          colors: "#c3cee9",
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: (value: number) => `${value} clicks`,
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "Clicks",
      data: data.map((item) => item.y),
    },
  ];
  const svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="13"
      viewBox="0 0 11 13"
      fill="none"
    >
      <path
        d="M4.06041 1.57199H6.63186C6.74552 1.57199 6.85453 1.52684 6.93491 1.44647C7.01528 1.36609 7.06043 1.25708 7.06043 1.14342C7.06043 1.02975 7.01528 0.920744 6.93491 0.84037C6.85453 0.759997 6.74552 0.714844 6.63186 0.714844H4.06041C3.94675 0.714844 3.83774 0.759997 3.75736 0.84037C3.67699 0.920744 3.63184 1.02975 3.63184 1.14342C3.63184 1.25708 3.67699 1.36609 3.75736 1.44647C3.83774 1.52684 3.94675 1.57199 4.06041 1.57199Z"
        fill="#AEB9E1"
      />
      <path
        d="M5.34602 2.42969C4.32885 2.42969 3.33453 2.73131 2.48878 3.29642C1.64304 3.86153 0.98386 4.66474 0.594607 5.60448C0.205353 6.54422 0.103507 7.57829 0.301947 8.57591C0.500386 9.57353 0.990199 10.4899 1.70945 11.2092C2.42869 11.9284 3.34507 12.4182 4.34269 12.6167C5.34032 12.8151 6.37438 12.7132 7.31412 12.324C8.25386 11.9347 9.05707 11.2756 9.62218 10.4298C10.1873 9.58407 10.4889 8.58975 10.4889 7.57258C10.4861 6.20947 9.94333 4.903 8.97947 3.93913C8.0156 2.97527 6.70913 2.43252 5.34602 2.42969ZM7.77282 5.7565L5.65138 7.87794C5.56946 7.95715 5.45997 8.00143 5.34602 8.00143C5.23207 8.00143 5.12258 7.95715 5.04066 7.87794C4.96018 7.79668 4.91503 7.68694 4.91503 7.57258C4.91503 7.45822 4.96018 7.34848 5.04066 7.26722L7.1621 5.14578C7.20053 5.09896 7.24833 5.0607 7.30244 5.03347C7.35654 5.00624 7.41575 4.99063 7.47624 4.98766C7.53674 4.98469 7.59719 4.99442 7.6537 5.01622C7.71021 5.03802 7.76154 5.0714 7.80437 5.11423C7.8472 5.15706 7.88059 5.20839 7.90238 5.2649C7.92418 5.32141 7.93391 5.38186 7.93094 5.44236C7.92797 5.50285 7.91236 5.56206 7.88513 5.61616C7.8579 5.67027 7.81964 5.71807 7.77282 5.7565Z"
        fill="#AEB9E1"
      />
    </svg>
  );
  if (!isClient) {
    return (
      <div className="bg-[#0B1739] rounded-xl p-4  h-[280px] flex items-center justify-center">
        <div className="text-title-color">Loading chart...</div>
      </div>
    );
  }

  return (
    <div
      className="bg-[#0B1739] xl:border-l-0  rounded-l-lg xl:rounded-l-none border-t xl:border-t-0 rounded-t-xl
    xl:rounded-t-none rounded-r-lg   xl:border-t-none  p-4 border-r border-l xl:border-l-none border-b rounded-br-lg  border-[#343B4F]"
    >
      {/* Header */}

      <MetricCard
        title="Total Clicks"
        SVG={svg}
        value={totalClicks.value}
        growth={totalClicks.growth}
        isPositive={totalClicks.isPositive}
        className="mb-4"
      />

      {/* Chart */}
      <div className="h-[120px]">
        <Chart
          options={chartOptions}
          series={series}
          type="line"
          height="120%"
        />
      </div>
    </div>
  );
}
