import Loading from "@/common/MapLoading";
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

import AdminDashboardHeader from "@/components/Modules/admin-dashboard/AdminDashboardHeader";
import { motion } from "framer-motion";
import React from "react";
import CampaignPerformanceAnalytics from "./CampaignPerformanceAnalytics";

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

  const { data: UserResponse } = useGetAllUserQuery({});



  const BundleCampaignMeta = BundleResponse?.data.meta;
  const ScreenCampaignMeta = ScreenResponse?.data.meta;
  const UserAnalytics = UserResponse?.data.analytics;






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
      className="min-h-screen bg-bg-dashboard lg:py-8 "
    >
      <div className="px-4 md:px-8 lg:px-6 mx-auto">

      <AdminDashboardHeader/>
       
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10 mt-6 md:mt-10"
        >
          {
            isLoading && <Loading />
          }
          {   !isLoading && metricsData.map((metric, index) => (
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
