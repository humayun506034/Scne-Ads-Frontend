import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const CampaignPerformanceAnalytics: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Campaign Performance Chart
  const campaignData = [
    { month: "Jan", active: 10, completed: 6 },
    { month: "Feb", active: 13, completed: 8 },
    { month: "Mar", active: 18, completed: 13 },
    { month: "Apr", active: 8, completed: 5 },
    { month: "May", active: 17, completed: 10 },
    { month: "Jun", active: 9, completed: 6 },
  ];

  const campaignOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: 470,
      background: "transparent",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      categories: campaignData.map((d) => d.month),
      labels: { style: { colors: "#9CA3AF", fontSize: "16px" } },
      axisBorder: { show: true },
      axisTicks: { show: false },
    },
    
    yaxis: {
      title: { style: { color: "#9CA3AF" } },
      labels: {
        style: { colors: "#9CA3AF", fontSize: "12px" },
        formatter: (val) => val + "%",
      },

      axisBorder: {
        show: true,
        color: "#9CA3AF", // line color
        width: 1, // line width
      },
      axisTicks: {
        show: true, // optionally show ticks
        color: "#9CA3AF",
        width: 1,
      },
    },

    colors: ["#033579", "#38B6FF"],
    fill: { opacity: 1 },
    grid: { show: false },
    legend: { show: false },
    tooltip: { theme: "dark" },
  };

  const campaignSeries = [
    { name: "Active Campaigns", data: campaignData.map((d) => d.active) },
    { name: "Completed Campaigns", data: campaignData.map((d) => d.completed) },
  ];

  // Revenue Trends Chart
  const revenueOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      height: 300,
      background: "transparent",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "straight", width: 1, colors: ["#ffffff"] },
    grid: {
      borderColor: "#374151",
      strokeDashArray: 3,
      xaxis: { lines: { show: false } },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      labels: { style: { colors: "#9CA3AF", fontSize: "12px" } },
      axisBorder: { show: true },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: "#9CA3AF", fontSize: "12px" },
        formatter: (val) => "$" + val + "K",
      },
    },
    markers: {
      size: 5,
      colors: ["#38B6FF"],
      strokeColors: "#38B6FF",
      strokeWidth: 1,
      hover: { size: 8 },
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (val) => "$" + val.toLocaleString() },
    },
  };

  const revenueSeries = [
    { name: "Revenue", data: [25000, 27000, 37000, 29000, 43000, 46000] },
  ];

  // Uptime Chart
  const uptimeOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: 300,
      background: "transparent",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      categories: [
        "Downtown Billboard",
        "Mall Entrance Display",
        "Airport Lounge Screen",
        "Sports Arena Jumbotron",
      ],
      labels: {
        style: { colors: "#9CA3AF", fontSize: "16px" },
        rotate: -45,
        rotateAlways: true,
      },
      axisBorder: { show: true },
      axisTicks: { show: false },
    },
    // yaxis: {
    //   title: { text: "%", style: { color: "#9CA3AF" } },
    //   labels: {
    //     style: { colors: "#9CA3AF", fontSize: "12px" },
    //     formatter: (val) => val + "%",
    //   },
    // },
    
     yaxis: {
      title: { style: { color: "#9CA3AF" } },
      labels: {
        style: { colors: "#9CA3AF", fontSize: "12px" },
        formatter: (val) => val + "%",
      },

      axisBorder: {
        show: true,
        color: "#9CA3AF", // line color
        width: 1, // line width
      },
      axisTicks: {
        show: true, // optionally show ticks
        color: "#9CA3AF",
        width: 1,
      },
    },
    colors: ["#3B82F6"],
    fill: { opacity: 1 },
    grid: { show: false },
    tooltip: { theme: "dark", y: { formatter: (val) => val + "%" } },
  };

  const uptimeSeries = [
    { name: "Screen Uptime Analytics", data: [90, 97, 85, 100] },
  ];

  if (!isClient) return <div className="text-white">Loading charts...</div>;

  return (
    <div className="bg-[#081028] sm:px-6 sm:py-14">
      <div className=" mx-auto ">
        {/* Campaign Performance */}
        <div>
          <h2 className="text-[#C3CEE9] lg:text-3xl sm:text-lg font-normal mb-1">
            Campaign Performance Overview
          </h2>
          <p className="text-[#AEB9E1] text-base mb-4">
            Active vs. Completed Campaigns (Monthly)
          </p>
          <div className=" rounded-lg p-6 ">
            <Chart
              options={campaignOptions}
              series={campaignSeries}
              type="bar"
              height={450}
            />
          </div>
        </div>

        {/* Revenue Trends */}
        <div>
          {" "}
          <h2 className="text-[#C3CEE9] lg:text-3xl sm:text-lg font-normal mb-1">
            Revenue Trends
          </h2>
          <p className="text-[#AEB9E1] text-base mb-4">Monthly Revenue</p>
        </div>
        <div className=" rounded-lg p-6 ">
          <Chart
            options={revenueOptions}
            series={revenueSeries}
            type="line"
            height={300}
          />
        </div>

        {/* Screen Uptime */}
        <div>
          <h2 className="text-[#C3CEE9] lg:text-3xl sm:text-lg font-normal mb-1">
            Screen Uptime Statistics
          </h2>
          <p className="text-[#AEB9E1] text-base mb-4">
            Uptime Percentage by Screens
          </p>
        </div>
        <div className=" rounded-lg p-6 ">
          <Chart
            options={uptimeOptions}
            series={uptimeSeries}
            type="bar"
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default CampaignPerformanceAnalytics;
