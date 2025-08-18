import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { RecommendedVideosSection } from "../Dashboard/NewCampaign/Recommended";

const CampaignNameSection = () => {
  const [Value, setValue] = useState("Arts and Entertainment");
  const options = [
    { value: "arts", label: "Arts & Entertainment" },
    { value: "automotive", label: "Automotive" },
    { value: "business", label: "Business" },
    { value: "careers", label: "Careers" },
    { value: "education", label: "Education" },
    { value: "family-parenting", label: "Family & Parenting" },
    { value: "health-fitness", label: "Health & Fitness" },
    { value: "food-drink", label: "Food & Drink" },
    { value: "hobbies-interests", label: "Hobbies & Interests" },
    { value: "home-garden", label: "Home & Garden" },
    { value: "law-govt-policies", label: "Law, Govt & Policies" },
    { value: "news", label: "News" },
    { value: "personal-finance", label: "Personal Finance" },
    { value: "society", label: "Society" },
    { value: "science", label: "Science" },
    { value: "pets", label: "Pets" },
    { value: "sports", label: "Sports" },
    { value: "style-fashion", label: "Style & Fashion" },
    { value: "technology-computing", label: "Technology & Computing" },
    { value: "travel", label: "Travel" },
    { value: "real-estate", label: "Real Estate" },
    { value: "shopping", label: "Shopping" },
    { value: "religion-spirituality", label: "Religion & Spirituality" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="flex w-full mt-10 flex-col xl:flex-row  justify-center gap-8  ">
      <section className="xl:w-[65%] p-8 border border-dashboard-border bg-dashboard-card-bg text-white rounded-xl shadow-lg">
        <div className="mb-16 ">
          <h1 className="text-2xl md:text-4xl  font-semibold">Campaign Name</h1>
          <input
            type="text"
            className="w-full  mt-16 p-4 rounded-md bg-transparent text-white border  border-dashboard-border text-base focus:outline-none  placeholder:text-[#6371A3] focus:ring-0 focus:border-1 focus:"
            placeholder="Enter your campaign name"
          />
          <p className="text-red-500 text-sm mt-4">
            Campaign name must be 50 characters or shorter. But also, longer
            than 0 characters.
          </p>
        </div>

        <div className="">
          <h1 className="text-lg md:text-2xl  font-semibold mb-6">Industry</h1>
          <Select onValueChange={(value) => setValue(value)}>
            <SelectTrigger
              className={` cursor-pointer  text-base text-white  border  border-dashboard-border  w-full  rounded-md   focus:ring-0 focus:  focus:outline-none   px-4 py-6  `}
            >
              <SelectValue placeholder={Value} />
            </SelectTrigger>
            <SelectContent className="  bg-[#0B1739]  text-white border-none">
              {options.map((option) => (
                <SelectItem
                  key={option.label}
                  value={option.value}
                  className="cursor-pointer   hover:bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] hover:text-white"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>
      <section className="xl:w-[35%]">
        <RecommendedVideosSection />
      </section>
    </div>
  );
};

export default CampaignNameSection;
