import { useState } from "react";
import ScheduleGrid from "./ScheduleGrid";

export function CampaignSchedule() {
  const [selectedDay, setSelectedDay] = useState("All Days");

  const handleDayChange = (newDay: string) => {
    setSelectedDay(newDay);
  };

  const handleTimeSelect = (selectedTime: string) => {
    console.log(`Selected Time: ${selectedTime}`);
  };

  return (
    <div className=" ">
      <h1 className="text-2xl md:text-4xl font-medium  mb-4">
        Set Campaign Schedule
      </h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2 mb-6">
          {["All Days", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day) => (
              <button
                key={day}
                onClick={() => handleDayChange(day)}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-lg cursor-pointer text-sm md:text-base bg-dashboard-card-bg ${
                  selectedDay === day
                    ? " text-white border border-dashboard-border "
                    : "border border-bg-dashboard text-title-color"
                }`}
              >
                {day}
              </button>
            )
          )}
        </div>

        <ScheduleGrid
          selectedDay={selectedDay}
          onTimeSelect={handleTimeSelect}
        />
      </div>
    </div>
  );
}
