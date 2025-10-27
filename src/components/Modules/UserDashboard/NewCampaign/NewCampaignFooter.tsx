import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { ChevronUp, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";

export function NewCampaignFooter() {
  const userName = "Danaj";
  const CampaignSummary = {
    credit: "5 dollar",
    progress: 75,
  };

  const [showFooter, setShowFooter] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // Scrolling Down
        setShowFooter(false);
      } else {
        setShowFooter(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`fixed w-full left-0 bottom-0 z-50 transition-all duration-500 ${
        showFooter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      <div className="w-full xl:h-40 border-t border-dashboard-border bg-bg-dashboard px-6 md:px-10">
        <div className="flex flex-col xl:flex-row justify-between items-center mt-4">
          <div className="flex justify-between items-center w-full xl:w-auto">
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
                  <ChevronUp className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-fit bg-[#1A2342] border-none flex items-center shadow-[0_0_12px_rgba(9,72,157,0.9)] justify-center flex-col"
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
          <div className="flex flex-col justify-between items-center w-full xl:w-auto">
            <div className="w-full xl:min-w-7xl flex justify-center items-center gap-4 bg-dashboard-card-bg p-2 px-4 rounded-full">
              Progress
              <input
                type="range"
                min={0}
                max={100}
                value={CampaignSummary.progress}
                className="w-full h-3 bg-white rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3BD62B 0%, #3BD62B ${CampaignSummary.progress}%, #102150 ${CampaignSummary.progress}%, #102150 100%)`,
                }}
              />
              <span className="border-l w-28 md:w-16 ml-4 pl-2 border-[#7999C4]">
                {CampaignSummary.progress} %
              </span>
            </div>
            <p className="text-title-color mt-2 text-sm text-center xl:text-left">
              By clicking publish, you acknowledge that your use of SCNE Ad’s ad
              tools is subject to our{" "}
              <span className="text-secondary-color font-medium cursor-pointer hover:underline">
                Terms & Conditions
              </span>
              <p className="text-secondary-color font-medium cursor-pointer hover:underline text-center mt-1">
                Need Help?
              </p>
            </p>
          </div>

          <div className="flex flex-col gap-4 justify-between items-center w-full xl:w-auto mt-6 md:mt-0">
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.85 }}
              className="text-white py-2 w-full  px-6 bg-[#0A193D] rounded-full cursor-pointer"
            >
              Save & Exit
            </motion.button> */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.85 }}
              className="w-full md:w-fit mx-auto rounded-full bg-gradient-to-r from-[#38B6FF] to-[#09489D] py-2 md:py-3 px-16 font-medium hover:opacity-90 cursor-pointer transition-opacity text-xl"
            >
              Publish
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
