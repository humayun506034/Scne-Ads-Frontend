import logo from "@/assets/logo.png";
import CommonWrapper from "@/common/CommonWrapper";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { MapPin, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Billboards", href: "/billboards" },
  { label: "Help Centre", href: "/help" },
  { label: "User Dashboard", href: "/user-dashboard" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("/");

  const handleTabClick = (href: string) => {
    setActiveTab(href); // Update active tab
  };

  return (
    <nav className="w-full fixed top-0 lg:bg-transparent lg:relative bg-[var(--primary-bg-color)] lg:shadow-none shadow-lg z-50">
      <CommonWrapper>
        <div className="flex items-center justify-between my-2 lg:my-5">
          <div className="flex justify-center gap-10 xl:gap-32">
            <div className="flex items-center gap-2">
              <Link to={"/"}>
                <div className="w-[124px] h-[56px]">
                  <img src={logo} alt="SCNE Ads Logo" />
                </div>
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => handleTabClick(link.href)}
                  className={`text-base transition ease-in-out font-medium underline-animation 
                    
                  hover:underline-animation`}

                  // ${
                  //   activeTab === link.href ? "text-[#38B6FF]" : "text-white"
                  // }
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {link.label}
                  </motion.div>
                </Link>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
              >
                <Button className="bg-[#47B5FF] hover:bg-[#3BA3E8] text-white font-semibold px-8 py-4 cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(71,181,255,0.5)] justify-center  rounded-full flex items-center gap-1 border-white border">
                  See Locations
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="20"
                    viewBox="0 0 14 20"
                    fill="none"
                  >
                    <path
                      d="M7 20C6.76667 20 6.56667 19.9333 6.4 19.8C6.23333 19.6667 6.10833 19.4917 6.025 19.275C5.70833 18.3417 5.30833 17.4667 4.825 16.65C4.35833 15.8333 3.7 14.875 2.85 13.775C2 12.675 1.30833 11.625 0.775 10.625C0.258333 9.625 0 8.41667 0 7C0 5.05 0.675 3.4 2.025 2.05C3.39167 0.683333 5.05 0 7 0C8.95 0 10.6 0.683333 11.95 2.05C13.3167 3.4 14 5.05 14 7C14 8.51667 13.7083 9.78333 13.125 10.8C12.5583 11.8 11.9 12.7917 11.15 13.775C10.25 14.975 9.56667 15.975 9.1 16.775C8.65 17.5583 8.275 18.3917 7.975 19.275C7.89167 19.5083 7.75833 19.6917 7.575 19.825C7.40833 19.9417 7.21667 20 7 20ZM7 9.5C7.7 9.5 8.29167 9.25833 8.775 8.775C9.25833 8.29167 9.5 7.7 9.5 7C9.5 6.3 9.25833 5.70833 8.775 5.225C8.29167 4.74167 7.7 4.5 7 4.5C6.3 4.5 5.70833 4.74167 5.225 5.225C4.74167 5.70833 4.5 6.3 4.5 7C4.5 7.7 4.74167 8.29167 5.225 8.775C5.70833 9.25833 6.3 9.5 7 9.5Z"
                      fill="white"
                    />
                  </svg>
                </Button>
              </motion.div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
            >
              <Button
                variant="ghost"
                className="text-white text-base cursor-pointer font-medium px-4 py-2 rounded-full"
              >
                Login
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
            >
              <Button className="bg-white cursor-pointer text-[#38B6FF] border-none font-medium px-6 py-3 rounded-full">
                Start Now
              </Button>
            </motion.div>
          </div>

          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white ">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="sm:w-80 lg:hidden w-64 bg-[var(--primary-bg-color)] p-0 border-none"
              >
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="h-full flex flex-col"
                >
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center ">
                      <Link to={"/"}>
                        <div className="w-[124px] h-[56px]">
                          <img src={logo} alt="SCNE Ads Logo" />
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="flex-1 py-6">
                    <div className="space-y-1 px-6">
                      {navigationLinks.map((link, index) => (
                        <motion.div
                          key={link.label}
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          onClick={() => setActiveTab(link.href)}
                          className={`block px-4 py-3 text-white 0 rounded-lg font-medium transition-colors duration-200 ${
                            activeTab === link.href
                              ? "text-[#38B6FF]"
                              : "text-white"
                          }`}
                        >
                          <Link to={link.href}> {link.label}</Link>
                        </motion.div>
                      ))}
                    </div>

                    <div className="px-6 mt-8 space-y-3">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                      >
                        <Button className="w-full bg-[#38B6FF] hover:bg-[#2DA5EF] text-white border-none font-medium py-3 rounded-full">
                          See Locations
                          <MapPin className="w-4 h-4 mr-2" />
                        </Button>
                      </motion.div>

                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full border-gray-300 text-white py-3 rounded-full bg-transparent"
                        >
                          Login
                        </Button>
                      </motion.div>

                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                      >
                        <Button className="w-full bg-[#38B6FF] hover:bg-[#2DA5EF] text-white border-none font-medium py-3 rounded-full">
                          Start Now
                        </Button>
                      </motion.div>
                    </div>
                  </div>

                  <div className="p-6 border-t border-gray-200">
                    <p className="text-sm text-title-color text-center">
                      © 2025 SCNE Ads. All rights reserved.
                    </p>
                  </div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CommonWrapper>
    </nav>
  );
}
