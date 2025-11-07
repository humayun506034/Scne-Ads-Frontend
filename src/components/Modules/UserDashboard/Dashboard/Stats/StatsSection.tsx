import { Card, CardContent } from "@/components/ui/card";
import { useQueryState, parseAsString } from "nuqs";
import { StatsCard } from "./StatsCard";
import { Duration } from "@/lib/Data";
import { AnalyticsData } from "@/pages/UserDashboard/UserDashboardMetrics";
import CommonSelect from "@/common/CommonSelect";
import { CalendarDays } from "lucide-react";

const durationOptions = [{ label: "All", value: "All" }, ...Duration] as const;
export type DurationOption = (typeof durationOptions)[number];

type Props = {
  analyticsData: AnalyticsData;
  availableYears: number[];
};

interface Option {
  value: string;
  label: string;
}

export const StatsSection = ({ analyticsData, availableYears }: Props) => {
  // ✅ query param for duration (like "7 days", "All", etc.)
  const [duration, setDuration] = useQueryState(
    "duration",
    parseAsString.withDefault("All")
  );

  // ✅ query param for period (year)
  const yearOptions: Option[] = availableYears.map((year) => ({
    value: `${year}`,
    label: `Jan ${year} - Dec ${year}`,
  }));

  const defaultYear =
    yearOptions[0]?.value || new Date().getFullYear().toString();

  const [period, setPeriod] = useQueryState(
    "period",
    parseAsString.withDefault(defaultYear)
  );

  // ✅ safely find duration button state
  const selectedDate =
    durationOptions.find((d) => d.value === duration) ?? durationOptions[0];

  const handleDateChange = (option: DurationOption) => {
    setDuration(option.value); // updates URL + state
  };

  return (
    <div className="w-full">
      <h2 className="text-lg">Summary Stats</h2>

      <div className="p-6 mt-6 border-dashboard-border bg-dashboard-card-bg rounded-md border-1">
        <div className="flex justify-between text-title-color mt-6 w-full">
          <h1 className="text-2xl font-semibold">Dates</h1>

          <div className="flex items-center gap-2 text-sm md:text-base">
            <CommonSelect
              Value={`Jan ${period} - Dec ${period}`}
              setValue={setPeriod}
              Icon={CalendarDays}
              options={yearOptions}
              className="shadow-md"
              bgColor="bg-gradient-to-r from-[#38B6FF] to-[#09489D]"
            />
          </div>
        </div>

        {/* Duration Buttons */}
        <div className="flex flex-wrap justify-between gap-2 w-full mb-6">
          {durationOptions.map((option) => (
            <Card
              key={option.value}
              className="border-none mt-10 p-0"
            >
              <CardContent className="p-0">
                <button
                  onClick={() => handleDateChange(option)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer duration-300 ${
                    selectedDate.value === option.value
                      ? "bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] text-white"
                      : "bg-[#1E2B4D] text-[#AEB9E1]"
                  }`}
                >
                  {option.label}
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 mt-10">
        <StatsCard
          title="People Reached"
          value="0"
        />
        <StatsCard
          title="ADS Played"
          value="0"
        />
        <StatsCard
          title="Total Spend"
          value={analyticsData.totalSpend}
        />
      </div>
    </div>
  );
};
