import CampaignNameSection from "@/components/Modules/UserDashboard/NewCampaign/CampaignNameSection";

import { motion } from "framer-motion";

const NewCampaign = () => {
  return (
    <div className="">
      <motion.div
        className=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <CampaignNameSection />
      </motion.div>
    </div>
  );
};

export default NewCampaign;
