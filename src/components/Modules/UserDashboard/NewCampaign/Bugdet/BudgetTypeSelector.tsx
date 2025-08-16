import { motion } from "framer-motion";
import { BudgetType } from ".";

interface BudgetTypeSelectorProps {
  budgetTypes: BudgetType[];
  selectedType: "hourly" | "daily";
  onTypeChange: (type: "hourly" | "daily") => void;
}

export function BudgetTypeSelector({
  budgetTypes,
  selectedType,
  onTypeChange,
}: BudgetTypeSelectorProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8 my-12 md:mt-20 max-w-5xl mx-auto  bg-dashboard-card-bg p-6  rounded-lg">
      {budgetTypes.map((type) => (
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          key={type.id}
          onClick={() => onTypeChange(type.id)}
          className={`flex-1 px-6 w-full md:w-fit  py-4 cursor-pointer rounded-md text-sm font-medium transition-all duration-200 ${
            selectedType === type.id
              ? "border border-dashboard-border bg-gradient-to-r to-[#38B6FF] from-[#09489D] "
              : "border border-dashboard-border bg-[#16294E] text-title-color hover:border-dashboard-border/50"
          }`}
        >
          {type.label}
        </motion.button>
      ))}
    </div>
  );
}
