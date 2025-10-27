import { useAppSelector } from "@/store/hooks";
import { motion } from "framer-motion";
import CampaignNameSection from "@/components/Modules/UserDashboard/NewCampaign/CampaignNameSection";
import { SelectBoard } from "@/components/Modules/UserDashboard/NewCampaign/SelectBoard";
import SelectLocations from "@/components/Modules/UserDashboard/NewCampaign/SelectLocations";
import UploadGraphics from "@/components/Modules/UserDashboard/NewCampaign/UploadGraphics/UploadGraphics";
import DurationSection from "@/components/Modules/UserDashboard/NewCampaign/DurationSection";
import Swal from "sweetalert2";

export default function NewCampaignPage() {
  const campaign = useAppSelector((state) => state.campaign);

  // const handlePublish = async () => {

  //   // Validation
  //   // if (!name || screenIds.length === 0 || !startDate || !endDate || files.length === 0) {
  //   //   alert("Please fill all fields before publishing!");
  //   //   return;
  //   // }

  //   // Prepare form-data
  //   // const formData = new FormData();
  //   // formData.append(
  //   //   "data",
  //   //   JSON.stringify({ name, screenIds, startDate, endDate, type })
  //   // );
  //   // files.forEach((file) => formData.append("files", file));

  //   // try {
  //   //   const token = localStorage.getItem("accessToken");
  //   //   const res = await axios.post("/payment/checkout-custom", formData, {
  //   //     headers: {
  //   //       "Content-Type": "multipart/form-data",
  //   //       Authorization: `Bearer ${token}`,
  //   //     },
  //   //   });
  //   //   console.log("✅ Success:", res.data);
  //   //   alert("Campaign published successfully!");
  //   // } catch (err: any) {
  //   //   console.error(err);
  //   //   alert(err.response?.data?.message || "Publish failed");
  //   // }
  //    console.log("✅ Success:", campaign);
  // };

  const handlePublish = async () => {
    const { name, screenIds, startDate, endDate, type, files } = campaign;


  if (!name || screenIds.length === 0 || !startDate || !endDate || files.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Incomplete Data",
      text: "Please fill all fields before publishing!",
    });
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
      Swal.fire({
        icon: "success",
        title: "Campaign Published",
        text: "Redirecting to payment page...",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = res.data.url;
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Campaign Published",
        text: res.message || "Campaign published successfully!",
      });
    }
  } catch (err: any) {
    console.error("❌ Publish failed:", err);
    Swal.fire({
      icon: "error",
      title: "Publish Failed",
      text: err?.data?.message || "Publish failed!",
    });
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
