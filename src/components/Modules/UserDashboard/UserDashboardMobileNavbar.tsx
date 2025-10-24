import CommonDashboardButton from "@/common/CommonDashBoardButton";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { logout } from "@/store/Slices/AuthSlice/authSlice";
import { motion } from "framer-motion";
import { LogOut, Menu, Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import logo from "../../../assets/logo.png";
import { adminSidebarItems, navItems, userSidebarItems } from "./Home";
import { LiveChatSystem } from "./LiveChat/LiveChatSystem";

const UserDashboardMobileNavbar = ({ user }: { user: string }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("/customer-dashboard");
  const dispatch = useDispatch();

  const sidebarItems = user === "admin" ? adminSidebarItems : userSidebarItems;
  return (
    <div className="lg:hidden px-5 md:px-10 flex items-center  mt-4  border-border border-b-1 pb-4 justify-between gap-4 w-full">
      <div className="flex h-12 px-6  lg:mt-8   lg:items-center  ">
        <div className="w-fit h-12   ">
          <Link to="/">
            <img src={logo} alt="logo" className="w-full h-full" />
          </Link>
        </div>
      </div>
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button size="icon" className="lg:hidden text-white ">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-68 p-0 lg:hidden bg-bg-dashboard border-r border-[#283F81] overflow-y-auto"
        >
          <div className="flex  h-full mt-6 flex-col px-4">
            <div className="flex h-12 px-2 lg:mt-8   lg:items-center  ">
              <div className="w-fit h-12    ">
                <Link to="/">
                  <img src={logo} alt="logo" className="w-full h-full" />
                </Link>
              </div>
            </div>

            <div className="flex-1 mt-6 mb-0 ">
              {sidebarItems.map((section) => (
                <div key={section.title} className="mb-6">
                  <h3 className="mb-2 px-2 text-[#C3CEE9] text-sm font-semibold uppercase tracking-wider">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeItem === item.href;
                      return (
                        <li key={item.title}>
                          <Link to={item.href}>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setActiveItem(item.href)}
                              className={cn(
                                "flex w-full items-center gap-3 text-nowrap hover:text-[#38B6FF] cursor-pointer text-left rounded-lg px-3 py-2 text-sm transition-colors",
                                isActive ? "text-[#38B6FF]" : "text-[#AEB9E1]"
                              )}
                            >
                              <Icon className="h-4 w-4" />
                              {item.title}
                            </motion.button>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <div className="px-2 ">
              <h1 className="text-[#C3CEE9] text-sm font-semibold uppercase tracking-wider">
                Others
              </h1>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <>
                    <Link to={item.href} key={item.title}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex w-full items-center gap-3 text-nowrap cursor-pointer text-left rounded-lg py-2 my-1 px-2 text-sm transition-colors text-[#AEB9E1]  "
                      >
                        <Icon className="h-5 w-5" />
                        {item.title}
                      </motion.button>
                    </Link>
                  </>
                );
              })}
              <motion.div className="px-1 ">
                <LiveChatSystem userName={"Danaj"} />
              </motion.div>
            </div>

            <div className="px-3 py-4">
              <Link to="/new-campaign">
                <CommonDashboardButton title="New Campaign" Icon={Plus} />
              </Link>
            </div>

            <div className="px-3 pb-6">
              <button
                onClick={() => {
                  dispatch(logout());
                  toast.success("Logout successful");
                }}
                className="flex border-red-500 border  text-red-500 w-full justify-center items-center gap-3 text-nowrap hover:text-white cursor-pointer  rounded-lg px-2 py-2 text-sm  align-center"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default UserDashboardMobileNavbar;
