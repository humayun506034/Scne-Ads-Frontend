import { Trash2 } from "lucide-react";

interface TimeSlotCellProps {
  day: string;
  hour: number;
  timeSlot?: {
    id: string;
    duration: number;
    startHour: number;
    endHour: number;
  };
  isSelecting: boolean;
  isInSelection: boolean;
  onClick: (day: string, hour: number) => void;
  onDelete: (slotId: string) => void;
}

const TimeSlotCell = ({
  day,
  hour,
  timeSlot,
  isSelecting,
  isInSelection,
  onClick,
  onDelete,
}: TimeSlotCellProps) => {
  const formatTime = (hour: number) => {
    if (hour === 0) return "12 AM";
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return "12 PM";
    return `${hour - 12} PM`;
  };

  const formatTimeRange = (startHour: number, endHour: number) => {
    const start = formatTime(startHour);
    const end = formatTime(endHour);
    return `${start} - ${end}`;
  };

  return (
    <div
      onClick={() => onClick(day, hour)}
      className={`h-12 cursor-pointer border border-[#1D2E46] rounded-lg transition-all duration-200 ${
        isInSelection || isSelecting
          ? "bg-dashboard-card-bg border-dashboard-border"
          : "hover:bg-dashboard-card-bg hover:border-dashboard-border"
      }`}
    >
      {timeSlot ? (
        <div className="md:px-2 md:py-2  text-xs text-center text-white">
          {formatTimeRange(timeSlot.startHour, timeSlot.endHour)}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(timeSlot.id);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-red-500 rounded"
          >
            <Trash2 size={12} />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default TimeSlotCell;
