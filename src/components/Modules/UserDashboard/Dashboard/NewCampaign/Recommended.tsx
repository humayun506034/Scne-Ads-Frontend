import { Play } from "lucide-react";
import img from "../../../../../assets/Dashboard/metrics.png";
export function RecommendedVideosSection() {
  return (
    <div className="bg-dashboard-card-bg rounded-2xl p-6 text-title-color border border-none relative overflow-hidden">
      {/* Header */}
      <h3 className="text-title-color text-lg  text-center mb-5">
        Recommended Videos to watch
      </h3>

      {/* Dashboard Preview with Play Button */}
      <div className="relative  rounded-xl p-4 mb-4">
        {/* Mock Dashboard Content */}
        <img
          src={img}
          className="w-full md:h-[400px] border-2 border-secondary-color object-fill rounded-xl"
          alt="Dashboard Preview"
        />
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="cursor-pointer bg-secondary-color hover:bg-cyan-300 transition-colors rounded-full  p-1 md:p-4 shadow-lg">
            <Play className="w-6 h-6 text-[#0f1419] fill-current ml-1" />
          </button>
        </div>
      </div>

      <section className="p-4">
        <div className="flex items-center  gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="20"
            viewBox="0 0 28 20"
            fill="none"
          >
            <path
              d="M27 3.92857L18.7273 10L27 16.0714V3.92857Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.3636 1.5H3.36364C2.05824 1.5 1 2.58731 1 3.92857V16.0714C1 17.4127 2.05824 18.5 3.36364 18.5H16.3636C17.669 18.5 18.7273 17.4127 18.7273 16.0714V3.92857C18.7273 2.58731 17.669 1.5 16.3636 1.5Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div>
            <h4 className="font-medium text-lg mt-1">Video: Get started</h4>
          </div>
        </div>
        <p className=" text-sm mt-2">
          A quick walkthrough of setting up a campaign on...well, me.
        </p>
      </section>
    </div>
  );
}
