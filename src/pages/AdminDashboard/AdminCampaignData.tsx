import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, Calendar, Menu } from "lucide-react";
import React from "react";

// Metric Card Component
const MetricCard = ({ title, subtitle, value, className = "" }) => (
  <Card className={`bg-[#0B1739] border-slate-700/50 ${className}`}>
    <CardHeader className="pb-2">
      <CardTitle className="text-xl md:text-2xl font-medium text-[#ffffff]">
        {title}
      </CardTitle>
      <CardDescription className="text-sm md:text-md font-normal text-[#ffffff]">
        {subtitle}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="text-3xl md:text-5xl font-medium text-[#ffffff]">
        {value}
      </div>
    </CardContent>
  </Card>
);

// Status Badge Component
const StatusBadge = ({ status }) => {
  const variants = {
    Completed: "bg-blue-600 hover:bg-blue-600 text-white",
    Pending: "bg-yellow-600 hover:bg-yellow-600 text-white",
    Active: "bg-green-600 hover:bg-green-600 text-white",
  };

  return (
    <Badge className={`${variants[status]} text-xs px-3 py-1 rounded-full`}>
      {status}
    </Badge>
  );
};

const AdminCampaignData: React.FC = () => {
  const metricsData = [
    { title: "Total Campaigns", subtitle: "Active and Completed", value: "26" },
    {
      title: "Ads Pending Review",
      subtitle: "Requires your attention",
      value: "20",
    },
    {
      title: "Total Revenue (YTD)",
      subtitle: "Year-to-Date Earnings",
      value: "$203,000",
    },
    {
      title: "Screen Uptime (Avg)",
      subtitle: "Average across all screens",
      value: "98.6%",
    },
    { title: "Active Campaigns", subtitle: "Currently running", value: "18" },
    { title: "New Signups", subtitle: "Last 30 Days", value: "25" },
  ];

  const campaignsData = [
    {
      name: "New Product Launch",
      advertiser: "TechCorp",
      status: "Completed",
      startDate: "2025-08-15",
    },
    {
      name: "Back to School",
      advertiser: "BookWorms",
      status: "Pending",
      startDate: "2025-08-15",
    },
    {
      name: "Summer Sale 2025",
      advertiser: "FashionCo",
      status: "Active",
      startDate: "2025-07-01",
    },
    {
      name: "Holiday Special",
      advertiser: "FoodMart",
      status: "Active",
      startDate: "2025-07-02",
    },
  ];

  return (
    <div className="min-h-screen bg-bg-dashboard lg:py-16 sm:py-14">
      <div className="px-4 sm:px-8 lg:px-14 mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl sm:text-4xl font-semibold text-white">
            Hey, <span className="text-[#38B6FF]">Admin</span>
          </h1>
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop layout */}
            <div className="hidden sm:flex items-center gap-3 sm:gap-4">
              <Button
                variant="outline"
                className="text-[#AEB9E1] text-sm sm:text-lg font-normal sm:mr-10 rounded-xl border-none w-full sm:w-54 h-10 sm:h-12 bg-[#0B1739] hover:bg-slate-800 flex justify-center"
              >
                <Calendar className="w-4 h-4 mx-2" />
                Current Month
                <ChevronDown className="w-4 h-4 mr-2" />
              </Button>
              <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#1A2342] border border-[#38B6FF] md:text-base rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-medium">
                SS
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>

            {/* Mobile Hamburger */}
            <div className="sm:hidden flex items-center">
              <Menu className="w-7 h-7 text-white cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {metricsData.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              subtitle={metric.subtitle}
              value={metric.value}
            />
          ))}
        </div>

        {/* Recent Campaigns Table */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl sm:py-11 font-normal text-[#C3CEE9]">
          Recent Campaigns
        </h2>

        <Card className="bg-bg-dashboard border-[#11214D] rounded lg:p-0 sm:py-5">
          <CardContent className="p-0">
            {/* Scrollable wrapper for small screens */}
            <div className="overflow-x-auto">
              <table className="w-full text-left  border-collapse">
                {/* Table Head */}
                <thead className=" text-sm sm:text-lg bg-[#11214D] border-[#11214D] text-[#AEB9E1] font-normal">
                  <tr>
                    <th className="py-3 px-2 sm:py-4 sm:px-3">Campaign Name</th>
                    <th className="py-3 px-2">Advertiser</th>
                    <th className="py-3 px-2">Status</th>
                    <th className="py-3 px-2">Start date</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {campaignsData.map((campaign, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-800/40 last:border-0"
                    >
                      <td className="py-3 px-4 text-[#AEB9E1]">
                        {campaign.name}
                      </td>
                      <td className="py-3 px-2 text-[#AEB9E1]">
                        {campaign.advertiser}
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            campaign.status === "Active"
                              ? "bg-green-500/20 text-green-400"
                              : campaign.status === "Pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-[#AEB9E1]">
                        {campaign.startDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminCampaignData;
