import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

type TabKey = "adminBasicInfo" | "adminChangePassword";

const tabs: { key: TabKey; label: string; path: string }[] = [
  {
    key: "adminBasicInfo",
    label: "Basic Info",
    path: "/admin-dashboard/adminBasicInfo",
  },
  {
    key: "adminChangePassword",
    label: "Change Password",
    path: "/admin-dashboard/adminChangePassword",
  },
];

const AdminPanelNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [underlineProps, setUnderlineProps] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  // Map multiple route segments to a single tab
  const tabRouteMap: Record<string, TabKey> = {
    adminBasicInfo: "adminBasicInfo",
    "adminChangePassword": "adminChangePassword",
  };

  const getActiveTab = (pathname: string): TabKey => {
    for (const key in tabRouteMap) {
      if (pathname.includes(key)) {
        return tabRouteMap[key];
      }
    }
    return "adminBasicInfo";
  };

  const [activeTab, setActiveTab] = useState<TabKey>(() =>
    getActiveTab(location.pathname)
  );

  useEffect(() => {
    setActiveTab(getActiveTab(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.key === activeTab);
    const currentTab = tabsRef.current[index];
    if (currentTab) {
      setUnderlineProps({
        left: currentTab.offsetLeft,
        width: currentTab.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <header className="px-6 py-10 md:px-10 lg:block sticky top-0 z-50 w-full">
      {/* Navbar */}
      <nav className="relative flex justify-start gap-20 text-base font-medium">
        {tabs.map((tab, idx) => (
          <button
            key={tab.key}
            ref={(el) => (tabsRef.current[idx] = el)}
            onClick={() => navigate(tab.path)} // navigate to route
            className={`relative pb-2 transition-colors cursor-pointer duration-200 ${
              activeTab === tab.key
                ? "text-[#1DA1F2] font-semibold"
                : "text-gray-300 hover:text-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}

        {/* Animated underline */}
        <motion.span
          className="absolute bottom-0 h-[2px] bg-[#1DA1F2] rounded"
          animate={{ left: underlineProps.left, width: underlineProps.width }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </nav>
    </header>
  );
};

export default AdminPanelNavbar;
