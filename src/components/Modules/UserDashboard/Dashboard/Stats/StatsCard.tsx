import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
}

export const StatsCard = ({ title, value }: StatsCardProps) => {
  return (
    <Card className="flex flex-col p-4 sm:p-5 rounded-xl border border-dashboard-border bg-dashboard-card-bg shadow-md transition-all duration-300 hover:shadow-xl">
      <h3 className="text-xs sm:text-sm text-[#AEB9E1]">{title}</h3>
      <p className="text-lg sm:text-xl text-white font-semibold mt-2 break-words">
        {value}
      </p>
    </Card>
  );
};
