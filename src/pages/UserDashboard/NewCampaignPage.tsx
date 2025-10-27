/* eslint-disable @typescript-eslint/no-explicit-any */
import CampaignNameSection from "@/components/Modules/UserDashboard/NewCampaign/CampaignNameSection";
import DurationSection from "@/components/Modules/UserDashboard/NewCampaign/DurationSection";
import { SelectBoard } from "@/components/Modules/UserDashboard/NewCampaign/SelectBoard";
import SelectLocations from "@/components/Modules/UserDashboard/NewCampaign/SelectLocations";
import UploadGraphics from "@/components/Modules/UserDashboard/NewCampaign/UploadGraphics/UploadGraphics";
import { usePublishCampaignMutation } from "@/store/api/Campaign/campaignApi";
import { useAppSelector } from "@/store/hooks";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function NewCampaignPage() {
  const campaign = useAppSelector((state) => state.campaign);
  const [publishCampaign, { isLoading }] = usePublishCampaignMutation();

  const handlePublish = async () => {
    const { name, screenIds, startDate, endDate, type, files } = campaign;

    // Fix the condition for checking missing data
    if (!name || screenIds.length === 0 || !startDate || !endDate || files.length === 0) {
      toast.error("Please fill all fields before publishing!");
      return;
    }

    try {
      const res = await publishCampaign({
        name,
        screenIds,
        startDate,
        endDate,
        type,
        files,
      }).unwrap();

      if (res.data?.url) {
        toast.success("Campaign Published. Redirecting to payment page...");
        setTimeout(() => {
          window.location.href = res.data.url;
        }, 2000);
      } else {
        toast.success(res.message || "Campaign published successfully!");
      }
    } catch (err: any) {
      console.error("❌ Publish failed:", err);
      toast.error(err?.data?.message || "Publish failed!");
    }
  };

  return (
    <div className="px-5 md:px-10">
      <CampaignNameSection />
      <SelectBoard />
      <SelectLocations />
      <UploadGraphics />
      <DurationSection />

      <div className="w-full flex">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.85 }}
          disabled={isLoading}
          className={`mb-12 w-full ml-auto md:w-fit rounded-full py-2 md:py-3 px-16 text-xl font-medium transition-opacity cursor-pointer 
            ${isLoading
              ? "bg-gray-500 opacity-60 cursor-not-allowed"
              : "bg-gradient-to-r from-[#38B6FF] to-[#09489D] hover:opacity-90"
            }`}
          onClick={handlePublish}
        >
          {isLoading ? "Publishing..." : "Publish"}
        </motion.button>
      </div>
    </div>
  );
}
