import { CampaignMeta } from "@/pages/UserDashboard/UserDashboardMetrics";
import { StatsCard } from "./StatsCard";
import { useQueryState, parseAsString } from "nuqs";
import CommonSelect from "@/common/CommonSelect";
import { CalendarDays } from "lucide-react";

type Props = {
  meta?: CampaignMeta;
  availableYears: string[];
};

interface Option {
  value: string;
  label: string;
}

export const StatsSection = ({ meta, availableYears }: Props) => {
  const [period, setPeriod] = useQueryState(
    "period",
    parseAsString.withDefault(new Date().getFullYear().toString())
  );

  if (!meta) return null;

  const totalCampaign = meta.counts.totalCampaign;
  const completed = meta.counts.byStatus.completed;
  const totalRevenue = meta.revenue.totalRevenue;

  const yearOptions: Option[] = availableYears.map((year) => ({
    value: year,
    label: year,
  }));

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold">Summary Stats</h2>

      <div className="p-6 mt-6 border-dashboard-border bg-dashboard-card-bg rounded-md border">
        <div className="flex justify-between text-title-color mt-2 w-full">
          <h1 className="text-2xl font-semibold">Stats</h1>
          <div className="flex items-center gap-2 text-sm md:text-base">
            <CommonSelect
              Value={period}
              setValue={setPeriod}
              Icon={CalendarDays}
              options={yearOptions}
              bgColor="bg-gradient-to-r from-[#38B6FF] to-[#09489D]"
            />
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 mt-10">
          <StatsCard
            title="Total Campaigns"
            value={totalCampaign}
          />
          <StatsCard
            title="Completed"
            value={completed}
          />
          <StatsCard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
