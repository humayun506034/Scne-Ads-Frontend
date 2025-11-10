

import UserDashboardMobileNavbar from "@/components/Modules/UserDashboard/UserDashboardMobileNavbar";
import CustomToaster from "@/pages/CustomToaster";
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
            <UserDashboardMobileNavbar />

            <Outlet />
            <CustomToaster />
          </div>
        </main>
      </div>
    </div>
  );
}
