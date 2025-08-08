import UserDashboardMobileNavbar from "@/components/Modules/UserDashboard/UserDashboardMobileNavbar";
import { UserDashboardSidebar } from "@/components/Modules/UserDashboard/UserDashboardSidebar";
import CustomToaster from "@/pages/CustomToaster";
import { Outlet } from "react-router-dom";

export function UserDashboardLayout() {
  return (
    <div className=" flex bg-[#081028]  ">
      <aside className="hidden lg:flex lg:flex-shrink-0 min-h-screen">
        <UserDashboardSidebar />
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden ">
        <main className="flex-1 ">
          <div className="px-5 md:px-10 ">
            <UserDashboardMobileNavbar />
            <div className="">
              <Outlet />
              <CustomToaster />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
