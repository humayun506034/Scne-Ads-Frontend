import { Card } from "@/components/ui/card";
import { SelectionSummary } from ".";

interface SelectionSummaryProps {
  summary: SelectionSummary;
}

export function SelectionSummaryComponent({ summary }: SelectionSummaryProps) {
  if (summary.selectedCount === 0) return null;

  return (
    <Card className="absolute top-4 left-4 z-10 bg-white p-4 shadow-lg min-w-[280px]">
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900">Selection Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">
              {summary.selectedCount} Locations
            </span>
          </div>
          <div>
            <span className="text-gray-600">{summary.radius}km radius</span>
          </div>
          <div>
            <span className="text-gray-600">
              {(summary.totalReach / 1000).toFixed(0)}k reach
            </span>
          </div>
          <div>
            <span className="text-gray-600">${summary.averagePrice}/day</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
