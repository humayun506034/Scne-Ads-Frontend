import Chart from "react-apexcharts";
import activeCampaign from "@/assets/AdminPanel/active-campaigns.png";
import completedCampaign from "@/assets/AdminPanel/completed-campaigns.png";
import { ApexOptions } from "apexcharts";
import { useQueryState } from "nuqs";
import { ChartHeader } from "./CampaignPerformanceAnalytics";

type Props = {
  campaignData: { month: string; active: number; completed: number }[];
};

const CampaignPerformanceChart = ({ campaignData }: Props) => {
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

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 400,
      background: "transparent",
      toolbar: { show: false },
    },
    theme: { mode: "dark" },
    colors: ["#033579", "#38B6FF"],
    plotOptions: {
      bar: { horizontal: false, columnWidth: "45%", borderRadius: 5 },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      categories: campaignData.map((d) => ` ${d.month} ${selectedYear}`),
      labels: { style: { colors: "#64748b", fontSize: "12px" } },
    },
    yaxis: { labels: { style: { colors: "#64748b", fontSize: "12px" } } },
    tooltip: { theme: "dark" },
  };

  const series = [
    { name: "Active", data: campaignData.map((d) => d.active) },
    { name: "Completed", data: campaignData.map((d) => d.completed) },
  ];

  return (
    <div className="rounded-xl p-6 bg-[#0B1739]">
      <ChartHeader
        title={`Campaign Performance for ${
          chartType === "custom" ? "Custom" : "Bundle"
        } Campaigns in ${selectedYear}`}
      />
      <Chart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
      {/* <div className="flex gap-4 mt-4 justify-center">
        <div className="flex items-center gap-2">
          <img
            src={activeCampaign}
            alt="Active"
          />
          <span className="text-white">Active</span>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={completedCampaign}
            alt="Completed"
          />
          <span className="text-white">Completed</span>
        </div>
      </div> */}
    </div>
  );
};

export default CampaignPerformanceChart;
