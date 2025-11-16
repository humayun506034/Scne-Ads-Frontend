import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { motion } from "framer-motion";
import { useState } from "react";
import { budgetConfig, BudgetState, budgetTypes, paymentMethods } from ".";
import img from "../../../../../assets/Dashboard/board1.jpg";
import { BudgetSlider } from "./BudgetSlider";
import { BudgetTypeSelector } from "./BudgetTypeSelector";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { SpendLimitSection } from "./SpendLimit";

const campaignData = {
  campaignName: "My First Campaign",
  image: img,
  displayEnvironment: "digital_billboards",
  boardSelection: "All Available Boards",
  budget: "$40 (daily)",
  dateSchedule: "17/07/2025 to No End Date",
  timeSchedule: "Sat-Thur (9PM - 11AM)",
  adName: "Product showcasing Ad",
  mediaSelection: "1/3 Selected :  Time Square, NYC",
  screenSize: "1920x758",
  primaryText: "N/A",
  category: "new",
  headlineText: "N/A",

  description: "N/A",
  websiteURL: "N/A",
};

export function BudgetSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgetState, setBudgetState] = useState<BudgetState>({
    budgetType: "daily",
    budgetAmount: budgetConfig.defaultBudget,
    hasSpendLimit: true,
    spendLimitAmount: budgetConfig.defaultBudget,
    selectedPaymentMethod: paymentMethods[0].id,
  });

  const handleBudgetTypeChange = (type: "hourly" | "daily") => {
    setBudgetState((prev) => ({ ...prev, budgetType: type }));

  };

  const handleBudgetAmountChange = (amount: number) => {
    setBudgetState((prev) => ({ ...prev, budgetAmount: amount }));
   
  };

  const handleSpendLimitToggle = (enabled: boolean) => {
    setBudgetState((prev) => ({ ...prev, hasSpendLimit: enabled }));
   
  };

  const handleSpendLimitChange = (amount: number) => {
    setBudgetState((prev) => ({ ...prev, spendLimitAmount: amount }));
   
  };

  const handlePaymentMethodChange = (methodId: string) => {
    setBudgetState((prev) => ({ ...prev, selectedPaymentMethod: methodId }));
  
  };


  return (
    <div className=" my-20 mb-80">
      <div>
        <h1 className="text-2xl md:text-4xl font-medium  mb-2">
          Choose the budget
        </h1>
        <p className=" ">
          Since this is an ongoing campaign, set an hourly or daily spend rate.
          You can also set a spend limit to stay within your budget.
        </p>
      </div>

      <BudgetTypeSelector
        budgetTypes={budgetTypes}
        selectedType={budgetState.budgetType}
        onTypeChange={handleBudgetTypeChange}
      />

      <BudgetSlider
        value={budgetState.budgetAmount}
        min={budgetConfig.minBudget}
        max={budgetConfig.maxBudget}
        step={budgetConfig.step}
        onChange={handleBudgetAmountChange}
      />

      <SpendLimitSection
        hasSpendLimit={budgetState.hasSpendLimit}
        spendLimitAmount={budgetState.spendLimitAmount}
        onToggleSpendLimit={handleSpendLimitToggle}
        onSpendLimitChange={handleSpendLimitChange}
        minBudget={budgetConfig.minBudget}
        maxBudget={budgetConfig.maxBudget}
      />

      <PaymentMethodSelector
        paymentMethods={paymentMethods}
        selectedMethodId={budgetState.selectedPaymentMethod}
        onMethodChange={handlePaymentMethodChange}
      />
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.85 }}
            
            className="w-full md:w-fit mt-6 md:mt-0 mx-auto rounded-full bg-gradient-to-r to-[#38B6FF] from-[#09489D] py-4 px-8 font-medium hover:opacity-90 cursor-pointer transition-opacity "
          >
            Preview Campaign
          </motion.button>
        </DialogTrigger>

        <DialogContent className="bg-[#081028] rounded-lg lg:p-10 lg:min-w-xl mx-auto border-none overflow-y-auto max-h-[80vh]">
          <DialogHeader className="text-white bg-[#16294E] rounded-2xl text-base p-4">
            <div className="flex justify-start items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="none"
              >
                <path
                  d="M4 10V8H12V10H4ZM4 6V4H12V6H4ZM2 12H9.5C9.98333 12 10.4333 12.1042 10.85 12.3125C11.2667 12.5208 11.6167 12.8167 11.9 13.2L14 15.95V2H2V12ZM2 18H13.05L10.325 14.425C10.225 14.2917 10.1042 14.1875 9.9625 14.1125C9.82083 14.0375 9.66667 14 9.5 14H2V18ZM14 20H2C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H14C14.55 0 15.0208 0.195833 15.4125 0.5875C15.8042 0.979167 16 1.45 16 2V18C16 18.55 15.8042 19.0208 15.4125 19.4125C15.0208 19.8042 14.55 20 14 20Z"
                  fill="#14CA74"
                />
              </svg>{" "}
              <p> Campaign Preview</p>
            </div>
          </DialogHeader>

          <div className="mt-6 w-full p-4 border border-[#203265] rounded-xl">
            <div className="mt-10 lg:mt-0 rounded-lg">
              <img
                src={campaignData.image}
                alt="Campaign Location"
                className="w-full h-[250px] object-fill rounded-lg"
              />
            </div>
            <div className=" mt-6 space-y-2">
              <h3 className="text-white text-base lg:text-lg">
                Campaign Name: {campaignData.campaignName}
              </h3>
              <h1 className="border-b border-[#6371A3] pb-4 mb-4 mt-12">
                Ad set Summary
              </h1>
              <p className="  ">
                Display Environment : {campaignData.displayEnvironment}
              </p>

              <p className="  ">
                Board Selection : {campaignData.boardSelection}
              </p>
              <p className="  ">Budget : {campaignData.budget}</p>
              <p className="  ">Data Schedule : {campaignData.dateSchedule}</p>
              <p className="  ">Time Schedule : {campaignData.timeSchedule}</p>

              <h1 className="border-b border-[#6371A3] pb-4  mt-12">
                Ad Summary
              </h1>
              <p className="">Ad Name : {campaignData.adName}</p>
              <p className=" ">Category : {campaignData.category}</p>

              <p className=" ">Description :{campaignData.description}</p>
              <p className="">
                Media:
                {campaignData.screenSize}
              </p>
              <p className="">Primary text :{campaignData.primaryText}</p>
              <p className="">Headline text : {campaignData.headlineText}</p>
              <p className="">Description : {campaignData.description}</p>
              <p className="">WebSite URL : {campaignData.websiteURL}</p>
            </div>
          </div>
          <div className="mt-6 w-full md:w-fit mx-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-500 px-6 cursor-pointer py-3 font-medium text-white p-2 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
