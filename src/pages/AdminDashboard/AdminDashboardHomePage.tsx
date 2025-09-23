import DashboardBanner from "@/components/Modules/admin-dashboard/Home/AdminDashboardBanner";
import AdminLocationTabs from "@/components/Modules/admin-dashboard/Home/HomeTabs/AdminLocationTabs";
import AdminSpecialSection from "@/components/Modules/admin-dashboard/Home/SpecialSection.tsx/AdminSpecialSection";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { logout, selectCurrentUser } from "@/store/Slices/AuthSlice/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import { ChevronDown, LogOut, Menu, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const AdminDashboardHomePage = () => {
  const dispatch = useDispatch();
  const user = useAppSelector(selectCurrentUser);
  const userName = user?.first_name + " " + user?.last_name;
  return (
    <div>
      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-8 gap-4"
      >
        <h1 className="text-3xl sm:text-4xl font-semibold text-white">
          Hey, <span className="text-secondary-color">{userName}</span>
        </h1>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-3 sm:gap-4">
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
                    <span className="hidden sm:inline font-medium">
                      {userName}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-full bg-[#1A2342] border-none flex items-center shadow-[0_0_12px_rgba(9,72,157,0.9)]  justify-center gap-1  flex-col"
                >
                  <DropdownMenuItem className="cursor-pointer py-2 px-5 hover:bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] text-secondary-color rounded-md hover:text-white  w-full">
                    <Link
                      to="/admin-dashboard/adminBasicInfo"
                      className="flex items-center w-full"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      dispatch(logout());
                      toast.success("Logout successful");
                    }}
                    className="cursor-pointer py-2 px-5 flex  hover:bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)]  items-center justify-between   hover:bg-[linear-gradient(291deg,_#38B6FF_-45.64%,
                  _#09489D_69.04%)] w-full rounded-md text-red-600"
                  >
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

      <div className="mb-20  md:px-6">
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
