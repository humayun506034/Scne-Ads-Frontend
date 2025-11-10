import { ApexOptions } from "apexcharts";
import { useQueryState } from "nuqs";
import Chart from "react-apexcharts";
import { ChartHeader } from "./CampaignPerformanceAnalytics";

type Props = {
  uptimeData: { screen: string; uptime: number }[];
};

const ScreenUptimeChart = ({ uptimeData }: Props) => {
  const [chartType] = useQueryState<"custom" | "bundle">("chartType", {
    defaultValue: "custom",
    parse: (value: string) =>
      value === "custom" || value === "bundle" ? value : "custom",
  });

  const [selectedYear] = useQueryState<number>("year", {
    defaultValue: new Date().getFullYear(),
    parse: (value: string) => {
      const num = Number(value);
      return isNaN(num) ? new Date().getFullYear() : num;
    },
  });

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 400,
      background: "transparent",
      toolbar: { show: false },
    },
    theme: { mode: "dark" },
    colors: ["#38B6FF"],
    plotOptions: {
      bar: { horizontal: false, columnWidth: "40%", borderRadius: 5 },
    },
    xaxis: {
      categories: uptimeData.map((u) => u.screen),
      labels: { style: { colors: "#ffffff", fontSize: "12px" } },
    },
    yaxis: {
      labels: {
        formatter: (v: number) => v + "%",
        style: { colors: "#ffffff", fontSize: "12px" },
      },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val: number) => val + "%",
      },
    },
  };

  const series = [{ name: "Uptime", data: uptimeData.map((u) => u.uptime) }];

  return (
    <div className="rounded-xl p-6 bg-[#0B1739]">
      <ChartHeader
        title={`${
          chartType === "custom" ? "Custom" : "Bundle"
        } Screen Uptime (${selectedYear})`}
      />
      <Chart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ScreenUptimeChart;
