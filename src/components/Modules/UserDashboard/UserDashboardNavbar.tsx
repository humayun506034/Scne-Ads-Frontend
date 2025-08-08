import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { ChevronDown, LogOut, User } from "lucide-react";
import { navItems } from "./Home";

export function UserDashboardNavbar() {
  const userName = "Danaj";
  return (
    <header className="hidden lg:block sticky mt-0 md:mt-6 lg:mt-10 xl:mt-6 top-0 z-50 w-full text-white">
      <div className="flex  h-20 items-center justify-between border-none border-b border-[#283F81] ">
        <div className="flex items-center">
          <h1 className="text-lg md:text-[38px] ">
            Hey, <span className="text-[#47B5FF]">{userName}</span>.
          </h1>
        </div>
        <div className="  justify-center flex xl:gap-0  gap-4 items-center flex-wrap space-x-4">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.03 }}
                  key={item.title}
                  className="text-white hover:text-white bg-[#1A2342] flex justify-center cursor-pointer items-center rounded-full py-2.5 gap-2 text-sm px-4 border-[#38B6FF] border "
                >
                  {item.title} <Icon className="h-4 block lg:hidden w-4 mr-2" />
                </motion.button>
                {idx == 1 && (
                  <div className="h-8 hidden xl:block border-l border-white"></div>
                )}
              </>
            );
          })}
          <motion.div>
            <button
              type="submit"
              className={`bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] text-white text-sm md:w-fit w-full px-4 py-3 rounded-full cursor-pointer transition-all duration-300 hover:shadow-[0_0_32px_rgba(9,72,157,0.9)]  flex   justify-center items-center gap-2 `}
            >
              Live Chat
            </button>
          </motion.div>
          <div className="flex items-center">
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
                className="w-fit bg-[#1A2342] border-none flex items-center shadow-[0_0_12px_rgba(9,72,157,0.9)]  justify-center flex-col"
              >
                <DropdownMenuItem className="cursor-pointer hover:bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] text-secondary-color hover:text-white w-full">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer hover:bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] w-full text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
