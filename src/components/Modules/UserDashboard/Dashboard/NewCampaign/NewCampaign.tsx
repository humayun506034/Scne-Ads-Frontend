import { AddCampaignSection } from "./AddCampaign";
import { AvailableCreditSection } from "./AvailableCredit";
import { RecommendedVideosSection } from "./Recommended";

export default function NewCampaignSection() {
  return (
    <div className="flex flex-wrap xl:flex-nowrap lg:justify-center items-start w-full mt-20 gap-4 ">
      <div className="xl:w-[60%] ">
        <RecommendedVideosSection />
      </div>

      <div className="xl:w-[40%] w-full space-y-4 ">
        <AvailableCreditSection />
        <AddCampaignSection />
      </div>
    </div>
  );
}
