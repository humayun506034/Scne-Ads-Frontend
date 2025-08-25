import CommonDashboardButton from "@/common/CommonDashBoardButton";
import React, { useState } from "react";

interface ManageSectionModalProps {
  onClose: () => void;
}

const ManageSectionModal: React.FC<ManageSectionModalProps> = ({ onClose }) => {
  const [sections, setSections] = useState([
    { id: 1, name: "Screen Tier Pricing", enabled: true },
    { id: 2, name: "Time of day pricing", enabled: true },
    { id: 3, name: "Screen Configuration", enabled: true },
    { id: 4, name: "Ad Type Pricing", enabled: false },
    { id: 5, name: "Traffic Score Pricing", enabled: false },
  ]);

  const toggleSection = (id: number) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, enabled: !section.enabled } : section
      )
    );
  };

  const addCustomSection = () => {
    const newSection = {
      id: sections.length + 1,
      name: "New Custom Section",
      enabled: false,
    };
    setSections([...sections, newSection]);
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose} // close on backdrop click
    >
      <div
        className="bg-[#081028] rounded-2xl p-6 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg"
        onClick={(e) => e.stopPropagation()} // prevent modal click from closing
      >
        <h2 className="text-white text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8">
          Manage Pricing Sections
        </h2>

        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {sections.map((section) => (
            <div
              key={section.id}
              className="flex items-center space-x-3 sm:space-x-4"
            >
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center cursor-pointer transition-colors ${
                  section.enabled ? "bg-primary-bg-color" : "bg-[#5678A5]"
                }`}
                onClick={() => toggleSection(section.id)}
              >
                {section.enabled && (
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="text-white text-sm sm:text-lg font-medium">
                {section.name}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={addCustomSection}
          className="w-full bg-[#222E51] hover:bg-slate-600 text-white text-sm sm:text-lg font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-xl mb-4 sm:mb-6 flex items-center justify-center space-x-2 sm:space-x-3 transition-colors"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v8m-4-4h8"
            />
          </svg>
          <span>Add new custom section</span>
        </button>

        <div className="flex justify-center">
          <CommonDashboardButton
            title="Close"
            className="px-6 sm:px-8"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageSectionModal;
