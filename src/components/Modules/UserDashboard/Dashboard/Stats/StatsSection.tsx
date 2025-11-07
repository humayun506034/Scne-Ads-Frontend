import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { StatsCard } from "./StatsCard"; // Assuming this is the card component for stats
import { daysVariants } from "@/lib/Data";
import { useGetAnalyticsQuery } from "@/store/api/analyticApi";
import CommonLoading from "@/common/CommonLoading";

const durationOptions = ["All", ...daysVariants] as const;

type DurationOption = (typeof durationOptions)[number];

export const StatsSection = () => {
  const [selectedDate, setSelectedDate] = useState<DurationOption>("All");

  const { data, isLoading } = useGetAnalyticsQuery(undefined);

  if (isLoading) {
    return <CommonLoading />;
  }

  const handleDateChange = (date: DurationOption) => {
    setSelectedDate(date);
  };

  return (
    <div className=" w-full ">
      <h2 className=" text-lg ">7 days Summary Stats</h2>
      <div className="p-6 mt-6 border-dashboard-border bg-dashboard-card-bg rounded-md border-1 ">
        <div className="flex justify-between  text-title-color mt-6 w-full ">
          <h1 className=" text-2xl font-semibold">Dates</h1>
          <div className="flex items-center gap-2 text-sm md:text-base">
            <p>28-06-2025</p> - <p>27-07-2025</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-2 w-full mb-6">
          {durationOptions.map((option) => (
            <Card className="border-none mt-10 p-0 ">
              <CardContent className="p-0">
                <button
                  key={option}
                  onClick={() => handleDateChange(option)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer duration-300 
                ${
                  selectedDate === option
                    ? "bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)]  "
                    : "bg-[#1E2B4D] text-[#AEB9E1] "
                }
                  `}
                >
                  {option}
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 mt-10 ">
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
          value={data.data.analyticsData.totalSpend}
        />
      </div>
    </div>
  );
};
