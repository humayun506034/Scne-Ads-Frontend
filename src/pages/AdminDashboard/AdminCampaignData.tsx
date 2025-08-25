import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronDown, Calendar, Menu } from "lucide-react";
import { motion} from "framer-motion";
import React, { useState } from "react";
import CommonStatus from "@/common/CommonStatus";
import CommonSelect from "@/common/CommonSelect";

// Month Dropdown Button Component
const MonthDropdownButton = ({ className = "" }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("Current Month");

  const periods = [
    { value: "year", label: "Current Year" },
    { value: "month", label: "Current Month" },
    { value: "week", label: "Current Week" },
  ];

  return (
    <div className={className}>
      <CommonSelect
        Value={selectedPeriod}
        setValue={(val) => {
          const selected = periods.find((p) => p.value === val);
          if (selected) setSelectedPeriod(selected.label);
        }}
        options={periods}
        Icon={Calendar}
        bgColor="bg-[#0B1739]"
      />
    </div>
  );
};

// Metric Card Component with motion
const MetricCard = ({ title, subtitle, value, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
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
        <div className="text-2xl md:text-4xl font-medium text-[#ffffff]">
          {value}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-bg-dashboard lg:py-16 sm:py-14"
    >
      <div className="px-4 sm:px-8 lg:px-6 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
        >
          <h1 className="text-3xl sm:text-4xl font-semibold text-white">
            Hey, <span className="text-secondary-color">Admin</span>
          </h1>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-3 sm:gap-4">
              {/* Replace static button with MonthDropdownButton */}
              <MonthDropdownButton className="sm:mr-10" />

              {/* Profile section */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#1A2342] border border-[#38B6FF] md:text-base rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-medium">
                SS
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 cursor-pointer hover:text-[#fff]" />
            </div>
            <div className="sm:hidden flex items-center">
              <Menu className="w-7 h-7 text-white cursor-pointer" />
            </div>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10"
        >
          {metricsData.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              subtitle={metric.subtitle}
              value={metric.value}
            />
          ))}
        </motion.div>

        {/* Recent Campaigns Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl sm:py-11 font-normal text-[#C3CEE9]">
            Recent Campaigns
          </h2>

          <Card className="bg-bg-dashboard border-[#11214D] rounded lg:p-0 sm:py-5">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="text-sm sm:text-lg bg-[#11214D] border-[#11214D] text-[#AEB9E1] font-normal">
                    <tr>
                      <th className="py-3 px-2 sm:py-4 sm:px-3">
                        Campaign Name
                      </th>
                      <th className="py-3 px-2">Advertiser</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2">Start date</th>
                    </tr>
                  </thead>
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
                          <CommonStatus status={campaign.status} />
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
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminCampaignData;
