"use client";
import CommonCalendar from "@/common/CommonCalendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Duration } from "@/lib/Data";
import { setDates } from "@/store/Slices/campaign/campaignSlice";
import { useAppDispatch } from "@/store/hooks";
import { CalendarDays, MoveRight, Timer } from "lucide-react";
import * as React from "react";

export default function DurationSection() {
  const dispatch = useAppDispatch();

  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);

  const [duration, setDuration] = React.useState<string>("");

  // const handleStartDateChange = (date: Date | undefined) => {
  //   if (date) {
  //     const start = new Date(date);
  //     start.setHours(0, 0, 0, 0);
  //     setStartDate(start);
  //     setDuration("");
  //   }
  // };

  // const handleDurationChange = (days: string) => {
  //   if (!startDate) return;

  //   setDuration(days);
  //   const durationInDays = parseInt(days, 10);

  //   const newEndDate = new Date(startDate);
  //   newEndDate.setDate(startDate.getDate() + durationInDays);
  //   newEndDate.setHours(0, 0, 0, 0);

  //   dispatch(
  //     setDates({
  //       startDate: startDate.toISOString(),
  //       endDate: newEndDate.toISOString(),
  //     })
  //   );
  // };

  const handleStartDateChange = (date: Date | undefined) => {
    if (!date) return;

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    setStartDate(start);

    // Recalculate endDate if duration is already selected
    if (duration) {
      const durationInDays = parseInt(duration, 10);
      const newEndDate = new Date(start);
      newEndDate.setDate(start.getDate() + durationInDays);
      newEndDate.setHours(0, 0, 0, 0);

      dispatch(
        setDates({
          startDate: start.toISOString(),
          endDate: newEndDate.toISOString(),
        })
      );
    } else {
      // Just reset endDate if no duration yet
      dispatch(
        setDates({
          startDate: start.toISOString(),
          endDate: "",
        })
      );
    }
  };

  const handleDurationChange = (days: string) => {
    if (!startDate) return;

    setDuration(days);
    const durationInDays = parseInt(days, 10);

    const newEndDate = new Date(startDate);
    newEndDate.setDate(startDate.getDate() + durationInDays);
    newEndDate.setHours(0, 0, 0, 0);

    dispatch(
      setDates({
        startDate: startDate.toISOString(),
        endDate: newEndDate.toISOString(),
      })
    );
  };

  return (
    <div className="my-20">
      <h1 className="text-2xl md:text-4xl ">Duration</h1>
      <h1 className="text-xl mt-8  flex justify-start items-center gap-4 ">
        <CalendarDays
          strokeWidth={0.75}
          className="w-8 h-8 text-white"
        />
        Select your campaign start date first and then choose total duration of
        your campaign.
      </h1>

      <div className="flex flex-col justify-between md:flex-row gap-3 mt-12 w-full">
        <CommonCalendar
          date={startDate}
          handleStartDateChange={handleStartDateChange}
        />

        <div className="hidden md:flex items-center justify-center text-xl font-medium text-white">
          <MoveRight className="w-16 h-12" />
        </div>

        <div className="xl:w-96">
          <Select
            value={duration}
            onValueChange={handleDurationChange}
            disabled={!startDate}
          >
            <SelectTrigger className="border-none focus:border-none ring-0">
              <div
                className={`!px-8 !py-4  bg-dashboard-card-bg border-dashboard-border border w-full rounded-full cursor-pointer text-lg flex justify-between items-center ${
                  !startDate ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <SelectValue placeholder="Select Duration (Days)" />
                <Timer
                  className="w-8 h-8"
                  strokeWidth={1}
                />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#081028] text-white border-none">
              {Duration.map((d) => (
                <SelectItem
                  className="cursor-pointer   text-center hover:bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] hover:text-white"
                  key={d.value}
                  value={d.value}
                >
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
