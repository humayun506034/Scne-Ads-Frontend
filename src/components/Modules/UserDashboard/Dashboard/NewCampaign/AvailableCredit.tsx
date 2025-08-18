import CommonDashboardButton from "@/common/CommonDashBoardButton";
import { ArrowUp } from "lucide-react";

export function AvailableCreditSection() {
  return (
    <div className="bg-dashboard-card-bg rounded-2xl p-6 border-none w-full">
      <div className="flex flex-col lg:flex-row gap-4 md:gap-0 items-center justify-between mb-4">
        <div className="">
          <div className="text-white text-2xl font-semibold  flex justify-start gap-2">
            $0.00
            <span className="text-sm font-normal text-title-color">USD</span>
          </div>
          <div className="text-title-color text-sm mb-4 mt-2">
            Available Credit
          </div>
        </div>
        <CommonDashboardButton title="Add credit" Icon={ArrowUp} />
      </div>
    </div>
  );
}
