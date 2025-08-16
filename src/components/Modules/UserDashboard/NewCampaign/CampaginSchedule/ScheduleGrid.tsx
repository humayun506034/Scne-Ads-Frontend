import { FC, useState } from "react";
import TimeSlotCell from "./TimeSlotCell";

const TIME_SLOTS = [
  "12:00 AM",
  "01:00 AM",
  "02:00 AM",
  "03:00 AM",
  "04:00 AM",
  "05:00 AM",
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
  "10:00 PM",
  "11:00 PM",
];

const daysToShow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface ScheduleGridProps {
  selectedDay: string;
  onTimeSelect: (selectedTime: string) => void;
}

const ScheduleGrid: FC<ScheduleGridProps> = ({ selectedDay, onTimeSelect }) => {
  const [schedule, setSchedule] = useState<{ [key: string]: string[] }>({
    Sun: [],
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
  });

  const handleTimeClick = (day: string, hour: number) => {
    const time = TIME_SLOTS[hour];
    const newSchedule = { ...schedule };
    const selectedTimes = newSchedule[day] || [];
    if (selectedTimes.includes(time)) {
      newSchedule[day] = selectedTimes.filter((t) => t !== time);
    } else {
      newSchedule[day] = [...selectedTimes, time];
    }
    setSchedule(newSchedule);
    onTimeSelect(`${day}: ${time}`);
  };

  const handleDeleteSlot = (slotId: string) => {
    const [day, hour] = slotId.split("-");
    const newSchedule = { ...schedule };
    newSchedule[day] = newSchedule[day].filter(
      (_, index) => index !== parseInt(hour)
    );
    setSchedule(newSchedule);
  };

  return (
    <div className="space-y-1">
      <div className="grid grid-cols-8 gap-2">
        <div className="text-xs md:text-sm font-medium text-title-color text-right pr-2 py-2">
          Hour
        </div>
        {daysToShow.map((day) => (
          <div
            key={day}
            className="text-xs md:text-sm md:font-medium text-white text-center py-2 bg-dashboard-card-bg md:px-2 rounded-lg"
          >
            {day.toUpperCase()}
          </div>
        ))}
      </div>

      {TIME_SLOTS.map((timeSlot, hour) => (
        <div key={timeSlot} className="grid mt-4 grid-cols-8 gap-2 items-start">
          <div className="md:text-base  text-xs py-2  text-right pr-2">
            {timeSlot}
          </div>

          {daysToShow.map((day) => {
            if (selectedDay === "All Days" || day === selectedDay) {
              return (
                <TimeSlotCell
                  key={`${day}-${timeSlot}`}
                  day={day}
                  hour={hour}
                  timeSlot={
                    schedule[day]?.includes(timeSlot)
                      ? {
                          id: `${day}-${hour}`,
                          startHour: hour,
                          endHour: hour + 1,
                          duration: 1,
                        }
                      : undefined
                  }
                  isSelecting={false}
                  isInSelection={schedule[day]?.includes(timeSlot)}
                  onClick={handleTimeClick}
                  onDelete={handleDeleteSlot}
                />
              );
            }

            return <div key={day} className="h-12 bg-bg-dashboard"></div>;
          })}
        </div>
      ))}
    </div>
  );
};

export default ScheduleGrid;
