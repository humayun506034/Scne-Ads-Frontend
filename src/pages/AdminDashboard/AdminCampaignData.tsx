import CommonSelect from "@/common/CommonSelect";
import Loading from "@/common/MapLoading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useGetAllBundleCampaignQuery,
  useGetAllCustomCampaignQuery,
} from "@/store/api/Campaign/campaignApi";
import { useGetAllUserQuery } from "@/store/api/User/useApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import { Calendar, ChevronDown, LogOut, Menu, User } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CampaignPerformanceAnalytics from "./CampaignPerformanceAnalytics";

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
  const { data: BundleResponse, isLoading } = useGetAllBundleCampaignQuery({});
  const { data: ScreenResponse } = useGetAllCustomCampaignQuery({});
  console.log("🚀 ~ AdminCampaignData ~ ScreenResponse:", ScreenResponse)
  const { data: UserResponse } = useGetAllUserQuery({});



  const BundleCampaignMeta = BundleResponse?.data.meta;
  const ScreenCampaignMeta = ScreenResponse?.data.meta;
  const UserAnalytics = UserResponse?.data.analytics;




  if (isLoading) {
    return <Loading />;
  }

  const metricsData = [
    {
      title: "Total Bundle Campaigns",
      subtitle: "Pending, Running and Completed",
      value: `${BundleCampaignMeta?.counts.totalCampaign}`,
    },
    {
      title: "Total Screen Campaigns",
      subtitle: "Pending, Running and Completed",
      value: `${ScreenCampaignMeta?.counts.totalCampaign}`,
    },

    {
      title: "Total Revenue",
      subtitle: "Year-to-Date Earnings",
      value: `$${
        BundleCampaignMeta?.revenue.totalRevenue +
        ScreenCampaignMeta?.revenue.totalRevenue
      }`,
    },

    {
      title: "Total Admin",
      subtitle: "Admins",
      value: `${UserAnalytics?.totalAdmins}`,
    },
    {
      title: "Total Customers",
      subtitle: "Customers",
      value: `${UserAnalytics?.totalCustomers}`,
    },
    {
      title: "New Signups",
      subtitle: "Last 15 Days",
      value: `${UserAnalytics?.signUps15d}`,
    },
  ];



  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-bg-dashboard lg:py-8 sm:py-14"
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
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 text-white px-4 py-3 focus:ring-0 focus:outline-none focus:border-none border-none ring-0 rounded-full cursor-pointer transition-all duration-300"
                    >
                      <div className="w-8 h-8 bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] rounded-full flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="hidden sm:inline font-medium">SS</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-full bg-[#1A2342] border-none flex items-center shadow-[0_0_12px_rgba(9,72,157,0.9)]  justify-center flex-col"
                  >
                    <DropdownMenuItem className="cursor-pointer py-2 hover:bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] text-secondary-color hover:text-white px-5 w-full">
                      <Link
                        to="/admin-dashboard/adminBasicInfo"
                        className="flex items-center w-full"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer py-2 px-5 flex items-center justify-between hover:bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] w-full text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="sm:hidden flex items-center">
              <Menu className="w-7 h-7 text-white cursor-pointer" />
            </div>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
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

       <CampaignPerformanceAnalytics />
      
      </div>
    </motion.div>
  );
};

export default AdminCampaignData;
