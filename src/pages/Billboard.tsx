import { useState } from "react";

import BundleTab from "../components/Modules/UserDashboard/Home/SpecialSection/BundleTab";
import Navbar from "./Navbar";
import ScreensTab from "./ScreensTab";

function Billboard() {
  const [activeTab, setActiveTab] = useState<"screens" | "bundles">("screens");

  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Screens & Bundles
            </h1>
            <p className="text-gray-400">
              Your LED screen inventory and custom bundles
            </p>

            {/* Tabs */}
            <div className="flex space-x-4 mt-6 shadow-md rounded-2xl p-2 bg-gray-900/40">
              <button
                onClick={() => setActiveTab("screens")}
                className={`px-6 py-2 rounded-xl font-medium transition cursor-pointer ${
                  activeTab === "screens"
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                Screens
              </button>
              <button
                onClick={() => setActiveTab("bundles")}
                className={`px-6 py-2 rounded-xl font-medium transition cursor-pointer ${
                  activeTab === "bundles"
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                Bundles
              </button>
            </div>
          </div>

          {/* Content */}
          {activeTab === "screens" && (
            <>
              <ScreensTab />
            </>
          )}

          {activeTab === "bundles" && (
            <>
              <BundleTab />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Billboard;
