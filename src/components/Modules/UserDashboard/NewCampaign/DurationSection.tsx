"use client";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch } from "@/store/hooks";
import { setDates } from "@/store/Slices/campaign/campaignSlice";
import { Calendar1, CalendarDays, MoveRight, Timer } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DurationSection() {
  const dispatch = useAppDispatch();
  const [openStart, setOpenStart] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = React.useState<Date | undefined>(undefined);
  const [duration, setDuration] = React.useState<string>("");

  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0); 
      setStartDate(start);
      setEndDate(start); 
      setDuration("");
    }
    setOpenStart(false);
  };

  const handleDurationChange = (days: string) => {
    if (!startDate) return; 

    setDuration(days);
    const durationInDays = parseInt(days, 10);

  
    const newEndDate = new Date(startDate);
    newEndDate.setDate(startDate.getDate() + durationInDays);
    newEndDate.setHours(0, 0, 0, 0); 
    setEndDate(newEndDate);

   
    dispatch(
      setDates({
        startDate: startDate.toISOString(),
        endDate: newEndDate.toISOString(),
      })
    );

    console.log("End Date:", endDate);
  };

  return (
    <div className="my-20">
      <h1 className="text-2xl md:text-4xl ">Duration</h1>
      <h1 className="text-xl mt-8 md:text-2xl flex justify-start items-center gap-4 ">
        <CalendarDays strokeWidth={0.75} className="w-10 h-10 text-white" />
        Set Dates{" "}
      </h1>

      <div className="flex flex-col justify-between md:flex-row gap-3 mt-12 w-full">
        {/* Start Date Picker */}
        <Popover open={openStart} onOpenChange={setOpenStart}>
          <PopoverTrigger asChild>
            <button
              id="start-date"
              className="p-6 bg-dashboard-card-bg rounded-full font-normal text-lg gap-4 xl:w-96 flex justify-between cursor-pointer items-center"
            >
              {startDate ? startDate.toLocaleDateString() : "Select Start Date"}
              <Calendar1 strokeWidth={0.75} className="w-10 h-10 text-white" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto z-50 overflow-hidden p-0"
            align="start"
            side="bottom"
          >
            <div className="bg-[#081028] border-none">
              <Calendar
                mode="single"
                className="border-none"
                selected={startDate}
                captionLayout="dropdown"
                onSelect={handleStartDateChange}
                classNames={{
                  selected:
                    "hover:bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] text-white rounded-full",
                  day: "text-white cursor-pointer",
                  head_cell: "text-black p-4 m-2",
                  nav_button_previous: "text-white",
                  nav_button_next: "text-white",
                  month: "text-white cursor-pointer",
                  dropdown_year:
                    "bg-[#081028] p-2 text-white hover:bg-[#1e293b] rounded-md",
                  dropdown_month:
                    "bg-[#081028] p-2 text-white hover:bg-[#1e293b] rounded-md",
                }}
              />
            </div>
          </PopoverContent>
        </Popover>

        <div className="hidden md:flex items-center justify-center text-xl font-medium text-white">
          <MoveRight className="w-16 h-12" />
        </div>

        <div className="xl:w-96">
          <Select
            value={duration}
            onValueChange={handleDurationChange}
            disabled={!startDate} 
          >
            <SelectTrigger
              className={`p-6 bg-dashboard-card-bg rounded-full text-lg flex justify-between items-center ${
                !startDate ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <SelectValue placeholder="Select Duration (Days)" />
              <Timer className="w-8 h-8" strokeWidth={1} />
            </SelectTrigger>
            <SelectContent className="bg-[#081028] text-white border-none">
              <SelectItem value="7">7 Day</SelectItem>
              <SelectItem value="15">15 Days</SelectItem>
              <SelectItem value="30">30 Days</SelectItem>
              <SelectItem value="60">60 Days</SelectItem>
              <SelectItem value="90">90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}