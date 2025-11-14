

import UserDashboardMobileNavbar from "@/components/Modules/UserDashboard/UserDashboardMobileNavbar";
import { UserDashboardNavbar } from "@/components/Modules/UserDashboard/UserDashboardNavbar";
import CustomToaster from "@/pages/CustomToaster";
import { motion } from 'framer-motion';
import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";

export function UserDashboardLayout() {
  return (
    <div className=" flex bg-[#081028]  ">
      <aside className="hidden lg:flex lg:flex-shrink-0 min-h-screen">
        <DashboardSidebar user="customer" />
      </aside>

      <div className="flex flex-col min-h-screen flex-1 overflow-hidden ">
        <main className="flex-1 px-4 lg:px-6">
          <div className="relative ">
            <UserDashboardMobileNavbar user="customer" />
  <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-4 md:px-8"
      >
        <UserDashboardNavbar />
      </motion.div>
    
            <Outlet />
            <CustomToaster />
          </div>
        </main>
      </div>
    </div>
  );
}
