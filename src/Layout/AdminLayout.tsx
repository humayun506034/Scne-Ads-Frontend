import AdminDashboardHeader from "@/components/Modules/admin-dashboard/AdminDashboardHeader";
import UserDashboardMobileNavbar from "@/components/Modules/UserDashboard/UserDashboardMobileNavbar";
import CustomToaster from "@/pages/CustomToaster";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";

export function AdminDashboardLayout() {
  return (
    <div className=" flex bg-[#081028]  ">
      <aside className="hidden lg:flex lg:flex-shrink-0 ">
        <DashboardSidebar user="admin" />
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden ">
        <main className="flex-1 ">
          <div className="relative">
            <div className=" lg:hidden">
              <UserDashboardMobileNavbar user="admin" />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className=" mt-6  px-5 md:px-10"
            >
             
              <AdminDashboardHeader />
            </motion.div>
            <Outlet />
            <CustomToaster />
          </div>
        </main>
      </div>
    </div>
  );
}
