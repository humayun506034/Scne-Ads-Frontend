import CampaignNameSection from "@/components/Modules/UserDashboard/NewCampaign/CampaignNameSection";
import { SelectBoard } from "@/components/Modules/UserDashboard/NewCampaign/SelectBoard";
import SelectLocations from "@/components/Modules/UserDashboard/NewCampaign/SelectLocations";
import UploadGraphics from "@/components/Modules/UserDashboard/NewCampaign/UploadGraphics/UploadGraphics";

import { BudgetSection } from "@/components/Modules/UserDashboard/NewCampaign/Bugdet/BudgetSection";
import { CampaignSchedule } from "@/components/Modules/UserDashboard/NewCampaign/CampaginSchedule/CampaginSchedule";
import DurationSection from "@/components/Modules/UserDashboard/NewCampaign/DurationSection";
import { NewCampaignFooter } from "@/components/Modules/UserDashboard/NewCampaign/NewCampaignFooter";
import { motion } from "framer-motion";

const NewCampaignPage = () => {
  return (
    <div className="">
      <motion.div
        className="px-5 md:px-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <CampaignNameSection />
        <SelectBoard />
        <SelectLocations />
        <UploadGraphics />
        <DurationSection />
        <CampaignSchedule />
        <BudgetSection />
      </motion.div>
      <NewCampaignFooter />
    </div>
  );
};

export default NewCampaignPage;
