/* eslint-disable @typescript-eslint/no-explicit-any */
import CampaignNameSection from "@/components/Modules/UserDashboard/NewCampaign/CampaignNameSection";
import DurationSection from "@/components/Modules/UserDashboard/NewCampaign/DurationSection";
import { SelectBoard } from "@/components/Modules/UserDashboard/NewCampaign/SelectBoard";
import SelectLocations from "@/components/Modules/UserDashboard/NewCampaign/SelectLocations";
import UploadGraphics from "@/components/Modules/UserDashboard/NewCampaign/UploadGraphics/UploadGraphics";
import { usePublishCampaignMutation } from "@/store/api/Campaign/campaignApi";
import { useAppSelector } from "@/store/hooks";
import { publishCampaignSchema } from "@/validations/campaignValidation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ZodError } from "zod";

export default function NewCampaignPage() {
  const campaign = useAppSelector((state) => {
    return state.campaign;
  });
  
  const [publishCampaign, { isLoading }] = usePublishCampaignMutation();

  const handlePublish = async () => {
    const { name, screenIds, startDate, endDate, files, type } = campaign;

    // Validate campaign data using Zod
    try {
      const validatedData = publishCampaignSchema.parse({
        name,
        screenIds,
        startDate: startDate ,
        endDate: endDate ,
        type: type || "custom",
        files,
      });
  

    
      try {
        const res = await publishCampaign({
          name: validatedData.name,
          screenIds: validatedData.screenIds,
          startDate: validatedData.startDate,
          endDate: validatedData.endDate,
          type: validatedData.type,
          files: validatedData.files,
        }).unwrap();
        

        if (res.data?.url) {
          toast.success("Campaign Published. Redirecting to payment page...");
          window.location.href = res.data.url;
        } else {
          toast.success(res.message || "Campaign published successfully!");
        }
      } catch (err: any) {
        console.error("❌ Publish failed:", err);
        toast.error(err?.data?.message || "Publish failed!");
      }
    } catch (error) {
    
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => {
          const field = err.path.join(".");
          // Format field names for better readability
          const fieldName = field
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())
            .trim() || "Field";
          return `${fieldName}: ${err.message}`;
        });
        
      
        const firstError = errorMessages[0] || "Validation failed. Please check your input.";
        toast.error(firstError);
        
       
        if (errorMessages.length > 1) {
          console.error("All validation errors:", errorMessages);
        } else {
          console.error("Validation error:", error.errors);
        }
      } else {
        toast.error("An unexpected error occurred during validation.");
        console.error("Validation error:", error);
      }
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
