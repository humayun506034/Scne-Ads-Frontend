import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
}

export const StatsCard = ({ title, value }: StatsCardProps) => {
  return (
    <Card className="flex  flex-col  p-5 rounded-xl  border-1 bg-dashboard-card-bg border-dashboard-border shadow-md transition-all duration-300 hover:shadow-xl">
      <h3 className="text-sm text-[#AEB9E1]">{title}</h3>
      <p className="text-xl text-white font-semibold mt-2">{value}</p>
    </Card>
  );
};
