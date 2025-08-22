import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CommonDashboardButton from "@/common/CommonDashBoardButton";

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
        className="w-full px-3 py-2 bg-[#1a2847] border border-[#2a3a57] rounded text-white text-xs text-left focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all flex justify-between items-center min-w-16"
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
            className="absolute top-full left-0 right-0 mt-1 bg-[#1a2847] border border-[#2a3a57] rounded shadow-lg z-50 overflow-hidden"
          >
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(option)}
                className="w-full px-3 py-2 text-xs text-left text-gray-200 hover:bg-[#2a3a57] hover:text-white transition-colors"
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

// Input Component for CPP values
const CppInput = ({ value, onChange }) => (
  <input
   type="number"
      step="0.05"
      min="0"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-16 px-2 py-1 text-xs text-white bg-[#1a2847] border border-[#2a3a57] rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
  />
);

// Section Header Component
const SectionHeader = ({ title, subtitle }) => (
  <div className="space-y-3 mb-6">
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-white text-lg font-medium">{title}</h2>
        <p className="text-gray-400 text-xs mt-1">{subtitle}</p>
      </div>
    </div>
  </div>
);

// Table Row Components
const TierPricingRow = ({ tier, cpp, onCppChange }) => (
  <div className="grid grid-cols-2 gap-4 py-2 border-b border-[#394E88] last:border-b-0">
    <div className="text-gray-300 text-xs">{tier}</div>
    <div className="flex items-center gap-2">
      <CppInput value={cpp} onChange={onCppChange} />
      
    </div>
  </div>
);

const TimePricingRow = ({ timeCategory, timeBlocks, cpp, onCppChange }) => (
  <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-700/30 last:border-b-0">
    <div className="text-gray-300 text-xs">{timeCategory}</div>
    <div className="text-gray-300 text-xs">{timeBlocks}</div>
    <div className="flex items-center gap-2">
      <CppInput value={cpp} onChange={onCppChange} />
      <CustomDropdown
        value="$"
        onChange={() => {}}
        options={["$", "€", "£"]}
        className="w-12"
      />
    </div>
  </div>
);

const ScreenConfigRow = ({
  screenName,
  location,
  assignedTier,
  baseCpp,
  currentCpp,
  onTierChange,
  onBaseCppChange,
}) => (
  <div className="grid grid-cols-5 gap-3 py-3 border-b border-gray-700/30 last:border-b-0 items-center">
    <div className="text-gray-300 text-xs">{screenName}</div>
    <div className="text-gray-300 text-xs">{location}</div>
    <CustomDropdown
      value={assignedTier}
      onChange={onTierChange}
      options={["Tier 1", "Tier 2", "Tier 3", "Tier 4"]}
    />
    <div className="flex items-center gap-2">
      <CppInput value={baseCpp} onChange={onBaseCppChange} />
      <CustomDropdown
        value="$"
        onChange={() => {}}
        options={["$", "€", "£"]}
        className="w-12"
      />
    </div>
    <div className="text-gray-300 text-xs">{currentCpp}</div>
  </div>
);

// Main Component
const DynamicPricingManagement: React.FC = () => {
  // Screen Tier Pricing State
  const [tierPricing, setTierPricing] = useState([
    { id: 1, tier: "Tier 1: High-Traffic", cpp: "0.75" },
    { id: 2, tier: "Tier 2: Medium-Traffic", cpp: "0.75" },
    { id: 3, tier: "Tier 3: Low-Traffic", cpp: "0.75" },
  ]);

  // Time of Day Pricing State
  const [timePricing, setTimePricing] = useState([
    {
      id: 1,
      timeCategory: "Peak Hours",
      timeBlocks:
        "7:00 AM - 9:00 AM 5:00 PM - 7:00 PM 4:00 PM 4:00 PM - 7:00 PM",
      cpp: "0.75",
    },
    {
      id: 2,
      timeCategory: "Off-Peak Hours",
      timeBlocks: "All other times",
      cpp: "0.75",
    },
  ]);

  // Screen Configuration State
  const [screenConfig, setScreenConfig] = useState([
    {
      id: 1,
      screenName: "Downtown Billboard",
      location: "Main St.",
      assignedTier: "Tier 1",
      baseCpp: "0.80",
      currentCpp: "$1.25 - $1.50",
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

  const updateTierCpp = (id, newCpp) => {
    setTierPricing((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cpp: newCpp } : item))
    );
  };

//   const updateTimeCpp = (id, newCpp) => {
//     setTimePricing((prev) =>
//       prev.map((item) => (item.id === id ? { ...item, cpp: newCpp } : item))
//     );
//   };

//   const updateScreenTier = (id, newTier) => {
//     setScreenConfig((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, assignedTier: newTier } : item
//       )
//     );
//   };

//   const updateScreenBaseCpp = (id, newBaseCpp) => {
//     setScreenConfig((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, baseCpp: newBaseCpp } : item
//       )
//     );
//   };

//   const handleSaveChanges = () => {
//     console.log("Saving changes...", {
//       tierPricing,
//       timePricing,
//       screenConfig,
//     });
//   };

//   const handleCancel = () => {
//     console.log("Cancelled");
//   };
  

  return (
    <div className="min-h-screen bg-bg-dashboard lg:px-6 lg:py-14">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-white lg:text-4xl text-xl sm:text-2xl font-medium mb-1">
              Dynamic Pricing Management
            </h1>
            <p className="text-[#B1C0D5] text-base">
              Set dynamic CPP pricing for every screen and time of day per
              screen.
            </p>
          </div>
          <CommonDashboardButton
            title="Manage Sections"
            className="px-4 py-2 hover:bg-blue-700 text-white text-sm rounded transition-colors"
          />
        </div>

        {/* Screen Tier Pricing Section */}
        <div className="flex flex-col mb-11">
          <div className="bg-[#091331] rounded-lg p-6 mb-6 ]">
            <SectionHeader title="Screen Tier Pricing" subtitle="" />
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4 py-2 bg-[#0B1739] text-gray-400 text-xs font-medium ">
                <div>Tier Category</div>
                <div>CPP Adjustment (BGD)</div>
              </div>
              {tierPricing.map((tier) => (
                <TierPricingRow
                  key={tier.id}
                  tier={tier.tier}
                  cpp={tier.cpp}
                  onCppChange={(newCpp) => updateTierCpp(tier.id, newCpp)}
                />
              ))}
            </div>
          </div>
          <CommonDashboardButton
            title="Add New Tier"
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors flex items-center gap-1"
          />
        </div>

        {/* Time of Day Pricing Section */}
        {/* <div className="bg-[#1a2847] rounded-lg p-6 mb-6 border border-[#2a3a57]">
          <SectionHeader
            title="Time of Day Pricing"
            subtitle="Adjustments to base CPP for specific time blocks."
            // buttonText="Add Custom Time Block"
          />

          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-4 py-2 text-gray-400 text-xs font-medium border-b border-gray-600">
              <div>Time Category</div>
              <div>Time Blocks</div>
              <div>CPP Adjustment (SGD)</div>
            </div>
            {timePricing.map((time) => (
              <TimePricingRow
                key={time.id}
                timeCategory={time.timeCategory}
                timeBlocks={time.timeBlocks}
                cpp={time.cpp}
                onCppChange={(newCpp) => updateTimeCpp(time.id, newCpp)}
              />
            ))}
          </div>
        </div> */}

        {/* Screen Configuration Section */}
        {/* <div className="bg-[#1a2847] rounded-lg p-6 mb-8 border border-[#2a3a57]">
          <SectionHeader
            title="Screen Configuration"
            subtitle="Configure each individual screen. CPP will be calculated dynamically."
          />

          <div className="space-y-2">
            <div className="grid grid-cols-5 gap-3 py-2 text-gray-400 text-xs font-medium border-b border-gray-600">
              <div>Screen Name</div>
              <div>Location</div>
              <div>Assigned Tier</div>
              <div>Base CPP ($)</div>
              <div>Current Calculated CPP Range (SGD)</div>
            </div>
            {screenConfig.map((screen) => (
              <ScreenConfigRow
                key={screen.id}
                screenName={screen.screenName}
                location={screen.location}
                assignedTier={screen.assignedTier}
                baseCpp={screen.baseCpp}
                currentCpp={screen.currentCpp}
                onTierChange={(newTier) => updateScreenTier(screen.id, newTier)}
                onBaseCppChange={(newBaseCpp) =>
                  updateScreenBaseCpp(screen.id, newBaseCpp)
                }
              />
            ))}
          </div>
        </div> */}

        {/* Footer Buttons */}
        {/* <div className="flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-6 py-2.5 text-gray-300 hover:text-white transition-colors font-medium text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveChanges}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm"
          >
            Save Changes
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default DynamicPricingManagement;
