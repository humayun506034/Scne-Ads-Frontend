import AdminDashboardHeader from "@/components/Modules/admin-dashboard/AdminDashboardHeader";
import DashboardBanner from "@/components/Modules/admin-dashboard/Home/AdminDashboardBanner";
import AdminLocationTabs from "@/components/Modules/admin-dashboard/Home/HomeTabs/AdminLocationTabs";
import AdminSpecialSection from "@/components/Modules/admin-dashboard/Home/SpecialSection.tsx/AdminSpecialSection";

import { motion } from "framer-motion";

const AdminDashboardHomePage = () => {
  return (
    <div className="mb-20 mt-6  px-5 md:px-10">
      <AdminDashboardHeader />

      <div className="my-24  md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <DashboardBanner />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <AdminSpecialSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <AdminLocationTabs />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboardHomePage;
