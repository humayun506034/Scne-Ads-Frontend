import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CommonDashboardButton from "@/common/CommonDashBoardButton";
import ManageSectionModal from "./ManageSectionModal";
import AddNewTierModal from "./AddNewTierModal";
import AddCustomTimeBlockModal from "./AddCustomTimeBlockModal";
import AddNewScreenModal from "./AddNewScreenModal";
import CommonCancelButton from "@/common/CommonCancelButton";

// Dropdown Component
const CustomDropdown = ({ value, onChange, options, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 bg-[#1a2847] border border-[#2a3a57] rounded text-white text-xs text-left flex justify-between items-center"
      >
        <span>{value}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-1 bg-[#1a2847] border border-[#2a3a57] rounded shadow-lg z-50"
          >
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(option)}
                className="w-full px-3 py-2 text-xs text-left text-gray-200 hover:bg-[#2a3a57] hover:text-white"
              >
                {option}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Input Component
const CppInput = ({ value, onChange }) => (
  <input
    type="number"
    step="0.05"
    min="0"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-20 sm:w-24 px-2 py-1 text-sm text-[#AEB9E1] bg-[#16234A] border border-[#2a3a57] rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
  />
);

// Section Header Component
const SectionHeader = ({ title, subtitle }) => (
  <div>
    <h2 className="text-xl sm:text-2xl px-4 sm:px-7 py-4 font-medium text-[#AEB9E1]">
      {title}
    </h2>
    {subtitle && <p className="text-gray-400 text-xs mt-1">{subtitle}</p>}
  </div>
);

// Main Component
const DynamicPricingManagement: React.FC = () => {
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isAddTierModalOpen, setIsAddTierModalOpen] = useState(false);
  const [isAddCustomTimeBlockModalOpen, setIsAddCustomTimeBlockModalOpen] =
    useState(false);
  const [isAddNewScreenModalOpen, setIsAddNewScreenModalOpen] = useState(false);

  // Screen Tier Pricing
  const [tierPricing, setTierPricing] = useState([
    { id: 1, tier: "Tier 1: High-Traffic", cpp: "0.75" },
    { id: 2, tier: "Tier 2: Medium-Traffic", cpp: "0.75" },
    { id: 3, tier: "Tier 3: Low-Traffic", cpp: "0.75" },
  ]);

  // Time of Day Pricing
  const [timePricing, setTimePricing] = useState([
    {
      id: 1,
      timeCategory: "Peak Hours",
      timeBlocks: "7:00 AM - 9:00 AM, 12:00 PM - 2:00 PM, 4:00 PM - 7:00 PM",
      cpp: "0.75",
    },
    {
      id: 2,
      timeCategory: "Off-Peak Hours",
      timeBlocks: "All other times",
      cpp: "0.75",
    },
  ]);

  // Screen Configuration
  const [screenConfig, setScreenConfig] = useState([
    {
      id: 1,
      screenName: "Downtown Billboard",
      location: "Main St.",
      assignedTier: "Tier 1",
      baseCpp: "0.80",
      currentCpp: "$1.05 - $1.50",
    },
    {
      id: 2,
      screenName: "Mall Entrance Display",
      location: "Shopping Mall",
      assignedTier: "Tier 2",
      baseCpp: "0.70",
      currentCpp: "$1.00 - $1.25",
    },
    {
      id: 3,
      screenName: "Airport Lounge Screen",
      location: "Terminal 1",
      assignedTier: "Tier 1",
      baseCpp: "1.20",
      currentCpp: "$1.85 - $2.20",
    },
    {
      id: 4,
      screenName: "Sports Arena Jumbotron",
      location: "Stadium",
      assignedTier: "Tier 4",
      baseCpp: "2.50",
      currentCpp: "$2.75 - $3.50",
    },
  ]);

  // Update Handlers
  const updateTierCpp = (id, newCpp) =>
    setTierPricing((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cpp: newCpp } : item))
    );

  const updateTimeCpp = (id, newCpp) =>
    setTimePricing((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cpp: newCpp } : item))
    );

  const updateScreenTier = (id, newTier) =>
    setScreenConfig((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, assignedTier: newTier } : item
      )
    );

  const updateScreenBaseCpp = (id, newBaseCpp) =>
    setScreenConfig((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, baseCpp: newBaseCpp } : item
      )
    );

  const handleSaveChanges = () => {
    console.log("Saving changes...", {
      tierPricing,
      timePricing,
      screenConfig,
    });
  };

  return (
    <div className="min-h-screen bg-bg-dashboard px-4 sm:px-6 py-8 sm:py-16">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-white text-2xl sm:text-4xl font-medium mb-1">
              Dynamic Pricing Management
            </h1>
            <p className="text-[#B1C0D5] text-sm sm:text-base">
              Set dynamic CPP based on Screen Tier and Time of Day per Screen.
            </p>
          </div>
          <CommonDashboardButton
            title="Manage Sections"
            className="px-4 py-2 hover:bg-blue-700 text-white text-sm rounded"
            onClick={() => setIsManageModalOpen(true)}
          />
        </div>

        {/* Screen Tier Pricing */}
        <div className="mb-16 md:w-3xl">
          <div className="bg-[#0B1739] rounded-lg overflow-hidden">
            <SectionHeader title="Screen Tier Pricing" subtitle="" />

            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base border-collapse">
                <thead>
                  <tr className="text-[#E6EBF2] bg-[#0B1739]">
                    <th className="text-left py-3 px-7">Tier Category</th>
                    <th className="text-left py-3 px-7">
                      CPP Adjustment (BSD)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tierPricing.map((tier) => (
                    <tr
                      key={tier.id}
                      className="bg-[#091331] border-b border-[#394E88]"
                    >
                      <td className="text-[#AEB9E1] py-3 px-7">{tier.tier}</td>
                      <td className="py-3 px-7">
                        <CppInput
                          value={tier.cpp}
                          onChange={(newCpp) => updateTierCpp(tier.id, newCpp)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <CommonDashboardButton
            title="Add New Tier"
            onClick={() => setIsAddTierModalOpen(true)}
            className="px-3 py-1.5 mt-7 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded"
          />
        </div>

        {/* Time of Day Pricing */}
        <div className="mb-16">
          <div className="my-10">
            <h3 className="text-xl sm:text-2xl mb-2 text-[#C3CEE9] font-semibold">
              Time of Day Pricing
            </h3>
            <p className="text-[#AEB9E1] text-sm sm:text-base">
              Adjustments to base CPP for specific time blocks.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base border-collapse">
              <thead className="bg-[#0B1739] text-[#E6EBF2] font-medium">
                <tr>
                  <th className="text-left py-5 px-7">Time Category</th>
                  <th className="text-left py-5 px-7">Time Blocks</th>
                  <th className="text-left py-5 px-7">CPP Adjustment (BSD)</th>
                </tr>
              </thead>
              <tbody>
                {timePricing.map((time) => (
                  <tr
                    key={time.id}
                    className="bg-[#091331] text-[#AEB9E1] border-b border-[#394E88]"
                  >
                    <td className="py-3 px-7">{time.timeCategory}</td>
                    <td className="py-3 px-7">{time.timeBlocks}</td>
                    <td className="py-3 px-7">
                      <CppInput
                        value={time.cpp}
                        onChange={(newCpp) => updateTimeCpp(time.id, newCpp)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <CommonDashboardButton
            title="Add Custom Time Block"
            onClick={() => setIsAddCustomTimeBlockModalOpen(true)}
            className="px-3 py-1.5 mt-7 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded"
          />
        </div>

        {/* Screen Configuration */}
        <div className="my-10">
          <h3 className="text-xl sm:text-2xl mb-2 text-[#C3CEE9] font-semibold">
            Screen Configuration
          </h3>
          <p className="text-[#AEB9E1] text-sm sm:text-base">
            Assign tiers to individual screens. CPP will be calculated
            dynamically.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm sm:text-base border-collapse">
            <thead className="bg-[#0B1739] text-[#E6EBF2] font-medium">
              <tr>
                <th className="text-left py-5 px-7">Screen Name</th>
                <th className="text-left py-5 px-7">Location</th>
                <th className="text-left py-5 px-7">Assigned Tier</th>
                <th className="text-left py-5 px-7">Base CPP ($)</th>
                <th className="text-left py-5 px-7">
                  Current Calculated CPP Range (BSD)
                </th>
              </tr>
            </thead>
            <tbody>
              {screenConfig.map((screen) => (
                <tr
                  key={screen.id}
                  className="bg-[#091331] border-b border-[#394E88]"
                >
                  <td className="text-[#AEB9E1] py-3 px-7">
                    {screen.screenName}
                  </td>
                  <td className="text-[#AEB9E1] py-3 px-7">
                    {screen.location}
                  </td>
                  <td className="py-3 px-7">
                    <CustomDropdown
                      value={screen.assignedTier}
                      onChange={(newTier) =>
                        updateScreenTier(screen.id, newTier)
                      }
                      options={["Tier 1", "Tier 2", "Tier 3", "Tier 4"]}
                    />
                  </td>
                  <td className="py-3 px-7">
                    <CppInput
                      value={screen.baseCpp}
                      onChange={(newBaseCpp) =>
                        updateScreenBaseCpp(screen.id, newBaseCpp)
                      }
                    />
                  </td>
                  <td className="text-[#AEB9E1] py-3 px-7">
                    {screen.currentCpp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CommonDashboardButton
          title="Add New Screen"
          onClick={() => setIsAddNewScreenModalOpen(true)}
          className="px-3 py-1.5 mt-7 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded"
        />

        {/* footer buttons */}
        <div className="flex justify-end gap-4 mt-10">
          <CommonDashboardButton
            title="Save Changes"
            onClick={handleSaveChanges}
            className="px-4 py-2 hover:bg-blue-700 text-white text-sm rounded"
          />
          <CommonCancelButton title="Cancel" />
        </div>
        {/* Manage Section Modal */}
        {isManageModalOpen && (
          <ManageSectionModal
            onClose={() => setIsManageModalOpen(false)} // pass close handler
          />
        )}
        {/* Add Tier Modal */}
        {isAddTierModalOpen && (
          <AddNewTierModal
            isOpen={isAddTierModalOpen}
            onClose={() => setIsAddTierModalOpen(false)} // pass close handler
          />
        )}
        {/* Add Custom Time Block Modal */}
        {isAddCustomTimeBlockModalOpen && (
          <AddCustomTimeBlockModal
            onClose={() => setIsAddCustomTimeBlockModalOpen(false)} // pass close handler
          />
        )}
        {/* Add New Sceen Modal */}
        {isAddNewScreenModalOpen && (
          <AddNewScreenModal
            onClose={() => setIsAddNewScreenModalOpen(false)} // pass close handler
          />
        )}
      </div>
    </div>
  );
};

export default DynamicPricingManagement;
