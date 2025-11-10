import Chart from "react-apexcharts";
import activeCampaign from "@/assets/AdminPanel/active-campaigns.png";
import completedCampaign from "@/assets/AdminPanel/completed-campaigns.png";
import { ApexOptions } from "apexcharts";

type Props = {
  campaignData: { month: string; active: number; completed: number }[];
};

const CampaignPerformanceChart = ({ campaignData }: Props) => {
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
      categories: campaignData.map((d) => d.month),
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
    <div>
      <h3 className="text-title-color mb-2 text-lg font-medium">
        Campaign Performance
      </h3>
      <div className="rounded-xl p-4 bg-[#0B1739]">
        <Chart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
        <div className="flex gap-4 mt-2">
          <div className="flex items-center gap-2">
            <img
              src={activeCampaign}
              alt=""
            />
            <span>Active</span>
          </div>
          <div className="flex items-center gap-2">
            <img
              src={completedCampaign}
              alt=""
            />
            <span>Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignPerformanceChart;
