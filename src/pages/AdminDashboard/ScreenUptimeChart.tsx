import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

type Props = {
  uptimeData: { screen: string; uptime: number }[];
};

const ScreenUptimeChart = ({ uptimeData }: Props) => {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 400,
      background: "transparent",
      toolbar: { show: false },
    },
    theme: { mode: "dark" },
    colors: ["#033579"],
    plotOptions: {
      bar: { horizontal: false, columnWidth: "40%", borderRadius: 5 },
    },
    xaxis: {
      categories: uptimeData.map((u) => u.screen),
      labels: { style: { colors: "#64748b", fontSize: "12px" } },
    },
    yaxis: {
      labels: {
        formatter: (v: number) => v + "%",
        style: { colors: "#64748b", fontSize: "12px" },
      },
    },
    tooltip: { theme: "dark" },
  };

  const series = [{ name: "Uptime", data: uptimeData.map((u) => u.uptime) }];

  return (
    <div>
      <h3 className="text-title-color mb-2 text-lg font-medium">
        Screen Uptime
      </h3>
      <div className="rounded-xl p-4 bg-[#0B1739]">
        <Chart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default ScreenUptimeChart;
