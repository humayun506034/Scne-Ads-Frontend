
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

type TabKey =
  | "basic-info"
  | "change-password"
  | "billing-info"
  | "payment-method"
  | "ads-credits"
  | "invoice";

const tabs: { key: TabKey; label: string }[] = [
  { key: "basic-info", label: "Basic Info" },
  { key: "change-password", label: "Change Password" },
  { key: "billing-info", label: "Billing Info" },
  { key: "payment-method", label: "Payment method" },
  { key: "ads-credits", label: "SCNE Ads Credits" },
  { key: "invoice", label: "Invoice" },
];

const UserPanelNavbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("basic-info");
  const [underlineProps, setUnderlineProps] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

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
    <header className=" px-6 py-10 md:px-10 lg:block sticky top-0 z-50 w-full ">
      
        {/* Navbar */}
        <nav className="relative flex justify-between gap-8 text-base font-medium">
          {tabs.map((tab, idx) => (
            <button
              key={tab.key}
              ref={(el) => (tabsRef.current[idx] = el)}
              onClick={() => setActiveTab(tab.key)}
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

export default UserPanelNavbar;
