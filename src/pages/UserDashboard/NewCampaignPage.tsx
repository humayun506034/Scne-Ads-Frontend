import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { motion } from "framer-motion";
import CampaignNameSection from "@/components/Modules/UserDashboard/NewCampaign/CampaignNameSection";
import { SelectBoard } from "@/components/Modules/UserDashboard/NewCampaign/SelectBoard";
import SelectLocations from "@/components/Modules/UserDashboard/NewCampaign/SelectLocations";
import UploadGraphics from "@/components/Modules/UserDashboard/NewCampaign/UploadGraphics/UploadGraphics";
import DurationSection from "@/components/Modules/UserDashboard/NewCampaign/DurationSection";

export default function NewCampaignPage() {
  const campaign = useAppSelector((state) => state.campaign);
  const dispatch = useAppDispatch();

  const handlePublish = async () => {
    const { name, screenIds, startDate, endDate, type, files } = campaign;

    // Validation
    // if (!name || screenIds.length === 0 || !startDate || !endDate || files.length === 0) {
    //   alert("Please fill all fields before publishing!");
    //   return;
    // }

    // Prepare form-data
    // const formData = new FormData();
    // formData.append(
    //   "data",
    //   JSON.stringify({ name, screenIds, startDate, endDate, type })
    // );
    // files.forEach((file) => formData.append("files", file));

    // try {
    //   const token = localStorage.getItem("accessToken");
    //   const res = await axios.post("/payment/checkout-custom", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   console.log("✅ Success:", res.data);
    //   alert("Campaign published successfully!");
    // } catch (err: any) {
    //   console.error(err);
    //   alert(err.response?.data?.message || "Publish failed");
    // }
     console.log("✅ Success:", campaign);
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
          className="mb-12 w-full ml-auto md:w-fit rounded-full bg-gradient-to-r from-[#38B6FF] to-[#09489D] py-2 md:py-3 px-16 font-medium hover:opacity-90 cursor-pointer transition-opacity text-xl"
          onClick={handlePublish}
        >
          Publish
        </motion.button>
      </div>
    </div>
  );
}
