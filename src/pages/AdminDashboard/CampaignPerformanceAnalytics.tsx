import React, { useEffect, useState } from "react";
import CampaignPerformanceChart from "./CampaignPerformanceChart";
import RevenueChart from "./RevenueChart";
import ScreenUptimeChart from "./ScreenUptimeChart";

type Screen = {
  screen_name?: string;
  name?: string;
};

type Bundle = {
  screens?: Screen[];
};

type Campaign = {
  id: string;
  status: "pending" | "running" | "completed";
  createdAt?: string;
  bundle?: Bundle;
  screens?: Screen[];
  CustomScreens?: Screen[];
};

type RevenueMonth = {
  year: number;
  months: { month: string; revenue: number }[];
};

type Props = {
  campaigns: Campaign[];
  revenueMeta: { monthlyRevenue: RevenueMonth[] }; // NEW
};

const CampaignPerformanceAnalytics: React.FC<Props> = ({ campaigns, revenueMeta }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  // --- Monthly Campaigns ---
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
  const monthlyStats: Record<string, { active: number; completed: number }> =
    {};
  monthOrder.forEach((m) => (monthlyStats[m] = { active: 0, completed: 0 }));

  campaigns.forEach((c) => {
    if (!c.createdAt) return;
    const month = new Date(c.createdAt).toLocaleString("default", {
      month: "short",
    });
    if (c.status === "running" || c.status === "pending")
      monthlyStats[month].active += 1;
    else if (c.status === "completed") monthlyStats[month].completed += 1;
  });

  const campaignData = monthOrder.map((month) => ({
    month,
    active: monthlyStats[month].active,
    completed: monthlyStats[month].completed,
  }));

  // --- Screen Uptime ---
  const screenStats: Record<string, { active: number; total: number }> = {};

  campaigns.forEach((c) => {
    const screens = [
      ...(c.bundle?.screens ?? []),
      ...(c.CustomScreens ?? []),
      ...(c.screens ?? []),
    ];

    screens.forEach((s) => {
      const screenName = s.screen_name || s.name || "Unknown Screen";
      if (!screenStats[screenName])
        screenStats[screenName] = { active: 0, total: 0 };
      screenStats[screenName].total += 1;
      if (c.status === "running" || c.status === "completed")
        screenStats[screenName].active += 1;
    });
  });

  const uptimeData = Object.keys(screenStats).map((screen) => ({
    screen,
    uptime: Math.round(
      (screenStats[screen].active / screenStats[screen].total) * 100
    ),
  }));

  if (!isClient) return <div className="text-white p-6">Loading charts...</div>;

  return (
    <div className="bg-[#081028] p-6 rounded-xl space-y-10">
      <CampaignPerformanceChart campaignData={campaignData} />
      <RevenueChart
      revenueMeta={revenueMeta}
      />
      <ScreenUptimeChart uptimeData={uptimeData} />
    </div>
  );
};

export default CampaignPerformanceAnalytics;
