import { AddCampaignSection } from "./AddCampaign";
import { RecommendedVideosSection } from "./Recommended";

export default function NewCampaignSection() {
  return (
    <div className="flex  h-full  md:flex-row  lg:justify-center items-start flex-col  w-full mt-6 gap-4 ">
      <div className=" w-full h-full xl:w-[60%]  ">
        {/* */}
        <RecommendedVideosSection />
      </div>

      <div className=" w-full xl:w-[40%] h-full">
        {/*  */}
        {/* <AvailableCreditSection /> */}
        <AddCampaignSection />
      </div>
    </div>
  );
}
