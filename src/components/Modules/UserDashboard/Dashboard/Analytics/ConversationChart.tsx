import React, { useEffect, useState } from "react";
import { ChartDataPoint } from ".";
import { MetricCard } from "./MetricCard";

const Chart = React.lazy(() => import("react-apexcharts"));

interface ConversionsChartProps {
  data: ChartDataPoint[];
  totalConversions: {
    value: string;
    growth: number;
    isPositive: boolean;
  };
}

export function ConversionsChart({
  data,
  totalConversions,
}: ConversionsChartProps) {
  const [isClient, setIsClient] = useState(false);
  const svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
    >
      <path
        d="M12.8633 11.5849C12.8633 11.7073 12.8147 11.8247 12.7281 11.9112C12.6415 11.9978 12.5242 12.0464 12.4017 12.0464H1.32482C1.20241 12.0464 1.08502 11.9978 0.998463 11.9112C0.911907 11.8247 0.863281 11.7073 0.863281 11.5849V2.35412C0.863281 2.23171 0.911907 2.11431 0.998463 2.02776C1.08502 1.9412 1.20241 1.89258 1.32482 1.89258C1.44723 1.89258 1.56462 1.9412 1.65118 2.02776C1.73773 2.11431 1.78636 2.23171 1.78636 2.35412V8.62527L4.68828 5.71758C4.77579 5.63091 4.89397 5.58229 5.01713 5.58229C5.14029 5.58229 5.25847 5.63091 5.34597 5.71758L6.86328 7.24066L9.6729 4.43104L8.84213 3.60604C8.77952 3.53931 8.73708 3.45621 8.71972 3.36637C8.70236 3.27652 8.7108 3.1836 8.74405 3.09835C8.77998 3.01479 8.83951 2.94354 8.91535 2.89333C8.99118 2.84311 9.08002 2.81612 9.17097 2.81566H11.4787C11.6011 2.81566 11.7185 2.86428 11.805 2.95084C11.8916 3.03739 11.9402 3.15479 11.9402 3.27719V5.58489C11.9405 5.67601 11.9138 5.76517 11.8635 5.84114C11.8132 5.91712 11.7415 5.9765 11.6575 6.01181C11.6006 6.03442 11.5399 6.04616 11.4787 6.04642C11.3561 6.04591 11.2384 5.99842 11.1498 5.91373L10.3248 5.08296L7.19213 8.22142C7.10462 8.30809 6.98644 8.35671 6.86328 8.35671C6.74012 8.35671 6.62194 8.30809 6.53444 8.22142L5.01713 6.69835L1.78636 9.92912V11.1233H12.4017C12.5242 11.1233 12.6415 11.172 12.7281 11.2585C12.8147 11.3451 12.8633 11.4625 12.8633 11.5849Z"
        fill="#AEB9E1"
      />
    </svg>
  );
  useEffect(() => {
    setIsClient(true);
  }, []);

  const chartOptions = {
    chart: {
      type: "bar" as const,
      height: 200,
      background: "transparent",
      toolbar: {
        show: true,
        export: {
          csv: {
            filename: "conversions",
          },
        },
      },
    },
    theme: {
      mode: "dark" as const,
    },
    colors: ["#00C2FF", "#CB3CFF"],
    // Adding alternating colors between purple and blue
    plotOptions: {
      bar: {
        borderRadius: 0, // Slightly rounded bars for a smooth look
        columnWidth: "50%", // Adjust bar width to be more balanced
      },
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
        rotate: 0,
      },
    },
    yaxis: {
      show: false,
      min: 0,
      max: 500,
    },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: (value: number) => `${value} conversions`,
      },
    },
    dataLabels: {
      enabled: false,
    },

    series: [
      {
        name: "Conversions",
        data: data.map((item, index) => ({
          x: item.x,
          y: item.y,
          color: index % 2 === 0 ? "#CB3CFF" : "#00C2FF",
        })),
      },
    ],
  };

  const series = [
    {
      name: "Conversions",
      data: data.map((item) => item.y),
    },
  ];

  if (!isClient) {
    return (
      <div className="bg-[#0B1739] rounded-xl p-4 h-[280px] flex items-center justify-center">
        <div className="text-title-color">Loading chart...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#0B1739] rounded-tr-xl p-4 border-t border-l xl:border-l-0 border-r border-b  border-[#343B4F] rounded-l-lg rounded-b-xl xl:rounded-b-none xl:rounded-l-none  rounded-r-lg  ">
      {/* Header */}
      <MetricCard
        title="Total Conversions"
        value={totalConversions.value}
        growth={totalConversions.growth}
        isPositive={totalConversions.isPositive}
        SVG={svg}
        className="mb-4"
      />

      {/* Chart */}
      <div className="h-[121px] mb-4">
        <Chart
          options={chartOptions}
          series={series}
          type="bar"
          height="110%"
        />
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">Last 12 months</span>
        <button className="text-[#CB3CFF] hover:text-[#CB3CFF]/80 transition-colors">
          View report
        </button>
      </div>
    </div>
  );
}
