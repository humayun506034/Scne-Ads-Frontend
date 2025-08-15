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
      <h1 className="text-3xl font-bold text-white mb-4">
        Set Campaign Schedule
      </h1>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 mb-6">
          {["All Days", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day) => (
              <button
                key={day}
                onClick={() => handleDayChange(day)}
                className={`px-4 py-2 rounded-lg ${
                  selectedDay === day
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
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
