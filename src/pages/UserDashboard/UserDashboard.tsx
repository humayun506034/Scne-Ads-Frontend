import DashboardBanner from "@/components/Modules/UserDashboard/Home/DashboardBanner";
import LocationTabs from "@/components/Modules/UserDashboard/Home/HomeTabs/LocationTabs";
import SpecialSection from "@/components/Modules/UserDashboard/Home/SpecialSection/SpecialSection";
import { motion } from "framer-motion";
import { UserDashboardNavbar } from "../../components/Modules/UserDashboard/UserDashboardNavbar";

const UserDashboard = () => {
  return (
    <div className="mb-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <UserDashboardNavbar />
      </motion.div>

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
        <SpecialSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <LocationTabs />
      </motion.div>
    </div>
  );
};

export default UserDashboard;
