import CommonSelect from "@/common/CommonSelect";
import { CampaignMeta } from "@/pages/UserDashboard/UserDashboardMetrics";
import { CalendarDays } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { StatsCard } from "./StatsCard";

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
      <div className="p-4 sm:p-6 mt-6 border-dashboard-border bg-dashboard-card-bg rounded-2xl border">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-title-color mt-2 w-full">
          <h1 className="text-xl sm:text-2xl font-semibold">
            Stats for {period}
          </h1>
          <div className="flex items-center gap-2 text-sm md:text-base w-full sm:w-auto">
            <CommonSelect
              Value={period}
              setValue={setPeriod}
              Icon={CalendarDays}
              options={yearOptions}
              bgColor="bg-gradient-to-r from-[#38B6FF] to-[#09489D]"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          <StatsCard
            title="Total Campaigns"
            value={totalCampaign}
          />
          <StatsCard
            title="Completed"
            value={completed}
          />
          <StatsCard
            title="Total Cost"
            value={`$${totalRevenue.toLocaleString()}`}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
