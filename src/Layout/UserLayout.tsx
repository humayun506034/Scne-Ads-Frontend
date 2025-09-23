import UserDashboardMobileNavbar from "@/components/Modules/UserDashboard/UserDashboardMobileNavbar";
import { DashboardSidebar } from "@/Layout/DashboardSidebar";
import CustomToaster from "@/pages/CustomToaster";
import { Outlet } from "react-router-dom";

export function UserDashboardLayout() {
  return (
    <div className=" flex bg-[#081028]  ">
      <aside className="hidden lg:flex lg:flex-shrink-0 min-h-screen">
        <DashboardSidebar user="customer" />
      </aside>

      <div className="flex flex-col  overflow-hidden ">
        <main className=" ">
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
// sada
