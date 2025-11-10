/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Campaign,
  CampaignMeta,
} from "@/pages/UserDashboard/UserDashboardMetrics";
import { SpendImpressionsChart } from "./ImpressionChart";

type Props = {
  meta: CampaignMeta;
  campaigns: Campaign[];
};

export default function AnalyticsSection({ meta, campaigns }: Props) {
  return (
    <div className="mt-20 w-full">
      <div className="flex flex-col xl:flex-row w-full gap-6">
        {/* Chart Section */}
        <div className="xl:w-[60%] bg-dashboard-card-bg p-6 rounded-xl border border-dashboard-border shadow-sm">
          <SpendImpressionsChart meta={meta} />
        </div>

        {/* Running Ads Section */}
        <div className="xl:w-[40%] flex flex-col">
          <h3 className="text-2xl font-semibold text-center text-title-color mb-6">
            Ads Running On These Screens
          </h3>

          <div className="space-y-4 max-h-[370px] overflow-y-auto pr-1">
            {campaigns.map((c) => {
              const amount =
                c?.CustomPayment?.[0]?.amount ??
                (c as any)?.payment?.amount ??
                0;
              const screenName =
                c?.screens?.[0]?.screen_name || "Unnamed Screen";

              return (
                <div
                  key={c.id}
                  className="relative p-5 rounded-2xl border border-white/10 
                             backdrop-blur-xl bg-white/10 shadow-md 
                             hover:shadow-xl hover:-translate-y-1 
                             transition-all duration-300 overflow-hidden"
                >
                  {/* Subtle gradient reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-10 pointer-events-none" />

                  <div className="flex justify-between items-center mb-2 relative z-10">
                    <p className="text-sm font-semibold text-gray-100 truncate">
                      {screenName}
                    </p>
                    <span
                      className={`text-[10px] px-2 py-1 rounded-full capitalize font-medium ${
                        c.status === "completed"
                          ? "bg-green-400/20 text-green-300"
                          : c.status === "running"
                          ? "bg-blue-400/20 text-blue-300"
                          : "bg-yellow-400/20 text-yellow-300"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 font-medium relative z-10">
                    ৳ {amount.toLocaleString()}
                  </p>
                </div>
              );
            })}

            {campaigns.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-10">
                No active campaigns found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
