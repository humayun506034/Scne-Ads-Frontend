/* eslint-disable @typescript-eslint/no-explicit-any */
import { TrendingDown, TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  growth: number;
  isPositive: boolean;
  className?: string;
  SVG?: any;
}

export function MetricCard({
  title,
  SVG,
  value,
  growth,
  isPositive,
  className = "",
}: MetricCardProps) {
  return (
    <div
      className={`space-y-2 flex flex-wrap flex-col items-start  gap-2   ${className}`}
    >
      <div className="flex items-center gap-1">
        {SVG && SVG}
        <h3 className="text-title-color text-sm font-medium">{title}</h3>
      </div>
      <div className="flex justify-between items-center gap-3  md:w-fit w-full">
        <span className="text-white text-2xl md:text-3xl font-bold">
          {value}
        </span>
        <div
          className={`flex items-center gap-1 text-sm px-2 py-1 rounded-md ${
            isPositive
              ? "bg-[#05c16833] text-[#14CA74]"
              : "bg-[#FF4C4C] text-[#C24F4F]"
          }`}
        >
          <span>{growth}%</span>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
        </div>
      </div>
    </div>
  );
}
