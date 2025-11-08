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
      <div className="flex flex-col xl:flex-row w-full gap-4">
        <div className="xl:w-[60%]">
          <SpendImpressionsChart meta={meta} />
        </div>
        <div className="xl:w-[40%]">
          <h3 className="text-2xl font-bold text-center mb-4">
            Ads Running On These Screen
          </h3>
          <div className="space-y-3 max-h-[370px] overflow-y-auto">
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
                  className="bg-[#1E2B4D] p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-semibold text-white">
                      {screenName}
                    </p>
                    <span
                      className={`text-[10px] px-2 py-1 rounded-full capitalize ${
                        c.status === "completed"
                          ? "bg-green-500/20 text-green-400"
                          : c.status === "running"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    ৳ {amount.toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
