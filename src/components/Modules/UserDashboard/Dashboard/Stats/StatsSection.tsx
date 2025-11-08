
import { CampaignMeta } from "@/pages/UserDashboard/UserDashboardMetrics";
import { StatsCard } from "./StatsCard";

type Props = {
  meta: CampaignMeta | undefined;
};

export const StatsSection = ({ meta }: Props) => {
  if (!meta) return null;

  const totalCampaign = meta.counts.totalCampaign;
  const completed = meta.counts.byStatus.completed;
  const totalRevenue = meta.revenue.totalRevenue;

  return (
    <div className="w-full">
      <h2 className="text-lg">Summary Stats</h2>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 mt-10">
        <StatsCard title="Total Campaigns" value={totalCampaign} />
        <StatsCard title="Completed" value={completed} />
        <StatsCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} />
      </div>
    </div>
  );
};
