import CommonSelect from "@/common/CommonSelect";
import { CalendarDays } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ChartDataPoint } from ".";
import { MetricCard } from "./MetricCard";
const Chart = React.lazy(() => import("react-apexcharts"));

interface SpendImpressionsChartProps {
  spendData: ChartDataPoint[];
  impressionsData: ChartDataPoint[];
  totalSpend: {
    value: string;
    growth: number;
    isPositive: boolean;
  };
}

export function SpendImpressionsChart({
  spendData,
  impressionsData,
  totalSpend,
}: SpendImpressionsChartProps) {
  const [isClient, setIsClient] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Jan 2025 - Dec 2025");
  const options = [
    {
      value: "Jan 2025 - Dec 2025",
      label: "Jan 2025 - Dec 2025",
    },
    {
      value: "Jan 2024 - Dec 2024",
      label: "Jan 2024 - Dec 2024",
    },
    {
      value: "Jan 2023 - Dec 2023",
      label: "Jan 2023 - Dec 2023",
    },
  ];
  useEffect(() => {
    setIsClient(true);
  }, []);

  const chartOptions = {
    chart: {
      type: "area" as const,
      height: 400,
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
    colors: ["#CB3CFF", "#57C3FF"],
    stroke: {
      curve: "smooth" as const,
      width: 3,
    },
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
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      categories: spendData.map((item) => item.x),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#64748b",
          fontSize: "12px",
        },
      },
    },

    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        style: {
          colors: "#64748b",
          fontSize: "12px",
        },
        formatter: (value: number) => {
          if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M`;
          } else if (value >= 1000) {
            return `${(value / 1000).toFixed(0)}K`;
          }
          return value.toString();
        },
      },
    },

    tooltip: {
      theme: "dark",
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: (value: number) => {
          if (value >= 1000000) {
            return `${(value / 1000000).toFixed(2)}M`;
          } else if (value >= 1000) {
            return `${(value / 1000).toFixed(0)}K`;
          }
          return value.toString();
        },
      },
    },
  };

  const series = [
    {
      name: "Ad Spend",
      data: spendData.map((item) => item.y),
    },
    {
      name: "Impressions",
      data: impressionsData.map((item) => item.y),
    },
  ];

  if (!isClient) {
    return (
      <div className="bg-[#0B1739] rounded-xl p-6 h-[400px] flex items-center justify-center">
        <div className="text-title-color">Loading chart...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#0B1739] rounded-l-xl rounded-r-xl xl:rounded-r-none p-6 border border-[#343B4F]">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <MetricCard
          title="Total Ad Spend"
          value={totalSpend.value}
          growth={totalSpend.growth}
          isPositive={totalSpend.isPositive}
        />

        <div className="flex flex-wrap  items-center gap-4">
          <div className="flex flex-wrap items-center gap-6 justify-between md:w-fit w-full">
            <div className="flex items-center gap-2 ">
              <div className="w-4 h-4 rounded-full bg-[#CB3CFF]"></div>
              <span className="text-title-color text-sm">Ad Spend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#57C3FF]"></div>
              <span className="text-title-color text-sm">Impressions</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#0A1330] rounded-lg px-2 py-1 ">
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
