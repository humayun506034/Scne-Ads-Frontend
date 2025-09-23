import CustomToaster from "@/pages/CustomToaster";
import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";

export function AdminDashboardLayout() {
  return (
    <div className=" flex bg-[#081028]  ">
      <aside className="hidden lg:flex lg:flex-shrink-0 min-h-screen">
        <DashboardSidebar user="admin" />
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden ">
        <main className="flex-1 ">
          <div className="relative ">
            {/* <UserDashboardMobileNavbar /> */}

            <Outlet />
            <CustomToaster />
          </div>
        </main>
      </div>
    </div>
  );
}
