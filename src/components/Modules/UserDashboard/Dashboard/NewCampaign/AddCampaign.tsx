import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export function AddCampaignSection() {
  return (
    <div className="bg-dashboard-card-bg rounded-2xl p-6 border border-none  text-center md:h-[480px] flex flex-col items-center justify-center">
      {/* Large Plus Button */}
      <div className="flex flex-col items-center">
        <Link to="/user-dashboard/new-campaign">
          <div
            style={{
              borderRadius: "100px",
              background:
                "var(--Gradient-02, linear-gradient(270deg, #3680E2 0%, #033579 100%))",
            }}
            className="transition-colors rounded-full w-16 md:w-32 h-16 md:h-32 flex items-center justify-center mx-auto mb-4 shadow-lg cursor-pointer hover:bg-[#033579] hover:shadow-[0_0_20px_rgba(3,53,121,0.5)]"
          >
            <Plus className="w-8 md:w-16 h-8 md:h-16 " />
          </div>
        </Link>
      </div>

      <h3 className="text-white text-2xl font-medium mb-2">New Campaign</h3>
      <p className="text-title-color text-base leading-relaxed">
        Click this button to launch the new campaign wizard.
      </p>
    </div>
  );
}
