import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { BudgetSlider } from "./BudgetSlider";

interface SpendLimitSectionProps {
  hasSpendLimit: boolean;
  spendLimitAmount: number;
  onToggleSpendLimit: (enabled: boolean) => void;
  onSpendLimitChange: (amount: number) => void;
  minBudget: number;
  maxBudget: number;
}

export function SpendLimitSection({
  hasSpendLimit,
  spendLimitAmount,
  onToggleSpendLimit,
  onSpendLimitChange,
  minBudget,
  maxBudget,
}: SpendLimitSectionProps) {
  return (
    <div className="bg-dashboard-card-bg mt-20 rounded-lg order border-dashboard-border">
      <div
        onClick={() => onToggleSpendLimit(!hasSpendLimit)}
        className="flex cursor-pointer bg-[#16294E] rounded-t-lg p-6 b items-center justify-between mb-4"
      >
        <div className="flex items-center  text-sm md:text-xl gap-2">
          Optional: Spend Limit
        </div>
        <span className="text-sm md:text-xl flex justify-center items-center gap-4">
          Current: {hasSpendLimit ? `$${spendLimitAmount}` : "No limit"}
          <button className="text-title-color hover:text-white transition-colors">
            {hasSpendLimit ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>
        </span>
      </div>

      <AnimatePresence>
        {hasSpendLimit && (
          <motion.div
            key="spendLimitSection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 p-6"
          >
            <p className="text-base text-center lg:text-left ">
              This is the maximum amount your campaign can spend overall.
            </p>

            <div className="flex flex-col justify-center lg:justify-start md:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.85 }}
                onClick={() => onToggleSpendLimit(false)}
                className="md:px-12 px-4 py-2 md:w-fit w-full md:py-4 font-medium  rounded-md border border-dashboard-border bg-[#0B1739] text-gray-300 hover:bg-gradient-to-r from-[#38B6FF] to-[#09489D]  cursor-pointer hover:border-dashboard-border transition-colors text-base"
              >
                No limit
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.85 }}
                onClick={() => {
                  onToggleSpendLimit(true);
                  toast.success(`Spend limit set ${spendLimitAmount}`);
                }}
                className="md:px-12 px-4 py-2  md:w-fit w-full md:py-4 font-medium  rounded-md border border-dashboard-border bg-[#0B1739] text-gray-300 hover:bg-gradient-to-r from-[#38B6FF] to-[#09489D]  cursor-pointer hover:border-dashboard-border transition-colors text-base"
              >
                Set Limit
              </motion.button>
            </div>

            <div className="text-center text-title-color text-base mb-4">
              Estimated 2.6k - 7.4k impressions reached per day
            </div>

            <BudgetSlider
              value={spendLimitAmount}
              min={minBudget}
              max={maxBudget}
              step={1}
              onChange={onSpendLimitChange}
              showEstimate={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
