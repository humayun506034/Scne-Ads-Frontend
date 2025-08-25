import React from "react";
import { HelpCircle } from "lucide-react";

const CostEstimator: React.FC = () => {
  const currencies = [
    { symbol: "A$", code: "AUD" },
    { symbol: "$", code: "USD" },
    { symbol: "£", code: "GBP" },
    { symbol: "€", code: "EUR" },
    { symbol: "NZ$", code: "NZD" },
  ];

  return (
    <div className="min-h-screen bg-[#081028] px-8 py-12 text-white relative">
      {/* Heading */}
      <div>
        <p className="text-lg text-gray-300">Get calculating</p>
        <h1 className="text-4xl font-semibold mt-1">
          Let’s <span className="text-[#ADC1FF] font-bold">guesstimate</span>{" "}
          <br />
          Costs.
        </h1>
      </div>

      {/* Info Note */}
      <div className="flex items-start justify-between mt-6 bg-[#0B1739] text-gray-300 px-5 py-3 rounded-md">
        <p>
          By the way – You’re not creating a campaign here. This is purely to
          help you get a ballpark figure of budget required for a given
          selection of boards.
        </p>
        <HelpCircle className="ml-3 mt-1 w-5 h-5 text-gray-400 cursor-pointer hover:text-[#fff] shrink-0" />
      </div>

      {/* Right Side Note */}
      <div className="flex justify-between mt-10">
        {/* Step One */}
        <div className="mt-12">
          <h2 className="text-xl  font-bold mb-4">Step One :</h2>
          <p className="text-[#fff] text-xl mb-6">Pick your currency</p>

          <div className="grid grid-cols-3 gap-4">
            {currencies.map((c, i) => (
              <button
                key={i}
                className="bg-[#0B1739] hover:bg-[#243056] px-6 py-3 cursor-pointer rounded-md text-white font-medium flex justify-between  gap-4 transition"
              >
                <span>{c.symbol}</span> {c.code}
              </button>
            ))}
          </div>
        </div>
        <div className="  max-w-sm bg-[#0B1739] rounded-md p-6 text-gray-300">
          <h3 className="font-semibold mb-5 text-white">
            The cost estimate here…is just an estimate.
          </h3>
          <p className="text-sm leading-relaxed">
            As you can imagine, the cost of an ad on a board depends on a bunch
            of factors – like time of day, location, impact, and so on. To make
            things faster, the cost estimator pretty much ignores all of that.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CostEstimator;
